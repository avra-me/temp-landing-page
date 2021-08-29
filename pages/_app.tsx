import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {AnimatePresence} from "framer-motion";
import {useRouter} from "next/router";
import {useStore} from "../store";
import {Provider} from "react-redux";
import RootThemeProvider from "../components/common/theming/RootThemeProvider";
import Header from "../components/sections/Header";
import React from 'react';
import GlobalStyles from '../components/common/theming/GlobalStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { NoSsr } from '@material-ui/core';
import AlertManager from '../components/common/AlertManager';

function handleExitComplete() {
    if (typeof window !== 'undefined') {
        window.scrollTo({top: 0})
    }
}

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
            <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
                <Component {...pageProps} key={router.route}/>
            </AnimatePresence>
            <NoSsr>
                <AlertManager/>
            </NoSsr>
        </RootThemeProvider>
    </Provider>
}

export default MyApp
