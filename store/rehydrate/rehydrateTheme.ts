import fs from "fs";
import yaml from 'js-yaml'

export async function getStaticThemeData() {
    const themeFile = fs.readFileSync(`${process.cwd()}/content/theme/theme.yaml`);
    const data = yaml.load(themeFile.toString())
    return data;
}