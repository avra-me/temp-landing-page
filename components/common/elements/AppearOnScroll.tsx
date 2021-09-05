import {IntersectionOptions, useInView} from "react-intersection-observer";
import React, {FC, Fragment, useEffect, useState} from "react";
import {motion, Variant, Variants} from "framer-motion";


interface IAppearOnScrollProps {
  offScreenProperties?: Variant,
  onScreenProperties?: Variant,
  duration?: number,
  delay?: number,
  animationDisabled?: boolean,
  animationDisabledState?: "popIn" | "hidden",
  repeat?: boolean,
  viewportRef?: Element

  [additionalProps: string]: unknown
}

const defaultProps: IAppearOnScrollProps = {
  delay: 0,
  duration: .5,
  offScreenProperties: {opacity: 0, y: "30%", display: "none"},
  onScreenProperties: {opacity: 1, y: 0, display: "initial"}
};

const AppearOnScroll: FC<IAppearOnScrollProps> = (
  {
    children,
    viewportRef,
    offScreenProperties,
    onScreenProperties,
    animationDisabled,
    animationDisabledState,
    delay,
    duration,
    repeat,
    ...rest
  }) => {

  const viewListenerOptions: IntersectionOptions = {
    rootMargin: "-10px 0px",
    triggerOnce: repeat
  };


  if (viewportRef) {
    viewListenerOptions.root = viewportRef;
  }

  const [ref, inView] = useInView(viewListenerOptions);

  const [visible, setIsVisible] = useState(inView);

  useEffect(() => {
    if (repeat) {
      setIsVisible(inView);
    } else {
      if (inView) {
        setIsVisible(true);
      }
    }
  }, [inView, repeat]);

  const animations = {
    hidden: offScreenProperties,
    popIn: onScreenProperties,
  };

  const animationState = (animationDisabled && animationDisabledState) || (visible ? "popIn" : "hidden");

  return <Fragment>
    <span ref={ref}/>
      <motion.div
        initial={false}
        animate={animationState}
        variants={animations as Variants}
        transition={{duration, delay}}
        {...rest}
      >
        {children}
      </motion.div>
  </Fragment>;
};

AppearOnScroll.defaultProps = defaultProps

export default AppearOnScroll;
