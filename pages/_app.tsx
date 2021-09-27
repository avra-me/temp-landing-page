import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {useRouter} from "next/router";
import {useStore} from "../store";
import {Provider} from "react-redux";
import RootThemeProvider from "../components/common/theming/RootThemeProvider";
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from '../components/common/theming/GlobalStyles';
import FooterMenu from '../components/sections/FooterMenu';
import Header from '../components/sections/Header';
import NavigationBar from '../components/sections/NavigationBar';


function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter()
  const store = useStore(pageProps.initialReduxState)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // @ts-ignore
  return <Provider store={store}>
    <Header/>
    <RootThemeProvider>
      <CssBaseline/>
      <GlobalStyles/>
      <NavigationBar
          useDarkPalette
      />
      <Component {...pageProps} key={router.route}/>
      <FooterMenu/>
    </RootThemeProvider>
  </Provider>
}


export default MyApp
