import React, {FunctionComponent, memo} from "react";
import {CardProps} from "@mui/material";
import { lighten, Theme } from "@mui/material/styles";
import { StyleRules } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
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
    padding: `${theme.spacing(1)} ${theme.spacing(2)} !important`
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
      <AppearOnScroll delay={animationDelay} animationDisabled={!animate} style={{height: "100%"}}>

        <Card {...waveCardProps} className={clsx(waveCardProps.className, classes.card)}>
          <CardHeader title={headline} titleTypographyProps={{variant: "h6"}}
                      avatar={<Avatar style={iconStyling}>{icon}</Avatar>}/>
          <CardContent className={classes.content}>{children}</CardContent>
          <CardActions>
            {buttons}
          </CardActions>
        </Card>
      </AppearOnScroll>

    </Grid>
  );
}

IconCard.defaultProps = {
  animationDelay: 100,
};

export default withStyles(styles)(memo(IconCard));
