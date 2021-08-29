import React, {Fragment, FunctionComponent, useCallback, useState} from "react";
import createMuiTheme from "@material-ui/core/styles/createTheme";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import RightHandNavigation from "./RightHandNavigation";
import Monogram from "../common/elements/Monogram";
import {Theme, ThemeProvider} from "@material-ui/core";
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

    const theme = createMuiTheme({
        palette: {
            type: useDarkPalette ? 'dark' : 'light'
        }
    })

    return (<ThemeProvider theme={theme}>
            <AppBar position={"absolute"} className={classes.appBar}
                    style={backgroundColor ? {backgroundColor} : undefined}
            >
                <Toolbar className={classes.toolbar}>
                    <Monogram logo={logo}/>

                    <RightHandNavigation menuItems={menuItems} onDrawerOpen={handleMobileDrawerOpen}
                                         onDrawerClose={handleMobileDrawerClose}/>
                </Toolbar>

            </AppBar>

            <NavigationDrawer
                menuItems={menuItems}
                anchor="right"
                open={isMobileDrawerOpen}
                selectedItem={selectedTab}
                onClose={handleMobileDrawerClose}
            />
        </ThemeProvider>
    );
}


NavBar.defaultProps = {
    position: "fixed",
    useDarkPalette: true,
    backgroundColor: undefined
};

export default withStyles(styles)(NavBar);
