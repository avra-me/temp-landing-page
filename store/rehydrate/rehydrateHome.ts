import fs from "fs";
import matter from "gray-matter";
import {
  cloneDeep,
  filter,
  includes,
  isArray,
  isDate,
  isObject,
  orderBy as sortBy,
  overEvery,
  overSome,
  template
} from "lodash-es";
import showdown from "showdown";
import yaml from 'js-yaml'
import {JsonObject, JsonValue} from "type-fest";

interface Loadable extends JsonObject {
  children?: ChildImport | JsonValue,
  _markdownKeys?: string[],
  content?: string
}

interface ChildImport extends JsonObject {
  key: string
  source: string
  filter?: string | Record<string, JsonValue> | string[]
  orderBy: string[]
  match?: Record<string, string[]>
  fields?: Record<string, string>
}

export async function getHomeData() {
  return {items: await gatherItems(`${process.cwd()}/content/home`)}
}

const renderMarkdown = (content: string) => {
  const converter = new showdown.Converter({
    strikethrough: true,
    tables: true,
    ghCodeBlocks: true,
    tasklists: true,
    emoji: true
  })
  return converter.makeHtml(content);
}

const validateChild = async <T extends ChildImport>(child: T, thisItem: Loadable): Promise<void> => {
  if (isObject(child) && 'key' in child) {
    let targetArray = thisItem[child.key];
    if (!isArray(targetArray)) {
      targetArray = [];
    }
    targetArray.push(...await handleChild(child))
    thisItem[child.key] = targetArray;
  }
}

const hydrateItem = async <T extends Loadable>(thisItem: T): Promise<T> => {
  if ('children' in thisItem) {
    const children = thisItem.children;
    delete thisItem["children"]
    if (isArray(children)) {
      for (const child of children) {
        await validateChild(child as ChildImport, thisItem);
      }
    } else {
      const child = children as ChildImport;
      await validateChild(child, thisItem);
    }
  }
  if ('content' in thisItem) {
    thisItem.content = renderMarkdown(thisItem.content as string)
  }
  if ('_markdownKeys' in thisItem && isArray(thisItem._markdownKeys)) {
    thisItem._markdownKeys.forEach(key => {
      if (key in thisItem && typeof thisItem[key] === "string") {
        // @ts-ignore
        thisItem[key] = renderMarkdown(thisItem[key] as string)
      }
    })
  }
  recurseHydrateItem(thisItem, thisItem)
  return thisItem
}

const loadYamlFromString = (s: string): object => yaml.load(s) as object

export const gatherItem = async (sourceDir: string, sourceFile: string, common?: Partial<Loadable>): Promise<Loadable | void> => {
  if (!common) {
    common = loadCommon(sourceDir)
  }
  let thisItem: JsonObject = {slug: sourceFile.substr(0, sourceFile.lastIndexOf('.'))}
  const path = `${sourceDir}/${sourceFile}`
  const stat = fs.lstatSync(path)
  if (!stat.isFile()) {
    return;
  }
  const file = fs.readFileSync(path);
  if (sourceFile.endsWith('.md')) {
    const md = matter(file.toString(), {
      engines: {
        yaml: loadYamlFromString
      }
    })
    Object.assign(thisItem, {...md.data, content: md.content});
  }
  if (sourceFile.endsWith('.yaml')) {
    const data = loadYamlFromString(file.toString())
    Object.assign(thisItem, data)
  }
  return hydrateItem({...common, ...thisItem});
}

const loadCommon = (sourceDir: string): Partial<Loadable> => {
  const path = `${sourceDir}/_common.yaml`
  if (fs.existsSync(path)) {
    const stat = fs.lstatSync(path)
    if (!stat.isFile()) {
      return {};
    }
    const file = fs.readFileSync(path);
    return yaml.load(file.toString()) as Partial<Loadable>
  }
  return {}
}

export const gatherItems = async (sourceDir: string, filterBy?: any): Promise<Loadable[]> => {
  const items = [];
  const common = loadCommon(sourceDir);
  for (const filename of fs.readdirSync(sourceDir)) {
    if (filename.startsWith('_')) {
      continue;
    }
    const thisItem = await gatherItem(sourceDir, filename, common)
    if (thisItem) {
      items.push(thisItem)
    }
  }
  // @ts-ignore
  return sortBy(filter(items, filterBy), 'order');
}

const recurseHydrateItem = (item: Record<string, unknown>, state: Record<string, unknown>): void => {
  Object.keys(item).forEach(k => {
    const value = item[k]
    if (typeof value === "string") {
      item[k] = hydrateTemplate(value, state)
    } else if (isDate(value)) {
      item[k] = value.toISOString();
    } else if (isArray(value)) {
      recurseHydrateItem(value as unknown as Record<string, unknown>, state)
    } else if (isObject(value)) {
      recurseHydrateItem(value as Record<string, unknown>, state)
    }

  })
}
const handleBarSelector = /{{([\s\S]+?)}}/g;
const hydrateTemplate = (value: string, state: Record<string, unknown>): string => {
  try {
    const templater = template(value, {interpolate: handleBarSelector})
    return templater(state)
  } catch (e) {
    e.message = `Error thrown processing ${JSON.stringify(state)} ${e.message}`
    throw e
  }
}

const handleChild = async (child: ChildImport): Promise<Loadable[]> => {
  const {source, filter: filterBy, match, fields, orderBy} = child;
  let allItems = await gatherItems(`${process.cwd()}/content/${source}`,)

  if (filterBy) {
    allItems = filter(allItems, filterBy) as Loadable[]
  }
  if (match) {
    const checkValue = (key: string) => overSome(match[key].map(value => (item: Loadable) => includes(item[key] as string[], value)));
    const matchPredicate = Object.keys(match).map(checkValue)
    // @ts-ignore
    allItems = filter(allItems, overEvery(matchPredicate));
  }
  if (orderBy) {
    allItems = sortBy(allItems, orderBy.map(v => v.startsWith('-') ? v.substr(1) : v), orderBy.map(v => v.startsWith('-') ? 'desc' : 'asc'))
  }
  if (fields) {
    return Promise.all(allItems.map(async item => {
      const result = cloneDeep(fields);
      recurseHydrateItem(result, item)
      return await hydrateItem((result))
    }))
  }

  return allItems
}