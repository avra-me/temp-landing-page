import Button from "@mui/material/Button";
import Link from "next/link";
import React, {FunctionComponent} from "react";
import clsx from "clsx";
import {Theme} from "@mui/material";
import { StyleRules } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import smoothScrollTop from "../../utilities/smoothScrollTop";
import {MenuItem} from "../../store/types/navigation";

const styles = (theme: Theme): StyleRules => ({
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    color: theme.palette.text.secondary,
  },
  link: {
    "&:after": {
      content: "\"\"",
      display: "block",
      height: "2px",
      background: `linear-gradient(270deg, ${theme.palette.secondary.dark} 0, ${theme.palette.secondary.main} 86%, ${theme.palette.secondary.light} 100%)`,
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
    color: theme.palette.text.primary,
  },
  noDecoration: {
    textDecoration: "none !important",
  }
});

interface IMenuButtonProps {
  onDrawerClose: () => void,
  active?: boolean
  classes: Record<string, string>,
  element: MenuItem
}

const MenuButton: FunctionComponent<IMenuButtonProps> = ({element, active, classes, onDrawerClose}) => {
  let isCurrentLink = !!active;


  if (React.isValidElement(element)) {
    return element;
  }

  const onClick = () => {
    if (isCurrentLink) {
      smoothScrollTop();
      onDrawerClose();
    }
  };


  const result = <Button
    key={element.title}
    size="large"
    classes={{
      text: classes.menuButtonText,
      root: clsx(classes.link, (isCurrentLink ? classes.disabledLink : ""))
    }}
    onClick={onClick}
    disableRipple>
    {element.title}
  </Button>;

  if ("link" in element) {
    return <Link
      key={element.title}
      href={element.link}
    >
      {result}
    </Link>;
  }
  return result;
};

export default withStyles(styles)(MenuButton);
