import React, {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState
} from "react";
import createMuiTheme from "@material-ui/core/styles/createTheme";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import RightHandNavigation from "./RightHandNavigation";
import Monogram from "../common/elements/Monogram";
import {StyleRules, ThemeProvider} from "@material-ui/core/styles";
import NavigationDrawer from "./NavigationDrawer";
import {MenuItem} from "../../store/types/navigation";
import {Theme} from "@material-ui/core";
import {useRouter} from "next/router";
import {sortBy} from "lodash-es";
import Animate from "react-anime";

const styles = (theme: Theme): StyleRules => ({
  appBar: {
    boxShadow: "none",
    backgroundColor: theme.palette.primary.main,
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
  disabled?: boolean,
  staticIconEnabled?: boolean,
  logo?: string,
  useDarkPalette?: boolean
}

export type INavBarProps = Omit<INavBarPropsInternal, 'classes'>

const NavBar: FunctionComponent<INavBarPropsInternal> = (
  {
    menuItems,
    disabled,
    logo,
    classes,
    useDarkPalette,
  }) => {
  menuItems = sortBy(menuItems, 'order')

  const router = useRouter();

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [fixedNavVisible, setFixedNavVisible] = useState(false);
  const [popout, setIsPopout] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((e) => {
      const isFixedNavVisible = e[0].intersectionRatio <= 0
      setIsPopout(isFixedNavVisible)
      if (isFixedNavVisible) {
        setFixedNavVisible(true)
      }
    }, {});
    // @ts-ignore
    const ele = document.getElementById('hide-navbar')
    if (ele) {
      observer.observe(ele)
    }
    return () => observer.disconnect();
  }, [router.pathname]);
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
  const makeSurrogate = (props: PropsWithChildren<any>): ForwardRefRenderFunction<any> => {
    const SurrogateAnimationComponent: ForwardRefRenderFunction<any> = (forwardedProps, ref) => <div
      ref={ref} {...forwardedProps} {...props}
    />
    return SurrogateAnimationComponent
  }
  const navigation = (style: Record<string, unknown> = {}) =>
    <AppBar position={"absolute"} className={classes.appBar}
            style={style}
    >
      <Toolbar className={classes.toolbar}>
        <Monogram logo={logo}/>

        <RightHandNavigation
          menuItems={menuItems}
          onDrawerOpen={handleMobileDrawerOpen}
          onDrawerClose={handleMobileDrawerClose}
          currentRoute={router.pathname}
        />
      </Toolbar>

    </AppBar>

  const FixedAnimSur = forwardRef(makeSurrogate({
    style: {width: "100%", zIndex: 99, position: "fixed", opacity: popout ? 0 : 1}
  }))

  const absoluteNavigation = navigation({backgroundColor: "inherit"});
  const fixedNavigation = navigation();

  return <ThemeProvider theme={theme}>
    {absoluteNavigation}
    {fixedNavVisible && <Animate
        key={`Fixed-${popout}`}
        easing={popout ? "easeInSine" : "easeOutSine"}
        autoplay={true}
        translateY={popout ? ["-5em", 0] : [0, "-5em"]}
        opacity={popout ? [0, 1] : [1, 0]}
        delay={0}
        duration={300}
        complete={() => setFixedNavVisible(popout)}
        component={FixedAnimSur}>
      {fixedNavigation}
    </Animate>}
    <NavigationDrawer
      menuItems={menuItems}
      anchor="right"
      open={isMobileDrawerOpen}
      selectedItem={""}
      onClose={handleMobileDrawerClose}
    />
  </ThemeProvider>

}

export default withStyles(styles)(NavBar);
