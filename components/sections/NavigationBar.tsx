import type {AppState} from "../../store";
import type {MenuItem, NavigationState} from "../../store/types/navigation";
import type {INavBarProps} from "../navigation/NavBar";
import React, {FC} from "react";
import {connect, ConnectedProps} from "react-redux";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("../navigation/NavBar"))

const connector = connect((state: AppState) => {
  return {
    ...state.navigation,
    logo: state.site.logo,
    isValid: !!state.navigation
  }
})

type ReduxProps = ConnectedProps<typeof connector>

interface INavigationBarProps extends ReduxProps,
  Omit<INavBarProps, keyof ReduxProps> {
  menuButtons?: MenuItem[],
}

type InternalProps = INavigationBarProps & NavigationState

const NavigationBar: FC<InternalProps & ConnectedProps<typeof connector>> = (
  {
    menuButtons = [],
    isValid,
    disabled,
    menuItems,
    ...props
  }) => {

  if (!isValid || disabled) {
    return null
  }

  return (
    <div>
      <NavBar menuItems={[...menuItems, ...menuButtons]} {...props}/>
    </div>
  );
}


NavigationBar.defaultProps = {
  menuButtons: []
};

export default connector(NavigationBar as FC<INavigationBarProps>);
