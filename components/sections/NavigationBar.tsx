import React, {FunctionComponent} from "react";
import {withStyles} from '@material-ui/core/styles';
import NavBar, {INavBarProps} from "../navigation/NavBar";
import {StyleRules, Theme} from "@material-ui/core";
import {sortBy} from "lodash-es";
import {connect} from "react-redux";
import {AppState} from "../../store";
import {MenuItem, NavigationState} from "../../store/types/navigation";

const styles = (theme: Theme): StyleRules => ({
    appBar: {
        boxShadow: "none",
        backgroundColor: theme.palette.secondary.main
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


interface INavigationBarProps extends Omit<INavBarProps, keyof NavigationState> {
    menuButtons?: MenuItem[],
}

type InternalProps = INavigationBarProps & NavigationState

const mapStateToProps = (state: AppState, props: InternalProps) => {
    return {
        ...props,
        ...state.navigation,
        logo: state.site.logo,
    }
}

const NavigationBar: FunctionComponent<InternalProps> = ({menuButtons=[], menuItems, ...props}) => {
    menuItems = sortBy(menuItems, 'order')

    return (
        <div>
            <NavBar menuItems={[...menuItems, ...menuButtons]} {...props}/>
        </div>
    );
}


NavigationBar.defaultProps = {
    menuButtons: []
};

export default withStyles(styles)(connect(mapStateToProps)(NavigationBar)) as FunctionComponent<INavigationBarProps>;
