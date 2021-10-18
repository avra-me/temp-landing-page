import Hidden from "@mui/material/Hidden";
import {styled} from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React, {FunctionComponent} from "react";
import MenuButton from "./MenuButton";
import {MenuItem} from "../../store/types/navigation";
import {trimEnd} from "lodash-es";
import {Settings} from "@mui/icons-material";

const PREFIX = 'RightHandNavigation';

const classes = {
  menuButtonText: `${PREFIX}-menuButtonText`,
  link: `${PREFIX}-link`,
  disabledLink: `${PREFIX}-disabledLink`,
  noDecoration: `${PREFIX}-noDecoration`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.menuButtonText}`]: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },

  [`& .${classes.link}`]: {
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

  [`& .${classes.disabledLink}`]: {
    fontWeight: "bold",
  },

  [`& .${classes.noDecoration}`]: {
    textDecoration: "none !important",
  }
}));

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
    <Root>
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
        <IconButton onClick={onDrawerOpen} aria-label="Open Navigation" size="large">
          <Settings color="action"/>
        </IconButton>
      </Hidden>
    </Root>
  );
};

export default (RightHandNavigation);
