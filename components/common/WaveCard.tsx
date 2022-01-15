import Card from "@mui/material/Card";
import clsx from "clsx";
import CardMedia from "@mui/material/CardMedia";
import React, {FunctionComponent, ReactNode} from "react";
import {Grid} from "@mui/material";
import {useTheme} from '@mui/system';
import Paper from "@mui/material/Paper";
import WaveBorderCanvas from "./elements/WaveBorderCanvas";
import AppearOnScroll from "./elements/AppearOnScroll";
import RootThemeProvider from "./theming/RootThemeProvider";
import {styled} from "@mui/system";
import {css} from "@emotion/react";


interface IWaveCardProps {
  className?: string,
  inverse?: boolean,
  before?: ReactNode
}

const BeforeWaveContent = styled('span')(css`
  z-index: 20;
  position: inherit;
`)

const ScrollFix = styled('span')(({theme}) => css`
  position: absolute;
  bottom: ${-theme.spacing(1)};
  height: ${theme.spacing(2)};
  left: 0;
  width: 100%;
  z-index: 10;
`)

const WaveCard: FunctionComponent<IWaveCardProps> = ({inverse, className, children, before, ...props}) => {
  const theme = useTheme();

  let beforeContent = <Paper elevation={0} square className={clsx(className)}>
    <BeforeWaveContent>
      {before}
    </BeforeWaveContent>
    <ScrollFix/>
  </Paper>

  let content = <Card {...props} className={clsx(className)} sx={{
    position: "relative",
    backgroundColor: inverse ? 'primary.main' : 'background.paper',
    backgroundImage: 'none',
  }}>
    <CardMedia sx={{
      height: theme.spacing(10),
      marginBottom: 3,
      background: theme.palette.background.paper,
    }}>
      <WaveBorderCanvas flip={inverse} reverse background={theme.palette.primary.main}/>
    </CardMedia>
    {children}
  </Card>;

  if (!inverse) {
    beforeContent = <RootThemeProvider forceDarkMode={true}>
    </RootThemeProvider>
  }

  content = <>
    {before && beforeContent}
    {content}
  </>

  if (inverse) {
    content = <RootThemeProvider forceDarkMode={inverse}>
      {content}
    </RootThemeProvider>
  }

  return <Grid item xs={12} sm={6}>
    <AppearOnScroll style={{height: "100%"}}>
      {content}
    </AppearOnScroll>
  </Grid>
};


export default WaveCard;
