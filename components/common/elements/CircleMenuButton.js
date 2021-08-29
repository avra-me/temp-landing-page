import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";

const styles = theme => ({
    "button": {
      lineHeight: 0,
      transition: "border-top-color 0.15s linear, border-right-color 0.15s linear 0.10s, border-bottom-color 0.15s linear 0.20s",
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&::after": {
        top: 0,
        left: 0,
        border: "0 solid transparent",
        boxSizing: "inherit",
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "100%"
      },

      "&::before": {
        border: "2px solid transparent",
        boxSizing: "inherit",
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "100%"
      },

      "&:hover::before": {
        borderTopColor: theme.palette.secondary.main,
        borderRightColor: theme.palette.secondary.main,
        borderBottomColor: theme.palette.secondary.dark,
        transition: "border-top-color 0.15s linear, border-right-color 0.15s linear 0.10s, border-bottom-color 0.15s linear 0.20s"
      },
      "&:hover::after": {
        borderTop: `2px solid ${theme.palette.secondary.dark}`,
        borderLeftWidth: theme.spacing(.25),
        borderRightWidth: "2px",
        transform: "rotate(270deg)",
        transition: "transform 0.4s linear 0s, border-left-width 0s linear 0.35s"
      }
    }
  }
);

const CircleMenuButton = ({classes, children, className, ...props}) => {
  return <IconButton disableRipple className={clsx(className, classes.button)} {...props}>
    {children}
  </IconButton>;
}

CircleMenuButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};

export default withStyles(styles)(CircleMenuButton);

