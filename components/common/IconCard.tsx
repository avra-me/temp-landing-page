import React, {FunctionComponent, memo} from "react";
import {CardProps} from "@mui/material";
import {lighten} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AppearOnScroll from "./elements/AppearOnScroll";

interface IconCardProps extends CardProps {
  icon: string | React.ReactElement;
  color: string;
  headline: string;
  animate: boolean;
  animationDelay: number;
  buttons?: React.ReactElement[] | React.ReactElement
}

const IconCard: FunctionComponent<IconCardProps> = (props) => {
  const {
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
      sx={{
        mb: [2, 1],
        py: 1,
        px: 2
      }}
    >
      <AppearOnScroll delay={animationDelay} animationDisabled={!animate} style={{height: "100%"}}>

        <Card {...waveCardProps} className={waveCardProps.className} sx={{
          py: 2,
          px: 4
        }}>
          <CardHeader title={headline} titleTypographyProps={{variant: "h6"}}
                      avatar={<Avatar style={iconStyling}>{icon}</Avatar>}/>
          <CardContent sx={{flexGrow: 1}}>{children}</CardContent>
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

export default memo(IconCard);
