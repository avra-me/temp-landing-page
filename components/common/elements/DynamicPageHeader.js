import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ProgressiveImage from "gatsby-image";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = theme => ({
  header: {
    padding: theme.spacing(4)
  },
  wave: {
    height: "20%"
  },
  image: {
    maxWidth: "325px",
    flexGrow: 1
  }
});


const DynamicPageHeader = ({classes, image, title, subTitle, text, badge}) => {
  const DynamicImage = () => {
    if (typeof image === "object") {
      return <ProgressiveImage className={classes.image} fluid={image}/>;
    } else {
      return <img className={classes.image} src={image} alt={"Image could not be loaded"}/>;
    }
  };

  return <Grid container alignItems={"stretch"} className={"lg-p-top"}>
    {image && <Grid item sm={2} xs={12} container alignItems={"center"} justify={"center"}>
      <DynamicImage/>
    </Grid>}
    <Grid item sm={image ? 8 : 12} xs={12}>
      <Grid container className={classes.header} alignItems={"stretch"} justify={badge || image ? "flex-start" : "center"}>

        <Grid item xs={12} sm={badge ? 11 : 12}>
          <Typography variant={image ? badge ? "h5" : "h5" : "h4"} align={!image ? "center" : "left"}>{title}</Typography>
        </Grid>
        {badge && <Grid item xs={12} sm={1} container alignItems={"flex-end"}>
          {badge}
        </Grid>}
        <Grid item xs={12} sm={10}>
          <Typography variant={image ? badge ? "h6" : "h6" : "h5"} color={"textSecondary"}
                      gutterBottom align={!image ? "center" : "left"}>{subTitle}</Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Typography variant={"body1"} color={"textPrimary"} paragraph>{text}</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>;
};

DynamicPageHeader.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  text: PropTypes.string,
  badge: PropTypes.node,
  image: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
};


export default withStyles(styles)(DynamicPageHeader);
