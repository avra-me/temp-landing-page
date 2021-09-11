import React, {FunctionComponent} from "react";
import {Box, Grid, Hidden, IconButton, Typography} from "@material-ui/core";
import {createTheme, StyleRules, Theme, ThemeProvider, withStyles} from '@material-ui/core/styles';
import transitions from "@material-ui/core/styles/transitions";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import {AttributionItem, SocialButton} from "../../store/types/footer";
import WaveBorderCanvas from "../common/elements/WaveBorderCanvas";
import SectionContentMarkdown from "../common/elements/SectionContentMarkdown";

const styles = (theme: Theme): StyleRules => ({
  footerInner: {
    backgroundColor: theme.palette.grey["900"],
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
      paddingBottom: theme.spacing(10),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
  },
  footerLinks: {
    marginTop: theme.spacing(2.5),
    marginBot: theme.spacing(1.5),
    color: theme.palette.common.white,
  },
  infoIcon: {
    color: `${theme.palette.common.white} !important`,
    backgroundColor: "#33383b",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  infoAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  socialIcon: {
    fill: theme.palette.common.white,
    backgroundColor: "#33383b",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  link: {
    cursor: "Pointer",
    color: theme.palette.common.white,
    transition: transitions.create(["color"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn,
    }),
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  whiteBg: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
  },
  border: {
    height: "7vw",
    minHeight: "7vw",
  }
});

interface IFooterProps {
  title: string,
  subTitle?: string,
  attributionIcons: AttributionItem[],
  socialIcons: SocialButton[],
  classes: Record<string, string>
  disabled?: boolean,
}

const Footer: FunctionComponent<IFooterProps> = (props) => {
  const {classes, disabled, title, subTitle, attributionIcons, socialIcons, children} = props;
  const theme = useTheme();
  if (disabled) {
    return null;
  }
  const gridSizing: Record<string, number> = {xs: 12, md: 6};
  if (children) {
    gridSizing.lg = 4;
  }
  return (
    <ThemeProvider theme={createTheme({palette: {type: "dark"}})}>
      <footer className="lg-p-top">
        <div className={classes.border}>
          <WaveBorderCanvas
            background={theme.palette.grey["900"]}
            flip
          />
        </div>
        <Paper square className={classes.footerInner}>
          <Grid container spacing={5}>
            {children}
            <Hidden smDown={!children} mdDown={!!children}>
              <Grid item {...gridSizing}>
                <Box display="flex" justifyContent="center">
                  <div>
                    {attributionIcons.map((info, index) => (
                      <Box display="flex" mb={1} key={index}>
                        <Box mr={2}>
                          <IconButton
                            className={classes.infoIcon}
                            tabIndex={-1}
                            disabled={info.link === undefined}
                            href={info.link}
                          >
                            <Avatar className={classes.infoAvatar} src={info.icon} alt={"i"}
                                    aria-label={"icon"}/>
                          </IconButton>
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
                    <IconButton
                      aria-label={button.content}
                      className={classes.socialIcon}
                      href={button.link}
                    >
                      <Avatar className={classes.infoAvatar} src={button.icon} alt={"i"}
                              aria-label={"icon"}/>
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </footer>
    </ThemeProvider>
  );
}

export default withStyles(styles)(Footer);
