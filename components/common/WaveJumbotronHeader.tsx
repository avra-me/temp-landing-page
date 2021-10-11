import React, {FunctionComponent} from "react";
import {Grid, Theme} from "@mui/material";
import WaveJumbotron, {WaveRoot} from "./WaveJumbotron";


interface IWaveJumbotronHeaderProps {
  theme?: Theme,
  monogram?: string,
}

const WaveJumbotronHeader: FunctionComponent<IWaveJumbotronHeaderProps> = (props) => {
  const {children} = props;

  return <WaveRoot className={"section"} id={"wave-box"}>
    <WaveJumbotron>
      <Grid
        item
        xs={12}
        container
        alignItems={"center"}
        justifyContent={"center"}
        classes={{root: "lg-p-top"}}
      >
        {children}
      </Grid>
    </WaveJumbotron>
  </WaveRoot>;
}

export default WaveJumbotronHeader;
