import React, {FunctionComponent} from "react";
import {useTheme} from '@mui/material/styles';
import Container from "@mui/material/Container";
import WaveBorderCanvas from "./elements/WaveBorderCanvas";
import RootThemeProvider from "./theming/RootThemeProvider";
import {Box, styled} from "@mui/system";
import {css} from "@emotion/react";

export const getWaveAreaClass = (theme: any) => css`
  @keyframes animateGradient {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
  background: linear-gradient(${theme.palette.waveAngle}deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100% );
  background-size: 400% 400%;
  animation: animateGradient 16s ease infinite;
`

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
            paddingTop: 0,
            zIndex: 20,
            height: "7vw",
            minHeight: "20px",
          }}>
            <WaveBorderCanvas background={theme.palette.background.default} flip/>
          </Box>
        </Box>
      </RootThemeProvider>
      <Box sx={{pt: [7, 8, 9, 10]}}/>
    </WaveRoot>
  );
}

export default WaveJumbotron;
