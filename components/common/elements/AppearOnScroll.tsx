import React, {FC, Fragment, useEffect, useRef, useState} from "react";
import {LazyMotion, m, Variant, Variants} from "framer-motion";


interface IAppearOnScrollProps {
  offScreenProperties?: Variant,
  onScreenProperties?: Variant,
  duration?: number,
  delay?: number,
  animationDisabled?: boolean,
  animationDisabledState?: "popIn" | "hidden",
  repeat?: boolean,

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
    offScreenProperties,
    onScreenProperties,
    animationDisabled,
    animationDisabledState,
    delay,
    duration,
    repeat,
    ...rest
  }) => {


  const [visible, setIsVisible] = useState(false);


  const viewportRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const viewListenerOptions = {
      rootMargin: "-10px 0px",
      triggerOnce: repeat
    };
    const observer = new IntersectionObserver((e) => setIsVisible(visible || (e[0].intersectionRatio > 0)), viewListenerOptions);
    // @ts-ignore
    if (viewportRef.current) {
      observer.observe(viewportRef.current)
    }
    return () => observer.disconnect();
  }, [visible, repeat]);

  const animations = {
    hidden: offScreenProperties,
    popIn: onScreenProperties,
  };

  const animationState = (animationDisabled && animationDisabledState) || (visible ? "popIn" : "hidden");

  return <Fragment>
    <span ref={viewportRef}/>
    <LazyMotion features={() => import('../../utils/lazyMotion').then(e => e.default)}>
      <m.div
        initial={false}
        animate={animationState}
        variants={animations as Variants}
        transition={{duration, delay}}
        {...rest}
      >
        {children}
      </m.div>
    </LazyMotion>
  </Fragment>;
};

AppearOnScroll.defaultProps = defaultProps

export default AppearOnScroll;
