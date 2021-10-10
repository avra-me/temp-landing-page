import React, {FunctionComponent} from "react";
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";


const SectionContainer: FunctionComponent = ({children}) => {
  return (
    <Container>
      <Grid container spacing={3} direction={"row"} justifyContent={"center"}
            alignItems={"stretch"}>
        {children}
      </Grid>
    </Container>
  );
}

export default SectionContainer;
