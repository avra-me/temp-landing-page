import React, {FunctionComponent, useEffect} from "react";
import {
    Drawer,
    DrawerProps,
    isWidthUp,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    StyleRules,
    Theme,
    Toolbar,
    Typography,
    withStyles,
    withWidth,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Icon from "@material-ui/core/Icon";
import CircleMenuButton from "../common/elements/CircleMenuButton";
import Link from 'next/link'
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import {MenuItem} from "../../store/types/navigation";

const styles = (theme: Theme): StyleRules => ({
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

export interface INavigationDrawerProps {
    width: Breakpoint,
    open: boolean,
    onClose: () => void,
    anchor: DrawerProps['anchor'],
    menuItems: MenuItem[],
    classes: Record<string, string>,
    selectedItem: string | null,
    theme: Theme
}

const NavigationDrawer: FunctionComponent<INavigationDrawerProps> = (props) => {
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
                    if ("link" in element) {
                        return (
                            <Link
                                key={element.title}
                                href={element.link}
                            >
                                <a className={classes.noDecoration}>
                                    <ListItem
                                        button
                                        selected={selectedItem === element.title}
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
                                                    {element.title}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                </a>
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

export default withWidth()(
    withStyles(styles, {withTheme: true})(NavigationDrawer)
);
