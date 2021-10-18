import React, {FunctionComponent} from "react";
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";
import {Box} from "@mui/system";


const SectionContainer: FunctionComponent = ({children}) => {
  return (
    <Container>
      <Box>
        <Grid container spacing={3} justifyContent={"space-evenly"} alignItems={"stretch"}>
          {children}
        </Grid>
      </Box>
    </Container>
  );
}

export default SectionContainer;
