import React, {FunctionComponent} from "react";
import {Grid, Theme} from "@mui/material";
import WaveJumbotron from "./WaveJumbotron";


interface IWaveJumbotronHeaderProps {
  theme?: Theme,
  monogram?: string,
}

const WaveJumbotronHeader: FunctionComponent<IWaveJumbotronHeaderProps> = (props) => {
  const {children} = props;

  return <span className={"section"}>
    <WaveJumbotron>
      <Grid
        item
        xs={12}
        container
        alignItems={"center"}
        justifyContent={"center"}
        sx={{pt: [7, 8, 9, 10]}}
      >
        {children}
      </Grid>
    </WaveJumbotron>
  </span>;
}

export default WaveJumbotronHeader;
