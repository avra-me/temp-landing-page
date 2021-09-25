import React from "react";

import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import {AnimatePresence, LazyMotion, m, Variants} from "framer-motion";
import CircleMenuButton from "./elements/CircleMenuButton";

const isSSR = typeof window === "undefined";

const animations: Variants = {
  start: {
    x: 40,
    y: 15,
    opacity: 0,
    position: "absolute",
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    position: "unset",
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 50
    }
  },
  hide: {x: "-40px", y: "10px", opacity: 0, position: "absolute"}
};

const LightMode = () => <m.animate
  initial={isSSR ? "visible" : "start"}
  animate={"visible"}
  variants={animations}
  exit={"hide"}
  style={{lineHeight: 0}}
>
  <WbSunnyIcon/>
</m.animate>;

const DarkMode = () => {
  return <m.animate
    initial={isSSR ? "visible" : "start"}
    animate={"visible"}
    variants={animations}
    exit={"hide"}
    style={{lineHeight: 0}}
  >
    <NightsStayIcon/>
  </m.animate>;
};


function ChangeThemeButton() {

  return <CircleMenuButton>
    <LazyMotion features={() => import('../utils/lazyMotion').then(e => e.default)}>
      <AnimatePresence>
        {<LightMode key={"light"}/>}
        {<DarkMode key={"dark"}/>}
      </AnimatePresence>
    </LazyMotion>
  </CircleMenuButton>;
}

ChangeThemeButton.order = 100;
ChangeThemeButton.key = "ChangeTheme";

ChangeThemeButton.propTypes = {};

export default (ChangeThemeButton);
