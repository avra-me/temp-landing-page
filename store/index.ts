import {useMemo} from 'react'
import {applyMiddleware, createStore, Reducer} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {initialSiteState, SiteState} from "./types/site";
import {initialNavigationState, NavigationState} from "./types/navigation";
import {CHANGE_THEME_MODE, initialThemeState, TOGGLE_THEME_MODE} from "./types/themes";
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

const PAGE_STATE_UPDATE = 'pageStateUpdate'

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
      if(action.payload){
        Object.assign(state.themes.palette, {mode: action.payload})
      }
      return {...state}
    case TOGGLE_THEME_MODE:
      Object.assign(state.themes.palette, {mode: state.themes.palette?.mode === "light" ? "dark" : "light"})
      return {...state}
    case PAGE_STATE_UPDATE:
      return {
        ...state,
        ...action.payload
      }
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
    store.dispatch({
      type: PAGE_STATE_UPDATE,
      payload: preloadedState
    })
    return store;
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