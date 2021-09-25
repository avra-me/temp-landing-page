import type {NextPage} from 'next'
import DynamicContent from "../components/sections/DynamicContent";

const Education: NextPage = () => {

  return <>
    <DynamicContent source={"education"}/>
  </>
}

export async function getStaticProps() {
  const {getPageState, getAppState} = await import('../store/rehydrate');
  const baseState = await getAppState();
  const initialReduxState = await getPageState(baseState, 'education')
  return {props: {initialReduxState}}
}

export default Education
