import React, {FC, forwardRef, ForwardRefRenderFunction, Fragment, useEffect, useRef, useState} from "react";
import Animate, {AnimeProps} from "react-anime";

interface IAppearOnScrollProps {
  offScreenProperties?: Partial<AnimeProps>,
  onScreenProperties?: Partial<AnimeProps>,
  duration?: number,
  delay?: number,
  animationDisabled?: boolean,
  animationDisabledState?: "hidden" | "visible",
  repeat?: boolean,
  component?: unknown

  [additionalProps: string]: unknown
}

const defaultProps = {
  delay: 0,
  duration: 1,
  offScreenProperties: {opacity: 0},
  onScreenProperties: {translateY: ["15em", "0em"], opacity: [0, 1]}
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
    component,
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

  if (!component) {
    const SurrogateComponent: ForwardRefRenderFunction<any> = (props, ref) => <div
      ref={ref} {...props} {...rest}/>
    component = forwardRef(SurrogateComponent);
  }


  return <Fragment>
    <span ref={viewportRef} style={{minWidth: "100%"}}/>
    <Animate
      key={variant}
      delay={delay}
      easing="easeOutElastic"
      duration={duration * 1000}
      autoplay={true}
      component={component}
      {...animations[variant]}
    >
      {children}
    </Animate>
  </Fragment>;
};

AppearOnScroll.defaultProps = defaultProps

export default AppearOnScroll as FC<IAppearOnScrollProps>;
