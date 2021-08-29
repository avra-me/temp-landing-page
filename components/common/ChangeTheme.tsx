import React, {useContext} from "react";

import WbSunnyIcon from "@material-ui/icons/WbSunny";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import {AnimatePresence, motion, Variants} from "framer-motion";
import CircleMenuButton from "./elements/CircleMenuButton";
import {ThemeTypeContext} from "./theming/ThemeContext";

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

const LightMode = () => <motion.animate
  initial={isSSR ? "visible" : "start"}
  animate={"visible"}
  variants={animations}
  exit={"hide"}
  style={{lineHeight: 0}}
>
  <WbSunnyIcon/>
</motion.animate>;

const DarkMode = () => {
  return <motion.animate
    initial={isSSR ? "visible" : "start"}
    animate={"visible"}
    variants={animations}
    exit={"hide"}
    style={{lineHeight: 0}}
  >
    <NightsStayIcon/>
  </motion.animate>;
};


function ChangeThemeButton() {
  const themeContext = useContext(ThemeTypeContext);

  const buttonContext = (themeContext.value === "light" ? "Enable" : "Disable") + " Dark Mode";


  return <CircleMenuButton aria-label={buttonContext} onClick={themeContext.onToggle}>
      <AnimatePresence>
        {themeContext.value === "light" ? <LightMode key={"light"}/> : <DarkMode key={"dark"}/>}
      </AnimatePresence>
    </CircleMenuButton>;
}

ChangeThemeButton.order = 100;
ChangeThemeButton.key = "ChangeTheme";

ChangeThemeButton.propTypes = {};

export default (ChangeThemeButton);
