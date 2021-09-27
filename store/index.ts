import {useMemo} from 'react'
import {AnyAction, applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {ThemeOptions} from "@material-ui/core";
import {initialSiteState, SiteState} from "./types/site";
import {initialNavigationState, NavigationState} from "./types/navigation";
import {CHANGE_THEME_MODE, initialThemeState} from "./types/themes";
import {FooterState, initialFooterState} from "./types/footer";
import {HomeState, initialHomeState} from "./types/home";


export interface AppState {
    themes: ThemeOptions
    home: HomeState,
    experience: HomeState,
    education: HomeState,
    site: SiteState,
    navigation: NavigationState
    footer: FooterState
}


const initialState = {
    themes: initialThemeState,
    site: initialSiteState,
    home: initialHomeState,
    experience: initialHomeState,
    education: initialHomeState,
    navigation: initialNavigationState,
    footer: initialFooterState
}

const reducer = (state: AppState = initialState, action: AnyAction) => {
    switch (action.type) {
        case CHANGE_THEME_MODE:
            Object.assign(state, action.payload)
            return state
        default:
            return state
    }
}

function initStore(preloadedState: Partial<AppState> = initialState) {
    return createStore(
        reducer,
        preloadedState as AppState,
        composeWithDevTools(applyMiddleware())
    )
}

let store: ReturnType<typeof initStore> | undefined


export const initializeStore = (preloadedState: Partial<AppState>) => {
    let _store = store ?? initStore(preloadedState)

    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState: AppState) {
    return useMemo(() => initializeStore(initialState), [initialState])
}