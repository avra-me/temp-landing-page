import React, {FC, Fragment, useEffect, useRef, useState} from "react";
import {LazyMotion, m, TargetAndTransition} from "framer-motion";


interface IAppearOnScrollProps {
  offScreenProperties?: Partial<TargetAndTransition>,
  onScreenProperties?: Partial<TargetAndTransition>,
  duration?: number,
  delay?: number,
  animationDisabled?: boolean,
  animationDisabledState?: "hidden" | "visible",
  repeat?: boolean,

  [additionalProps: string]: unknown
}

const defaultProps = {
  delay: 0,
  duration: .5,
  offScreenProperties: {opacity: 0, y: "30%"},
  onScreenProperties: {opacity: 1, y: 0, display: "initial"}
} as const;

const AppearOnScroll: FC<IAppearOnScrollProps & typeof defaultProps> = (
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
  const animations = {
    hidden: offScreenProperties,
    visible: onScreenProperties
  } as const

  const [variant, setVariant] = useState<'hidden' | 'visible'>('visible');
  const viewportRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const viewListenerOptions = {
      rootMargin: "-10px 0px",
      triggerOnce: repeat
    };
    const observer = new IntersectionObserver((e) => setVariant(variant === "visible" ? variant : e[0].intersectionRatio > 0 ? "visible" : variant), viewListenerOptions);
    // @ts-ignore
    if (viewportRef.current) {
      observer.observe(viewportRef.current)
    }
    return () => observer.disconnect();
  }, [variant, repeat]);

  useEffect(() => {
    setVariant(animationDisabled ? animationDisabledState || 'visible' : 'hidden')
  }, [animationDisabled, animationDisabledState])


  return <Fragment>
    <span ref={viewportRef}/>
    <LazyMotion features={() => import('../../utils/lazyMotion').then(e => e.default)}>
      <m.div
        initial={true}
        animate={variant}
        variants={animations}
        transition={{duration, delay}}
        {...rest}
      >
        {children}
      </m.div>
    </LazyMotion>
  </Fragment>;
};

AppearOnScroll.defaultProps = defaultProps

export default AppearOnScroll as FC<IAppearOnScrollProps>;
