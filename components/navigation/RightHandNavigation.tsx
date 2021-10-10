import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React, {FunctionComponent} from "react";
import withStyles from '@mui/styles/withStyles';
import MenuButton from "./MenuButton";
import {Theme} from "@mui/material";
import { StyleRules } from '@mui/styles';
import {MenuItem} from "../../store/types/navigation";
import {trimEnd} from "lodash-es";

const styles = (theme: Theme): StyleRules => ({
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
  link: {
    "&:after": {
      content: "\"\"",
      display: "block",
      height: "2px",
      background: `linear-gradient(270deg, ${theme.palette.primary.dark} 0, ${theme.palette.primary.main} 86%, ${theme.palette.primary.light} 100%)`,
      borderRadius: "1px",
      transition: "width .2s ease-in-out",
      left: 0,
      bottom: 0,
      width: 0,
      position: "absolute"
    },
    "&:hover": {
      backgroundColor: "transparent",
      "&::after": {
        width: "100%"
      }
    }
  },
  disabledLink: {
    fontWeight: "bold",
  },
  noDecoration: {
    textDecoration: "none !important",
  }
});

interface IRightHandNavigation {
  onDrawerOpen: () => void,
  onDrawerClose: () => void,
  menuItems: MenuItem[],
  currentRoute: string,
}

const RightHandNavigation: FunctionComponent<IRightHandNavigation> = (
  {
    menuItems,
    currentRoute,
    onDrawerOpen,
    onDrawerClose
  }) => {
  const isRouteActive = (link?: string): boolean => {
    if(!link){
      return false;
    }
    if(currentRoute === "/"){
      return link === currentRoute;
    }
    return trimEnd(link, '/') === currentRoute;
  }
  return (
    <div>
      <Hidden mdUp implementation={"css"}>
        <IconButton onClick={onDrawerOpen} aria-label="Open Navigation" size="large">
          <MenuIcon color="action"/>
        </IconButton>
      </Hidden>
      <Hidden mdDown implementation={"css"}>
        {menuItems.map((element) =>
          <MenuButton
            key={"order" in element ? element.order : 0}
            active={isRouteActive("link" in element ? element.link : undefined)}
            element={element}
            onDrawerClose={onDrawerClose}
          />
        )}
      </Hidden>
    </div>
  );
};

export default withStyles(styles)(RightHandNavigation);
