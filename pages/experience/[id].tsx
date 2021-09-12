import {NextPage} from "next";
import NavigationBar from "../../components/sections/NavigationBar";
import FooterMenu from "../../components/sections/FooterMenu";
import DynamicItem from "../../components/items/DynamicItem";

export async function getStaticPaths() {
  // Return a list of possible value for id
  const fs = require('fs')
  const paths = fs.readdirSync('content/experience/cards')
    .filter((v: string) => v.endsWith('.md'))
    .map((v: string) => `/experience/${v.substr(0, v.lastIndexOf('.'))}`)
  console.log(paths)
  return {paths, fallback: false}
}

export async function getStaticProps({params}: {
  params: { id: unknown }
}) {
  if (typeof window === 'undefined') {
    return await import('../../store/rehydrate').then(
      ({populatePageState}) => populatePageState('themes', {
        type: 'experience',
        args: params
      }, 'site', 'navigation', 'footer'))
  }
}

const Page: NextPage = () => {
  return <>
    <NavigationBar
      useDarkPalette
      backgroundColor={"inherit"}
    />
    <DynamicItem source={"experience"}/>
    <FooterMenu/>
  </>
}

export default Page