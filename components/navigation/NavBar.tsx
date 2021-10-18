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
import {styled} from '@mui/material/styles';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import RightHandNavigation from "./RightHandNavigation";
import Monogram from "../common/elements/Monogram";
import NavigationDrawer from "./NavigationDrawer";
import {MenuItem} from "../../store/types/navigation";
import {useRouter} from "next/router";
import {sortBy} from "lodash-es";
import Animate from "react-anime";
import RootThemeProvider from "../common/theming/RootThemeProvider";

const PREFIX = 'NavBar';

const classes = {
  appBar: `${PREFIX}-appBar`,
  toolbar: `${PREFIX}-toolbar`,
  brandIcon: `${PREFIX}-brandIcon`,
  noDecoration: `${PREFIX}-noDecoration`
};

const StyledAppBar = styled(AppBar)((
  {
    theme
  }
) => ({
  [`& .${classes.toolbar}`]: {
    display: "flex",
    justifyContent: "space-between",
  },

  [`& .${classes.brandIcon}`]: {
    height: theme.typography.h4.fontSize,
  },

  [`& .${classes.noDecoration}`]: {
    textDecoration: "none !important",
  }
}));


export interface INavBarProps {
  menuItems: MenuItem[],
  disabled?: boolean,
  staticIconEnabled?: boolean,
  logo?: string,
}

const NavBar: FunctionComponent<INavBarProps> = (
  {
    menuItems,
    disabled,
    logo,
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

  const makeSurrogate = (props: PropsWithChildren<any>): ForwardRefRenderFunction<any> => {
    const SurrogateAnimationComponent: ForwardRefRenderFunction<any> = (forwardedProps, ref) => <div
      ref={ref} {...forwardedProps} {...props}
    />
    return SurrogateAnimationComponent
  }
  const navigation = (style: Record<string, unknown> = {}) =>
    <StyledAppBar
      sx={{
        boxShadow: "none",
        backgroundColor: 'primary.main',
        zIndex: 100,
        ...style
      }}
      elevation={0}
      position={"absolute"}
      className={classes.appBar}
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

    </StyledAppBar>

  const FixedAnimSur = forwardRef(makeSurrogate({
    style: {width: "100%", zIndex: 99, position: "fixed", opacity: popout ? 0 : 1}
  }))

  const absoluteNavigation = navigation({backgroundColor: "inherit"});
  const fixedNavigation = navigation();

  return (
    <RootThemeProvider forceDarkMode>
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
    </RootThemeProvider>
  );
}

export default NavBar;
