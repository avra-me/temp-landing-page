import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, {FunctionComponent} from "react";
import {createStyles, PropTypes, StyleRules, Theme, WithStyles, withStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
type Alignment = PropTypes.Alignment;

const styles = (theme: Theme): StyleRules => createStyles({
    heading: {
        paddingTop: theme.spacing(10),
    },
    title: {
        marginBottom: theme.spacing(1),
    },
});

interface ISectionHeading extends WithStyles<typeof styles> {
    id?: string
    title: React.ReactElement | string,
    subTitle?: React.ReactElement | string,
    align?: Alignment,
}

const SectionHeading: FunctionComponent<ISectionHeading> = ({title, subTitle, align, classes, ...props}) => {
    return (
        <Box className={classes.heading} {...props}>
            <Typography
                gutterBottom={false}
                variant={"h3"}
                color={"primary"}
                align={align}
                className={classes.title}
            >
                {title}
            </Typography>
            {subTitle && (
                <Typography
                    gutterBottom={false}
                    variant={"subtitle1"}
                    color={"secondary"}
                    align={align}
                >
                    {subTitle}
                </Typography>
            )}
        </Box>
    );
};

SectionHeading.defaultProps = {
    align: "left",
};

export default withStyles(styles)(SectionHeading);
