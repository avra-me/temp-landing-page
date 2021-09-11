import fs from "fs";
import matter from "gray-matter";
import {filter, includes, overEvery, overSome, sortBy, template} from "lodash-es";
import showdown from "showdown";

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
    if (filename.endsWith('.md')) {
      const file = fs.readFileSync(`${sourceDir}/${filename}`);
      const md = matter(file.toString())
      let thisItem: Record<string, unknown> = {...md.data, content: renderMarkdown(md.content), slug: filename}
      if ('children' in md.data) {
        if (md.data.children.map) {
          for (const child of md.data.children) {
            if (!thisItem[child.key]) {
              thisItem[child.key] = [] as unknown[]
            }
            (thisItem[child.key] as unknown[]).push(...await handleChild(child))
          }
        } else {
          const child = md.data.children;
          if (!thisItem[child.key]) {
            thisItem[child.key] = [] as unknown[]
          }
          (thisItem[child.key] as unknown[]).push(...await handleChild(md.data.children))
        }
        delete thisItem["children"]
      }
      items.push(thisItem)
    }
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
  const handleBarSelector = /{{([\s\S]+?)}}/g;
  if (fields) {
    return allItems.map(item => {
      return Object.keys(fields).reduce((newItem, key) => {
        const templater = template(fields[key], {interpolate: handleBarSelector})
        return Object.assign(newItem, {[key]: templater(item)})
      }, {})
    })
  }

  return allItems
}