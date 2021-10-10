import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, {FunctionComponent} from "react";
import {Theme} from "@mui/material";
import {StyleRules, WithStyles} from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';

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
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify',
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
