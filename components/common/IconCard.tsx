import React, {FunctionComponent, memo} from "react";
import {CardProps, lighten, StyleRules, Theme, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import clsx from "clsx";
import AppearOnScroll from "./elements/AppearOnScroll";

const styles = (theme: Theme): StyleRules => ({
  iconWrapper: {
    display: "inline-flex",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1.5),
    marginRight: theme.spacing(3)
  },
  root: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(1)
    },
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px !important`
  },
  content: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2, 4)
  },
  avatar: {
    flex: "0 0 auto",
    marginRight: 16,
  }
});

interface IconCardProps extends CardProps {
  classes: Record<string, string>
  icon: string | React.ReactElement;
  color: string;
  headline: string;
  animate: boolean;
  animationDelay: number;
  buttons?: React.ReactElement[] | React.ReactElement
}

const IconCard: FunctionComponent<IconCardProps> = (props) => {
  const {
    classes,
    icon,
    color = "#fff",
    headline,
    children,
    animate,
    animationDelay,
    buttons,
    ...waveCardProps
  } = props;
  const iconStyling = {
    color: color,
    backgroundColor: lighten(color, 0.5),
    fill: color,
  };

  return (
    <Grid
      item
      xs={12}
      md={6}
      className={classes.root}
    >
      <Card {...waveCardProps} className={clsx(waveCardProps.className, classes.card)}>
        <CardHeader title={headline} titleTypographyProps={{variant: "h6"}}
                    avatar={<Avatar style={iconStyling}>{icon}</Avatar>}/>
        <CardContent className={classes.content}>{children}</CardContent>
        <CardActions>
          <AppearOnScroll delay={animationDelay} animationDisabled={!animate} style={{height: "100%"}}>
            {buttons}
          </AppearOnScroll>
        </CardActions>
      </Card>
    </Grid>
  );
}

IconCard.defaultProps = {
  animationDelay: 100,
};

export default withStyles(styles)(memo(IconCard));
