import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {useRouter} from "next/router";
import {useStore} from "../store";
import {Provider} from "react-redux";
import RootThemeProvider from "../components/common/theming/RootThemeProvider";
import Header from "../components/sections/Header";
import React from 'react';
import GlobalStyles from '../components/common/theming/GlobalStyles';
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter()
  const store = useStore(pageProps.initialReduxState)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    } else {
      console.warn('No JSS to remove')
    }
  }, []);
  // @ts-ignore
  return <Provider store={store}>
    <Header/>
    <RootThemeProvider>
      <CssBaseline/>
      <GlobalStyles/>
      <Component {...pageProps} key={router.route}/>
    </RootThemeProvider>
  </Provider>
}

export default MyApp
