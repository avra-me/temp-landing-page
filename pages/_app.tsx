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

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

function MyApp({Component, pageProps, emotionCache = clientSideEmotionCache}: MyAppProps) {
  const router = useRouter()
  const store = useStore(pageProps.initialReduxState)

  // @ts-ignore
  return <Provider store={store}>
    <Header/>
    <CacheProvider value={emotionCache}>
      <RootThemeProvider>
        <CssBaseline/>
        <CustomStyles/>
        <NavigationBar/>
        <Component {...pageProps} key={router.route}/>
        <FooterMenu/>
      </RootThemeProvider>
    </CacheProvider>
  </Provider>
}


export default MyApp
