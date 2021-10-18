import Grid from "@mui/material/Grid";
import React, {FunctionComponent} from "react";
import {Card, CardActionArea, CardProps, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AppearOnScroll from "./elements/AppearOnScroll";
import {styled} from "@mui/system";


const CardRoot = styled(Card)(({theme}) => ({
  height: "100%",
  width: "100%",
  marginBottom: theme.spacing(2),
  "& :last-child": {
    marginBottom: 0,
  },
  '.MuiCardActionArea-root': {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)"
    }
  }
}))

const FillImage = styled('img')({
  width: "100%",
  height: "100%",
  margin: "auto",
  maxHeight: "25em"
})


interface HorizontalCardProps extends CardProps {
  image: string;
  title: string
  flip: boolean
  link?: string
  buttons?: (string | React.ReactElement)
}

const HorizontalCard: FunctionComponent<HorizontalCardProps> = (
  {
    children,
    title,
    image,
    link,
    buttons,
    flip
  }) => {
  return (

    <Grid item xs={12}>
      <CardRoot>
        <CardActionArea
          focusRipple
          href={link || ''}
          sx={{
            textAlign: "left",
            width: "100%",
            height: "100%",
            padding: 1,
            transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          }}
        >
          <Grid
            container
            spacing={4}
            direction={flip ? "row" : "row-reverse"}
            justifyContent={"center"}
          >

            <Grid item xs={12} md={4}>
              <AppearOnScroll
                delay={300}
                offScreenProperties={{opacity: 0}}
                onScreenProperties={{opacity: [0, 1], translateX: [`${30 * (flip ? -1 : 1)}em`, "0em"]}}
              >
                <FillImage src={image} alt={image} width={400} height={300} loading="lazy"/>
              </AppearOnScroll>
            </Grid>
            <Grid item xs>
              <CardContent>
                <Typography
                  gutterBottom={false}
                  variant={"h4"}
                  color={"secondary"}
                >
                  {title}
                </Typography>
                {children}
              </CardContent>
              <CardActions>
                {buttons}
              </CardActions>
            </Grid>
          </Grid>
        </CardActionArea>
      </CardRoot>
    </Grid>
  );
};


export default HorizontalCard;
