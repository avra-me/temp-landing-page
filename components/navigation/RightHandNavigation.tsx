import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React, {FunctionComponent} from "react";
import {withStyles} from '@material-ui/core/styles';
import MenuButton from "./MenuButton";
import {Theme} from "@material-ui/core";
import {StyleRules} from "@material-ui/core/styles";
import {MenuItem} from "../../store/types/navigation";

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
}

const RightHandNavigation: FunctionComponent<IRightHandNavigation> = ({menuItems, onDrawerOpen, onDrawerClose}) => {
  return <div>
    <Hidden mdUp implementation={"css"}>
      <IconButton
        onClick={onDrawerOpen}
        aria-label="Open Navigation"
      >
        <MenuIcon color="action"/>
      </IconButton>
    </Hidden>
    <Hidden smDown implementation={"css"}>
      {menuItems.map((element) => <MenuButton key={"order" in element ? element.order : 0} element={element} onDrawerClose={onDrawerClose}/>)}
    </Hidden>
  </div>;
};

export default withStyles(styles)(RightHandNavigation);
