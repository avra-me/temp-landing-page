import WaveJumbotron from "../components/common/WaveJumbotron";
import {Typography} from "@mui/material";

const NotFound =() => {
    return <WaveJumbotron >
        <Typography style={{marginTop: "100px"}} align={"center"} variant={"h1"}>
            <b>404</b>
        </Typography>
        <Typography align={"center"} variant={"h2"}>
            Page Not Found
        </Typography>

    </WaveJumbotron>;
};

export async function getStaticProps() {
    const {getAppState} = await import('../store/rehydrate');
    const baseState = await getAppState();
    return {props: {initialReduxState: baseState}}
}

export default NotFound
