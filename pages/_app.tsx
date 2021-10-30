import type {AppProps} from 'next/app'
import {useRouter} from "next/router";
import {useStore} from "../store";
import {Provider} from "react-redux";
import RootThemeProvider from "../components/common/theming/RootThemeProvider";
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CustomStyles from '../components/common/theming/CustomStyles';
import FooterMenu from '../components/sections/FooterMenu';
import Header from '../components/sections/Header';
import NavigationBar from '../components/sections/NavigationBar';
import createEmotionCache from "../utilities/createEmotionCache";
import {CacheProvider, EmotionCache} from '@emotion/react';
import {NoSsr} from "@mui/core";
import {LocalstorageCacheProvider} from 'components/common/theming/LocalstorageCacheProvider';
import dynamic from "next/dynamic";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
const AlertManager = dynamic(() => import('../components/common/AlertManager'));

function MyApp({Component, pageProps, emotionCache = clientSideEmotionCache}: MyAppProps) {
  const router = useRouter()
  const store = useStore(pageProps.initialReduxState)


  // @ts-ignore
  return <Provider store={store}>
    <Header/>
    <NoSsr>
      <LocalstorageCacheProvider/>
    </NoSsr>
    <CacheProvider value={emotionCache}>
      <RootThemeProvider>
        <CssBaseline/>
        <CustomStyles/>
        <NavigationBar/>
        <Component {...pageProps} key={router.route}/>
        <NoSsr>
          {"alert" in router.query && <AlertManager/>}
        </NoSsr>
        <FooterMenu/>
      </RootThemeProvider>
    </CacheProvider>
  </Provider>
}


export default MyApp
