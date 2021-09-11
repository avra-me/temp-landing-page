import fs from "fs";
import matter from "gray-matter";
import {filter, includes, isArray, isObject, overEvery, overSome, sortBy, template} from "lodash-es";
import showdown from "showdown";
import yaml from 'js-yaml'

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

const gatherItems = async (sourceDir: string): Promise<Record<string, unknown>[]> => {
  const items = [];
  for (const filename of fs.readdirSync(sourceDir)) {
    let thisItem: Record<string, unknown> = {slug: filename}
    const path = `${sourceDir}/${filename}`
    const stat = fs.lstatSync(path)
    if(!stat.isFile()){
      continue;
    }
    const file = fs.readFileSync(path);
    if (filename.endsWith('.md')) {
      const md = matter(file.toString())
      Object.assign(thisItem, {...md.data, content: renderMarkdown(md.content)});
    }
    if (filename.endsWith('.yaml')) {
      const data = yaml.load(file.toString())
      Object.assign(thisItem, data)
    }
    if ('children' in thisItem) {
      const children = thisItem.children as ChildImport | ChildImport[];
      delete thisItem["children"]
      if (isArray(children)) {
        for (const child of children) {
          if (!thisItem[child.key]) {
            thisItem[child.key] = [] as unknown[]
          }
          (thisItem[child.key] as unknown[]).push(...await handleChild(child))
        }
      } else {
        const child = children as ChildImport;
        if(isObject(child)) {
          if('key' in child){
            if (!thisItem[child.key]) {
              thisItem[child.key] = [] as unknown[]
            }
            (thisItem[child.key] as unknown[]).push(...await handleChild(child))
          }
        }
      }
    }
    recurseHydrateItem(thisItem, thisItem)
    items.push(thisItem)
  }
  return sortBy(items, 'order');
}

interface ChildImport {
  key: string
  source: string
  filter?: string | Record<string, unknown> | string[]
  orderBy: string[]
  match?: Record<string, string[]>
  fields?: Record<string, string>
}

const recurseHydrateItem = (item: Record<string, unknown>, state: Record<string, unknown>): void => {
  Object.keys(item).forEach(k => {
    const value = item[k]
    if (typeof value === "string") {
      item[k] = hydrateTemplate(value, state)
    } else {
      if (isArray(value)) {
        recurseHydrateItem(value as unknown as Record<string, unknown>, state)
      } else if (isObject(value)) {
        recurseHydrateItem(value as Record<string, unknown>, state)
      }
    }
  })
}
const handleBarSelector = /{{([\s\S]+?)}}/g;
const hydrateTemplate = (value: string, state: Record<string, unknown>): string => {
  const templater = template(value, {interpolate: handleBarSelector})
  return templater(state)
}

const handleChild = async (child: ChildImport) => {
  const {source, filter: filterBy, match, fields, orderBy} = child;
  let allItems = await gatherItems(`${process.cwd()}/content/${source}`,)
  if (orderBy) {
    allItems = sortBy(allItems, orderBy)
  }
  if (filterBy) {
    allItems = filter(allItems, filterBy) as Record<string, unknown>[]
  }
  if (match) {
    const checkValue = (key: string) => overSome(match[key].map(value => (item: Record<string, unknown>) => includes(item[key] as string[], value)));
    const matchPredicate = Object.keys(match).map(checkValue)
    // @ts-ignore
    allItems = filter(allItems, overEvery(matchPredicate));
  }
  if (fields) {
    return allItems.map(item => {
      return Object.keys(fields).reduce((newItem, key) => {
        return Object.assign(newItem, {[key]: hydrateTemplate(fields[key], item)})
      }, {})
    })
  }

  return allItems
}