import React, {Fragment, FunctionComponent, useCallback, useEffect, useState} from "react";
import createMuiTheme from "@material-ui/core/styles/createTheme";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import RightHandNavigation from "./RightHandNavigation";
import Monogram from "../common/elements/Monogram";
import {StyleRules, ThemeProvider} from "@material-ui/core/styles";
import NavigationDrawer from "./NavigationDrawer";
import {MenuItem} from "../../store/types/navigation";
import {motion} from "framer-motion";
import {Theme} from "@material-ui/core";

const styles = (theme: Theme): StyleRules => ({
  appBar: {
    boxShadow: "none",
    backgroundColor: theme.palette.secondary.main,
    zIndex: 100
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  brandIcon: {
    height: theme.typography.h4.fontSize,
  },
  noDecoration: {
    textDecoration: "none !important",
  }
});


interface INavBarPropsInternal {
  menuItems: MenuItem[],
  classes: Record<string, string>,
  backgroundColor: string
  disabled?: boolean,
  staticIconEnabled?: boolean,
  logo?: string,
  useDarkPalette?: boolean
}

export type INavBarProps = Omit<INavBarPropsInternal, 'classes'>

const NavBar: FunctionComponent<INavBarPropsInternal> = ({
                                                           menuItems,
                                                           disabled,
                                                           logo,
                                                           classes,
                                                           useDarkPalette,
                                                           backgroundColor
                                                         }) => {


  const [selectedTab,] = useState(null);

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const [popout, setIsPopout] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((e) => setIsPopout(e[0].intersectionRatio <= 0), {
    });
    // @ts-ignore
    observer.observe(document.getElementById('hide-navbar'))
    return () => observer.disconnect();
  }, []);
  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);
  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  if (disabled) {
    return <Fragment/>;
  }

  const theme = createMuiTheme({
    palette: {
      type: useDarkPalette ? 'dark' : 'light'
    }
  })

  return <ThemeProvider theme={theme}>
    <motion.div
      style={{width: "100%", zIndex: 99}}
      initial={false}
      animate={popout ? "popout" : "top"}
      variants={{
        top: {position: "absolute", top: 0, transition: {duration: .3, delay: .3}},
        popout: {position: "fixed", top: 0, transition: {duration: .1, delay: 0}}
      }}
    >
      <AppBar position={"absolute"} className={classes.appBar}
              style={popout ? undefined :{backgroundColor}}
      >
        <Toolbar className={classes.toolbar}>
          <Monogram logo={logo}/>

          <RightHandNavigation menuItems={menuItems} onDrawerOpen={handleMobileDrawerOpen}
                               onDrawerClose={handleMobileDrawerClose}/>
        </Toolbar>

      </AppBar>

      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={isMobileDrawerOpen}
        selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
      />
    </motion.div>
  </ThemeProvider>

}


NavBar.defaultProps = {
  useDarkPalette: true,
  backgroundColor: undefined
};

export default withStyles(styles)(NavBar);
