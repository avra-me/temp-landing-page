import React, {Fragment, FunctionComponent, useCallback, useState} from "react";
import createMuiTheme from "@material-ui/core/styles/createTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import RightHandNavigation from "./RightHandNavigation";
import {motion} from "framer-motion";
import Monogram from "../common/elements/Monogram";
import {Theme} from "@material-ui/core";
import {StyleRules} from "@material-ui/styles";
import {Property} from "csstype";
import NavigationDrawer from "./NavigationDrawer";
import {MenuItem} from "../../store/types/navigation";

const styles = (theme: Theme): StyleRules => ({
    appBar: {
        boxShadow: "none",
        backgroundColor: theme.palette.secondary.main,
        zIndex: 100
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    brandIcon: {
        height: theme.typography.h4.fontSize,
    },
    noDecoration: {
        textDecoration: "none !important",
    }
});


interface INavBarPropsInternal {
    menuItems: MenuItem[],
    classes: Record<string, string>,
    position: Property.Position,
    backgroundColor: string
    disabled?: boolean,
    staticIconEnabled?: boolean,
    logo?: string,
    useDarkPalette?: boolean
}

export type INavBarProps = Omit<INavBarPropsInternal, 'classes'>

const NavBar: FunctionComponent<INavBarPropsInternal> = ({
                                                     menuItems,
                                                     disabled,
                                                     logo,
                                                     classes,
                                                     position,
                                                     useDarkPalette,
                                                     backgroundColor
                                                 }) => {


    const [selectedTab,] = useState(null);

    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
    const handleMobileDrawerOpen = useCallback(() => {
        setIsMobileDrawerOpen(true);
    }, [setIsMobileDrawerOpen]);
    const handleMobileDrawerClose = useCallback(() => {
        setIsMobileDrawerOpen(false);
    }, [setIsMobileDrawerOpen]);

    if (disabled) {
        return <Fragment/>;
    }


    return (<>
            <motion.div
                style={{position, width: "100%", zIndex: 99}}
                initial={false}
                animate={position === "absolute" ? "visible" : "hidden"}
                variants={{
                    visible: {opacity: 1, top: 0, transition: {duration: .3, delay: .3}},
                    hidden: {opacity: 0, top: "-200px", transition: {duration: .1, delay: 0}}
                }}
            >
                <AppBar position={"absolute"} className={classes.appBar}
                        style={backgroundColor ? {backgroundColor} : undefined}
                >
                    <ThemeProvider theme={createMuiTheme({palette: {type: useDarkPalette ? "dark" : "light"}})}>
                        <Toolbar className={classes.toolbar}>
                            <Monogram logo={logo}/>

                            <RightHandNavigation menuItems={menuItems} onDrawerOpen={handleMobileDrawerOpen}
                                                 onDrawerClose={handleMobileDrawerClose}/>
                        </Toolbar>
                    </ThemeProvider>

                </AppBar>
            </motion.div>

            <NavigationDrawer
                menuItems={menuItems}
                anchor="right"
                open={isMobileDrawerOpen}
                selectedItem={selectedTab}
                onClose={handleMobileDrawerClose}
            />
        </>
    );
}


NavBar.defaultProps = {
    position: "fixed",
    useDarkPalette: true,
    backgroundColor: undefined
};

export default withStyles(styles)(NavBar);
