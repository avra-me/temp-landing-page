import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";

export async function getFooterData() {
    const sourceDir = `${process.cwd()}/content/common/footer`
    const buttons = [];
    for (const filename of fs.readdirSync(sourceDir)) {
        if (filename.endsWith('.md')) {
            const file = fs.readFileSync(`${sourceDir}/${filename}`);
            const md = matter(file.toString())
            buttons.push({...md.data, content: md.content})
        }
    }
    const file = fs.readFileSync(`${process.cwd()}/content/common/footer/config.yaml`);
    const navConfig = yaml.load(file.toString()) as Record<string, unknown>
    return {
        ...navConfig,
        buttons,
    };
}