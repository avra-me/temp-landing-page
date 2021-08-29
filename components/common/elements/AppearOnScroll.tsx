import {IntersectionOptions, useInView} from "react-intersection-observer";
import React, {FunctionComponent, useEffect, useState} from "react";
import {motion} from "framer-motion";


const AppearOnScrollDefaultProps = {
    delay: 0,
    duration: .5,
    offScreenProperties: {opacity: 0, y: "30%"},
    onScreenProperties: {opacity: 1, y: 0}
};

interface IAppearOnScrollProps {
    offScreenProperties?: Record<string, unknown>,
    onScreenProperties?: Record<string, unknown>,
    duration?: number,
    delay?: number,
    animationDisabled?: boolean,
    animationDisabledState?: "popIn" | "hidden",
    repeat?: boolean,
    viewportRef?: Element
    children: React.ReactElement;

    [additionalProps: string]: unknown
}

const AppearOnScroll: FunctionComponent<IAppearOnScrollProps> = (props) => {
    const {
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
    } = props as IAppearOnScrollProps & typeof AppearOnScrollDefaultProps;

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

    return <motion.div
        ref={ref}
        initial={false}
        animate={animationState}
        variants={animations}
        transition={{duration, delay}}
        {...rest}
    >
        {children}
    </motion.div>;
};

AppearOnScroll.defaultProps = AppearOnScrollDefaultProps

export default AppearOnScroll;
