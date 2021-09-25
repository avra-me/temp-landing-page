import React, {FunctionComponent} from "react";
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";


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
