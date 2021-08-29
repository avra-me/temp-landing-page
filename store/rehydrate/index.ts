import {initializeStore} from '../index'
import {merge} from "lodash";
import {getStaticThemeData} from "./rehydrateTheme";
import {getSiteState} from "./rehydrateSite";
import {getNavigationData} from "./rehydrateNavigation";
import {getFooterData} from "./rehydrateFooter";
import {getHomeData} from "./rehydrateHome";

export const SourceMap = {
    themes: getStaticThemeData,
    home: getHomeData,
    site: getSiteState,
    navigation: getNavigationData,
    footer: getFooterData
} as const

type ValidSources = keyof typeof SourceMap

export async function populatePageState(...sources: ValidSources[]) {
    let results = {}
    for (const source of sources) {
        if (source in SourceMap) {
            const result = {[source]: await SourceMap[source].apply(null)};
            console.log('loading source', source, result)
            results = merge(results, result)
        }
    }
    const reduxStore = initializeStore(results)
    return {props: {initialReduxState: reduxStore.getState()}}
}