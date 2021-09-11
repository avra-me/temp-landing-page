import type {NextPage} from 'next'
import NavigationBar from "../components/sections/NavigationBar";
import FooterMenu from "../components/sections/FooterMenu";
import DynamicHomeContent from "../components/sections/DynamicHomeContent";

const Home: NextPage = () => {

  return <>
    <NavigationBar
      useDarkPalette
      backgroundColor={"inherit"}
    />
    <DynamicHomeContent/>
    <FooterMenu/>
  </>
}

export async function getStaticProps() {
  if (typeof window === 'undefined') {
    return await import('../store/rehydrate').then(
      ({populatePageState}) => populatePageState('themes', 'home', 'site', 'navigation', 'footer'))
  }
}

export default Home
