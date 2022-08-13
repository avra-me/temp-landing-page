import type {NextPage} from 'next'
import Image from "next/image";
import HomeImage from "../public/assets/a896d9_0237fe314e7d4396bdd5701871552a63.jpg"
import DynamicContent from "../components/sections/DynamicContent";
import {css} from "@emotion/react";
import {styled} from "@mui/system";

const BackgroundImage = styled(Image)(css`
  z-index: -1
`)

const Home: NextPage = () => {
  return <>
    <BackgroundImage src={HomeImage} layout={"fill"} objectFit={"cover"}/>
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
