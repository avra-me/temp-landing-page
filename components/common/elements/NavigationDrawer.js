import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {Link} from "@reach/router";
import {
    Drawer,
    isWidthUp,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    withWidth,
    Icon
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {withStyles} from "@material-ui/core/styles";
import CircleMenuButton from "./CircleMenuButton";

const styles = (theme) => ({
    closeIcon: {
        marginRight: theme.spacing(0.5),
    },
    headSection: {
        width: 200,
    },
    blackList: {
        backgroundColor: theme.palette.background.paper,
        height: "100%",
    },
    noDecoration: {
        textDecoration: "none !important",
    },
});

function NavigationDrawer(props) {
    const {
        width,
        open,
        onClose,
        anchor,
        classes,
        menuItems,
        selectedItem,
        theme,
    } = props;

    useEffect(() => {
        // eslint-disable-next-line no-undef
        window.onresize = () => {
            if (isWidthUp("sm", width) && open) {
                onClose();
            }
        };
    }, [width, open, onClose]);

    return (
        <Drawer variant="temporary" open={open} onClose={onClose} anchor={anchor} classes={{paper: classes.drawer}}
                transitionDuration={500}>
            <Toolbar className={classes.headSection}>
                <ListItem
                    style={{
                        paddingTop: theme.spacing(0),
                        paddingBottom: theme.spacing(0),
                        height: "100%",
                        justifyContent: anchor === "left" ? "flex-start" : "flex-end",
                    }}
                    disableGutters
                >
                    <ListItem
                        button
                        /**
                         * We disable ripple as it will make a weird animation
                         * with primary and secondary color
                         */
                        disableRipple
                        disableTouchRipple
                    >
                        <ListItemText>Navigation</ListItemText>
                    </ListItem>
                    <ListItemIcon className={classes.closeIcon}>
                        <CircleMenuButton onClick={onClose} aria-label="Close Navigation">
                            <CloseIcon color="primary"/>
                        </CircleMenuButton>
                    </ListItemIcon>
                </ListItem>
            </Toolbar>
            <List className={classes.blackList}>
                {menuItems.map((element) => {
                    if (element.link) {
                        return (
                            <Link
                                key={element.name}
                                to={element.link}
                                className={classes.noDecoration}
                                onClick={onClose}
                            >
                                <ListItem
                                    button
                                    selected={selectedItem === element.name}
                                    /**
                                     * We disable ripple as it will make a weird animation
                                     * with primary and secondary color
                                     */
                                    disableRipple
                                    disableTouchRipple
                                >
                                    <ListItemIcon>
                                        <Icon>
                                            {element.icon}
                                        </Icon>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" color={"textPrimary"}>
                                                {element.name}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            </Link>
                        );
                    }
                    return (
                        element
                    );
                })}
            </List>
        </Drawer>
    );
}

NavigationDrawer.propTypes = {
    anchor: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    selectedItem: PropTypes.string,
};

export default withWidth()(
    withStyles(styles, {withTheme: true})(NavigationDrawer)
);
