import fs from "fs";
import yaml from "js-yaml";

export async function getSiteState() {
    const file = fs.readFileSync(`${process.cwd()}/content/config.yaml`);
    const data = yaml.load(file.toString())
    return data;
}