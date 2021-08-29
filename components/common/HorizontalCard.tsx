import Grid from "@material-ui/core/Grid";
import React, {FunctionComponent} from "react";
import {Card, CardActionArea, CardProps, StyleRules, Theme, Typography, withStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import AppearOnScroll from "./elements/AppearOnScroll";

const styles = (theme: Theme): StyleRules => ({
    root: {
        height: "100%",
        width: "100%",
        marginBottom: theme.spacing(2),
        "& :last-child": {
            marginBottom: 0,
        },
    },
    dark: {
        background: theme.palette.secondary.dark,
    },
    text: {
        paddingBottom: theme.spacing(3),
    },
    mediaGrid: {
        position: "relative",
    },
    media: {
        width: "100%",
        margin: "auto",
    },
    dividerTop: {
        width: "100%",
        position: "absolute",
        top: -1,
        zIndex: 10,
    },
    dividerBottom: {
        width: "100%",
        position: "absolute",
        bottom: -1,
        zIndex: 10,
    },
    wavyBorder: {
        height: "30%",
        minHeight: "30%",
        fill: theme.palette.background.paper,
    },
    mediaItem: {
        position: "relative",
        flexGrow: 1,
    },
    mediaButton: {
        textAlign: "left",
        width: "100%",
        height: "100%",
        padding: theme.spacing(1),
        transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)"
        },
    }
});


interface HorizontalCardProps extends CardProps {
    classes: Record<string, string>
    image: string;
    title: string
    flip: boolean
    link?: string
    buttons?: (string | React.ReactElement)
}

const HorizontalCard: FunctionComponent<HorizontalCardProps> = ({
                                                                    classes,
                                                                    children,
                                                                    title,
                                                                    image,
                                                                    link,
                                                                    buttons,
                                                                    flip
                                                                }) => {
    return (
        <Card className={classes.root}>
            <CardActionArea focusRipple
                            className={classes.mediaButton}
                            href={link || ''}>

                <Grid
                    container
                    spacing={4}
                    direction={flip ? "row" : "row-reverse"}
                    justifyContent={"center"}
                >

                    <Grid item xs={12} md={5}>
                        <AppearOnScroll
                            offScreenProperties={{opacity: 0, x: `${30 * (flip ? -1 : 1)}%`}}
                            onScreenProperties={{opacity: 1, x: 0}}
                        >
                            <img src={image} className={classes.media}/>
                        </AppearOnScroll>
                    </Grid>
                    <Grid item xs>
                        <CardContent>
                            <Typography
                                gutterBottom={false}
                                variant={"h4"}
                                color={"secondary"}
                                className={classes.header}
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
        </Card>
    );
};


export default withStyles(styles)(HorizontalCard);
