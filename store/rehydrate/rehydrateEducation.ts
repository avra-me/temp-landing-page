import {gatherItems} from "./rehydrateHome";

export async function getEducationData() {
  return {items: await gatherItems(`${process.cwd()}/content/education`)}
}
