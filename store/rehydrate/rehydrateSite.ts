import fs from "fs";
import yaml from "js-yaml";
import {JsonObject} from "type-fest";

export async function getSiteState() {
    const file = fs.readFileSync(`${process.cwd()}/content/config.yaml`);
    const data = yaml.load(file.toString())
    return data as JsonObject;
}