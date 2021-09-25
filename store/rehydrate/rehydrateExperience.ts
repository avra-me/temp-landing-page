import {gatherItem, gatherItems} from "./rehydrateHome";
import {format, parseISO} from "date-fns";
import {GenericItem} from "../types/home";

const EXPERIENCE_SOURCE_DIR = `${process.cwd()}/content/experience`
export const getExperienceData = async ({id = null}) => {
  if (id) {
    const item = (await gatherItem(`${EXPERIENCE_SOURCE_DIR}/cards/`, `${id}.md`) as unknown as GenericItem);
    let startDate = format(parseISO(item.startDate), 'MMMM yyyy');
    let endDate;
    try {
      endDate = format(parseISO(item.endDate), 'MMMM yyyy');
    } catch (e) {
      endDate = "Current"
    }
    try {
      const startYear = format(parseISO(item.startDate), 'yyyy');
      const endYear = format(parseISO(item.endDate), 'yyyy');
      if (startYear === endYear) {
        startDate = startYear;
        endDate = endYear;
      }
    } catch {
      // Ignore
    }
    Object.assign(item, {startDate, endDate})
    return {
      item,
      items: []
    }
  }
  return {items: await gatherItems(`${EXPERIENCE_SOURCE_DIR}`)}
}
