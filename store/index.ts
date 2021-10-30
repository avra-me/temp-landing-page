import {useMemo} from 'react'
import {applyMiddleware, createStore, Reducer} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {initialSiteState, SiteState} from "./types/site";
import {initialNavigationState, NavigationState} from "./types/navigation";
import {CHANGE_THEME_MODE, DARKMODE_COOKIE_KEY, initialThemeState} from "./types/themes";
import {FooterState, initialFooterState} from "./types/footer";
import {HomeState, initialHomeState} from "./types/home";
import {ThemeOptions} from "@mui/material/styles";


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

const reducer: Reducer<AppState> = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME_MODE:
      if (action.payload) {
        Object.assign(state.themes.palette, {mode: action.payload})
      }
      localStorage.setItem(DARKMODE_COOKIE_KEY, action.payload)
      return {...state}
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