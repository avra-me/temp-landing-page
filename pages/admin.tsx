import type {NextPage} from 'next'
import React from 'react';
import Head from "next/head";

const Home: NextPage = () => {

  return <>
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Content Manager</title>
      <script async src="https://identity.netlify.com/v1/netlify-identity-widget.js"/>
      <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url"/>
    </Head>,
    <script async src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"/>
  </>
}

export async function getStaticProps() {
  const {getPageState, getAppState} = await import('../store/rehydrate');
  const baseState = await getAppState();
  // @ts-ignore
  delete baseState.footer;
  // @ts-ignore
  delete baseState.navigation;
  const initialReduxState = await getPageState(baseState, 'home')
  return {props: {initialReduxState}}
}

export default Home
