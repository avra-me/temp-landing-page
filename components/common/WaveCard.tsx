import Card from "@mui/material/Card";
import clsx from "clsx";
import CardMedia from "@mui/material/CardMedia";
import React, {FunctionComponent, ReactNode} from "react";
import {Grid} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import WaveBorderCanvas from "./elements/WaveBorderCanvas";
import AppearOnScroll from "./elements/AppearOnScroll";
import RootThemeProvider from "./theming/RootThemeProvider";
import {styled} from "@mui/system";


interface IWaveCardProps {
  className?: string,
  inverse?: boolean,
  before?: ReactNode
}

const WaveCard: FunctionComponent<IWaveCardProps> = ({inverse, className, children, before, ...props}) => {
  const theme = useTheme();
  return <Grid item xs={12} sm={6}>
    <AppearOnScroll style={{height: "100%"}}>
      <RootThemeProvider forceDarkMode={inverse}>
        <Card {...props} className={clsx(className, "MuiPaper-root")}>
          {before && <RootThemeProvider forceDarkMode={!inverse}>
              <Paper elevation={0} square className={className} sx={{
                position: "relative"
              }}>
                  <span className={'wrapBeforeContent'}>
                    {before}
                  </span>
                  <span className={'scrollFix'}/>
              </Paper>
          </RootThemeProvider>}
          <CardMedia sx={{
            height: theme.spacing(10),
            marginBottom: -theme.spacing(3),
            background: theme.palette.background.paper,
          }}>
            <WaveBorderCanvas flip={inverse} reverse background={theme.palette.primary.main}/>
          </CardMedia>
          {children}
        </Card>
      </RootThemeProvider>
    </AppearOnScroll>
  </Grid>;
};


export default styled(WaveCard)(({theme, inverse}) => ({
  '*': {
    background: inverse ? theme.palette.primary.main : undefined
  },
  '.wrapBeforeContent': {
    zIndex: 20,
    position: "inherit"
  },
  '.scrollFix': {
    position: "absolute",
    bottom: -theme.spacing(1),
    height: theme.spacing(2),
    left: 0,
    width: "100%",
    zIndex: 10
  }
}));
