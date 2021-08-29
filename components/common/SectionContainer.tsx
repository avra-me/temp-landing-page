import React, {FunctionComponent} from "react";
import {Grid, Theme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";


const SectionContainer: FunctionComponent = ({children}) => {
    const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
    const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
    const isSmUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
    return (
        <Container>
            <Grid container spacing={isLgUp ? 5 : isMdUp ? 4 : isSmUp ? 3 : 2} direction={"row"} justifyContent={"center"}
                  alignItems={"stretch"}>
                {children}
            </Grid>
        </Container>
    );
}

export default SectionContainer;
