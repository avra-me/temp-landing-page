import React, {FunctionComponent} from "react";
import {useTheme} from '@mui/material/styles';
import Container from "@mui/material/Container";
import WaveBorderCanvas from "./elements/WaveBorderCanvas";
import RootThemeProvider from "./theming/RootThemeProvider";
import {Box, styled} from "@mui/system";

export const getWaveAreaClass = (theme: any) => {
  return {
    "@keyframes animateGradient": {
      "0%": {
        backgroundPosition: "0% 50%",
      },
      "50%": {
        backgroundPosition: "100% 50%",
      },
      "100%": {
        backgroundPosition: "0% 50%",
      }
    },
    waveArea: {
      backgroundSize: "400% 400%",
      background: `linear-gradient(${theme.palette.waveAngle}deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100% )`,
      animation: "$animateGradient 16s ease infinite"
    }
  }
};

export const WaveRoot = styled('span')(({theme}) => getWaveAreaClass(theme))
const WaveJumbotron: FunctionComponent = (props) => {
  const {children} = props;
  const theme = useTheme();
  return (
    <WaveRoot className={"section"} id={"wave-box"}>
      <RootThemeProvider forceDarkMode>
        <Box sx={{
          color: 'common.white',
          position: "relative",
          background: "inherit",
          zIndex: 20
        }}>
          <Container sx={{
            paddingTop: theme.spacing(6),
            alignItems: "center",
            justifyContent: "center",
            mb: [3, 6, 9, 12]
          }}>
            <Box sx={{
              maxWidth: {md: 'none !important'}
            }}>
              {children}
            </Box>
          </Container>
          <div id={"hide-navbar"}/>
          <Box sx={{
            paddingTop: 4,
            zIndex: 20,
            height: 20,
            minHeight: 20,
          }}>
            <WaveBorderCanvas background={theme.palette.background.default} flip/>
          </Box>
        </Box>
      </RootThemeProvider>
      <div className={"lg-p-top"}/>
    </WaveRoot>
  );
}

export default WaveJumbotron;
