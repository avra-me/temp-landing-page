import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";

export async function getNavigationData() {
    const sourceDir = `${process.cwd()}/content/common/navigation`
    const menuItems = [];
    for (const filename of fs.readdirSync(sourceDir)) {
        if (filename.endsWith('.md')) {
            const file = fs.readFileSync(`${sourceDir}/${filename}`);
            const md = matter(file.toString())
            menuItems.push(md.data)
        }
    }
    const file = fs.readFileSync(`${process.cwd()}/content/common/navigation/config.yaml`);
    const navConfig = yaml.load(file.toString()) as Record<string, unknown>
    return {
        ...navConfig,
        menuItems,
    };
}