import Grid from "@material-ui/core/Grid";
import React, {FunctionComponent} from "react";
import {createStyles, Theme, WithStyles, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import WaveBorder from "./WaveBorder";


const styles = (theme: Theme) => createStyles({
  root: {
    height: "100%"
  },
  mediaGrid: {
    position: "relative"
  },
  media: {
    width: "100%",
    margin: "auto",
    zIndex: -2
  },
  dividerTop: {
    position: "absolute",
    top: -1,
    left: -1,
    right: -1,
    zIndex: -1
  },
  dividerBottom: {
    position: "absolute",
    bottom: -10,
    left: -1,
    right: -1,
    zIndex: -1
  },
  wavyBorder: {
    height: "30%",
    minHeight: "30%",
    fill: theme.palette.background.default,
  },
  mediaItem: {
    position: "relative",
    flexGrow: 1
  }
});

interface WavyImageProps extends WithStyles<typeof styles> {
  src?: string
  alt?: string
}

const WavyImage: FunctionComponent<WavyImageProps> = ({src, alt, classes}) => {
  return <Grid item className={classes.root} container alignItems={"center"}>
    <Grid item/>
    <Grid item container className={classes.mediaItem}>
      <div className={classes.dividerTop}>
        <WaveBorder className={classes.wavyBorder} pause flip/>
      </div>
      {
          <img src={src} className={classes.media} alt={alt}/>
      }
      <div className={classes.dividerBottom}>
        <WaveBorder className={classes.wavyBorder} pause/>
      </div>
    </Grid>
    <Grid item/>
  </Grid>;
};

export default withStyles(styles)(WavyImage);
