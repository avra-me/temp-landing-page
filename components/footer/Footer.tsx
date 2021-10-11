import React, {FunctionComponent} from "react";
import {Box, darken, Grid, Hidden, IconButton, Typography} from "@mui/material";
import {StyledEngineProvider, useTheme,} from '@mui/material/styles';


import Avatar from "@mui/material/Avatar";
import {AttributionItem, SocialButton} from "../../store/types/footer";
import WaveBorderCanvas from "../common/elements/WaveBorderCanvas";
import SectionContentMarkdown from "../common/elements/SectionContentMarkdown";
import RootThemeProvider from "../common/theming/RootThemeProvider";
import {styled} from "@mui/system";

interface IFooterProps {
  title: string,
  subTitle?: string,
  attributionIcons: AttributionItem[],
  socialIcons: SocialButton[],
  disabled?: boolean,
}


const DarkIconButton = styled(IconButton)(({theme}) => ({
  fill: theme.palette.common.white,
  backgroundColor: darken(theme.palette.primary.light, .75),
  '&:hover': {
    backgroundColor: theme.palette.primary.light
  }
  // Seems emotion doesn't type 100% correctly yet
})) as typeof IconButton;

const DarkAvatar = styled(Avatar)(({theme}) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  // Seems emotion doesn't type 100% correctly yet
})) as typeof Avatar;

const Footer: FunctionComponent<IFooterProps> = (props) => {
  const {disabled, title, subTitle, attributionIcons, socialIcons, children} = props;
  const theme = useTheme();
  if (disabled) {
    return null;
  }
  const gridSizing: Record<string, number> = {xs: 12, md: 6};
  if (children) {
    gridSizing.lg = 4;
  }
  return (
    <StyledEngineProvider injectFirst>
      <RootThemeProvider forceDarkMode>
        <Box component={"footer"} className="lg-p-top">
          <Box sx={{
            height: '7vw',
            maxHeight: '7vw'
          }}>
            <WaveBorderCanvas
              background={theme.palette.grey["900"]}
              flip
            />
          </Box>
          <Box sx={{
            bgcolor: theme.palette.grey["900"],
            pt: [8, 10],
            pb: [8, 10],
            pl: [2, 10],
            pr: [2, 10]
          }}>
            <Grid container spacing={5}>
              {children}
              <Hidden mdDown={!children} lgDown={!!children}>
                <Grid item {...gridSizing}>
                  <Box display="flex" justifyContent="center">
                    <div>
                      {attributionIcons.map((info, index) => (
                        <Box display="flex" mb={1} key={index}>
                          <Box mr={2}>
                            <DarkIconButton
                              tabIndex={-1}
                              disabled={info.link === undefined}
                              href={info.link}
                              size="large">
                              <DarkAvatar
                                src={info.icon}
                                alt={"i"}
                                aria-label={"icon"}
                              />
                            </DarkIconButton>
                          </Box>
                          <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                          >
                            <SectionContentMarkdown content={info.content}/>
                          </Box>
                        </Box>
                      ))}
                    </div>
                  </Box>
                </Grid>
              </Hidden>
              <Grid item {...gridSizing}>
                <Typography variant="h6" paragraph color={"textPrimary"}>
                  {title}
                </Typography>
                <Typography color={"textSecondary"} paragraph>
                  {subTitle}
                </Typography>
                <Box display="flex">
                  {socialIcons.map((button, index) => (
                    <Box key={index} mr={index !== attributionIcons.length - 1 ? 1 : 0}>
                      <DarkIconButton
                        sx={{
                          borderRadius: theme.shape.borderRadius
                        }}
                        aria-label={button.content}
                        href={button.link}
                        size="large">
                        <DarkAvatar
                          src={button.icon}
                          alt={"i"}
                          aria-label={"icon"}
                        />
                      </DarkIconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </RootThemeProvider>
    </StyledEngineProvider>
  );
}

export default Footer;
