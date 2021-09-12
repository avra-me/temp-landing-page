import {gatherItem, gatherItems} from "./rehydrateHome";

const EXPERIENCE_SOURCE_DIR = `${process.cwd()}/content/experience`
export const getExperienceData = async ({id = null}) => {
  if (id) {
    const item = await gatherItem(`${EXPERIENCE_SOURCE_DIR}/cards/`, `${id}.md`);
    return {
      item,
      items: item?.items || []
    }
  }
  return {items: await gatherItems(`${EXPERIENCE_SOURCE_DIR}`)}
}
