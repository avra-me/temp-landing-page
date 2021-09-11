import React, {Fragment, FunctionComponent} from "react";
import WaveJumbotron from "../common/WaveJumbotronHeader";
import {JumboHeaderSection as JumboHeaderSectionType} from "../../store/types/home";
import ReactMarkdown from "react-markdown";
import {Grid, Hidden, Theme, Typography} from "@material-ui/core";
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles';

import {HeadingComponent} from "react-markdown/lib/ast-to-react";
import {Variant} from "@material-ui/core/styles/createTypography";

const styles = (theme: Theme) => createStyles({
    brand: {
        height: "auto",
        width: "75px",
        overflow: "inherit",
    },
    title: {
        marginBottom: theme.spacing(4)
    }
});

const JumboHeaderSection: FunctionComponent<JumboHeaderSectionType & WithStyles<typeof styles>> = (props) => {
    const {disabled, content, classes} = props;

    const jumboProps = {
        ...props,
    };

    if (disabled) {
        return <Fragment/>;
    }

    const renderMdHeader: HeadingComponent = ({node, className, children}) => {
        children = children.filter(v => !(typeof v === "string" && !v.trim()))
        return <Grid item xs={10} sm={12} className={classes.title}>
            <Hidden smDown={node.tagName > "h3"} implementation={"css"}>
                <Typography variant={node.tagName as Variant} component={"div"} align={"center"}
                            className={className}>
                    {children}
                </Typography>
            </Hidden>
        </Grid>
    }
    return <WaveJumbotron {...jumboProps}>
        {/* eslint-disable-next-line react/no-children-prop */}
        <ReactMarkdown children={content}
                       components={{
                           h1: renderMdHeader,
                           h2: renderMdHeader,
                           h3: renderMdHeader,
                           h4: renderMdHeader,
                           h5: renderMdHeader,
                           h6: renderMdHeader
                       }}
        />
    </WaveJumbotron>;
};


export default withStyles(styles)(JumboHeaderSection);
