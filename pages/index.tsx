import type {NextPage} from 'next'
import DynamicContent from "../components/sections/DynamicContent";

const Home: NextPage = () => {
  return <>
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
