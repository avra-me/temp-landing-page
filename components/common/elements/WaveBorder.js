import React, {useState} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const styles = {
  uniqueId: {

  },
  flip: {
    transform: "scale(1,-1)",
    "& reverse": {
      transform: "scale(-1,-1)"
    }
  },
  reverse: {
    transform: "scale(-1,1)",
    "& flip": {
      transform: "scale(-1,-1)"
    }
  },
  waves: {
    position: "relative",
    width: "100%",
    marginBottom: -7
  },
  "@keyframes moveForever": {
    from: {transform: "translate3d(-90px, 0, 0)"},
    to: {transform: "translate3d(85px, 0, 0)"},
  },
  parallax: {
    "& > use": {
      animation: "$moveForever 4s cubic-bezier(0.62, 0.5, 0.38, 0.5) infinite",
    }
  },
};

/**
 *  https://codepen.io/csspoints/pen/WNeOEqd
 */
function WaveBorder(props) {

  const wave = (duration, delay, opacity, x = undefined) => ({
    duration,
    // delay: -(pause ? Math.random() * duration : delay),
    delay: -1 * delay,
    opacity,
    x
  });

  const [waveStates,] = useState({
    0: wave(3, -2, 0.7),
    3: wave(4, -3, 0.5),
    5: wave(6, -4, 0.3),
    6: wave(8, -5, 1, 50),
  });

  const [startTime,] = useState((new Date()).valueOf());


  const {
    className,
    classes,
    background,
    flip,
    pause,
    reverse,
    ...rest
  } = props;
  // eslint-disable-next-line react/prop-types
  const addWave = ({y, delay, duration, opacity = 1, x = 48, pause = false}) => {
    return <use
      key={y}
      href={`#${classes.uniqueId}`}
      x={x}
      y={y}
      className={clsx()}
      style={{
        opacity: opacity,
        animationPlayState: pause ? "paused" : "running",
        animationDelay: `${delay}s`,
        animationDuration: `${duration * 2}s`
      }}
    />;
  };

  const svgClasses = [classes.waves, className];
  if (flip) {
    svgClasses.push(classes.flip);
  }
  if (reverse) {
    svgClasses.push(classes.reverse);
  }

  return (
    <div {...rest}>
      <svg className={clsx(svgClasses)} style={{fill: background}} xmlns="http://www.w3.org/2000/svg"
           viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="geometricPrecision">
        <defs>
          <path id={classes.uniqueId} d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                shapeRendering="geometricPrecision"/>
        </defs>
        <g className={classes.parallax}>
          {Object.keys(waveStates).map((y) => {
            const {duration, delay, opacity, x} = waveStates[y];
            const now = (new Date()).valueOf();
            let timeDelay = -(delay - ((startTime - now) / 1000));
            if (pause) {
              timeDelay = delay;
            }
            return addWave({y, duration, opacity, x, delay: ~~timeDelay, pause});
          })}
        </g>
      </svg>

    </div>
  );
}

WaveBorder.propTypes = {
  className: PropTypes.string,
  background: PropTypes.string,
  flip: PropTypes.bool,
  reverse: PropTypes.bool,
  pause: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WaveBorder);
