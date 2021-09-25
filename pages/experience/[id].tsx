import {GetStaticProps, NextPage} from "next";
import DynamicItem from "../../components/items/DynamicItem";
import {ParsedUrlQuery} from "querystring";

export async function getStaticPaths() {
  // Return a list of possible value for id
  const fs = require('fs')
  const paths = fs.readdirSync('content/experience/cards')
    .filter((v: string) => v.endsWith('.md'))
    .map((v: string) => `/experience/${v.substr(0, v.lastIndexOf('.'))}`)
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {getPageState, getAppState} = await import('../../store/rehydrate');
  const baseState = await getAppState();
  const initialReduxState = await getPageState(baseState, {
    type: 'experience',
    args: params as ParsedUrlQuery
  })
  return {props: {initialReduxState}}
}

const Page: NextPage = () => {
  return <>
    <DynamicItem source={"experience"}/>
  </>
}

export default Page