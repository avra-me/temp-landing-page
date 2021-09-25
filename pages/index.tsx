import type {NextPage} from 'next'
import NavigationBar from "../components/sections/NavigationBar";
import DynamicContent from "../components/sections/DynamicContent";

const Home: NextPage = () => {

  return <>
    <NavigationBar
      useDarkPalette
      backgroundColor={"inherit"}
    />
    <DynamicContent source={"home"}/>
  </>
}

export async function getStaticProps() {
  const {getPageState, getAppState} = await import('../store/rehydrate');
  const baseState = await getAppState();
  const initialReduxState = await getPageState(baseState, 'home')
  return {props: {initialReduxState}}
}

export default Home
