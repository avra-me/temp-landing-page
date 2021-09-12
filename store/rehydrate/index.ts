import {initializeStore} from '../index'
import {isObject, merge} from "lodash-es";
import {getStaticThemeData} from "./rehydrateTheme";
import {getSiteState} from "./rehydrateSite";
import {getNavigationData} from "./rehydrateNavigation";
import {getFooterData} from "./rehydrateFooter";
import {getHomeData} from "./rehydrateHome";
import {getExperienceData} from "./rehydrateExperience";
import {getEducationData} from "./rehydrateEducation";

export const SourceMap = {
    themes: getStaticThemeData,
    home: getHomeData,
    experience: getExperienceData,
    education: getEducationData,
    site: getSiteState,
    navigation: getNavigationData,
    footer: getFooterData
} as const

type ValidSources<T=keyof typeof SourceMap> = (T|{type: T, args: Record<string, unknown>})

export async function populatePageState(...sources: ValidSources[]) {
    let results = {}
    for (const source of sources) {
        let sourceStr = source as keyof typeof SourceMap
        let args = {}
        if(isObject(source) && 'type' in source){
            sourceStr = source.type
            args = source.args
        }
        if (sourceStr in SourceMap) {
            // @ts-ignore
            const result = {[sourceStr]: await SourceMap[sourceStr].apply(null, [args])};
            console.log('loading source', source, result)
            results = merge(results, result)
        }
    }
    const reduxStore = initializeStore(results)
    return {props: {initialReduxState: reduxStore.getState()}}
}