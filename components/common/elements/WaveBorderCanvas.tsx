import React, {FunctionComponent, useCallback, useEffect, useRef} from "react";
import {alpha, createStyles, WithStyles, withStyles} from '@material-ui/core/styles';

const styles = () => createStyles({
  canvas: {
    width: '100%',
    height: '100%'
  }
});

interface IWaveBorder extends WithStyles<typeof styles> {
  background: string;
  flip?: boolean;
  pause?: boolean;
  reverse?: boolean;
}

const drawWave = (ctx: CanvasRenderingContext2D, step: number, width: number, height: number, amplitude: number, frequency: number, points: number, background: string) => {
  ctx.save()
  step *= frequency
  const waveWidth = 2 * (width / points);
  ctx.translate(-(step % waveWidth), -(amplitude * height) / 2)
  ctx.fillStyle = background;
  ctx.beginPath();
  const baseLine = height
  ctx.moveTo(0, baseLine);

  const getYPos = (): number => (height * amplitude) * Math.sin(frequency * 20)
  ctx.lineTo(0, 0);
  let i = 0;
  let startX = 0, midX = 0, endX = width * (i + 1) / points;

  for (; endX < waveWidth + width; i++) {
    startX = width * i / points;
    endX = width * (i + 1) / points;
    midX = startX + (endX - startX) / 2;

    const multi = i % 2 === 0 ? 1 : -1
    ctx.quadraticCurveTo(midX, multi * getYPos(), endX, 0);
  }
  ctx.lineTo(endX, baseLine);
  ctx.closePath();
  ctx.fill()
  ctx.restore()
}

/**
 *  https://codepen.io/csspoints/pen/WNeOEqd
 */
const WaveBorder: FunctionComponent<IWaveBorder> = ({classes, background, flip, reverse, pause}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrame = useRef<number>(NaN)
  const isMouseOver = useRef(false)

  const drawFrame = useCallback((i, offset = 0, points = 2) => {
    const step = i / 60;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d', {
        alpha: true,
        desynchronized: true
      });

      if (!ctx) {
        return;
      }
      let {width, height} = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.setTransform(reverse ? -1 : 1, 0, 0, flip ? 1 : -1, reverse ? width : 0, flip ? height : 0);
      drawWave(ctx, step, width, height, .4, 1, points, alpha(background, 1))
      drawWave(ctx, step, width, height, .6, 1.3, points + 1, alpha(background, .7))
      drawWave(ctx, step, width, height, .7, 1.5, points + 1, alpha(background, .5))
      drawWave(ctx, step, width, height, 1, 2, points, alpha(background, .2))
      ctx.restore();
    }
    if (isMouseOver.current) {
      animationFrame.current = window.requestAnimationFrame(ni => drawFrame(ni - offset, (ni - i)))
    } else {
      animationFrame.current = window.requestAnimationFrame(ni => drawFrame(ni - offset, offset))
    }
  }, [background, flip, reverse]);


  useEffect(() => {
    if (!pause) {
      animationFrame.current = window.requestAnimationFrame(drawFrame);
    }
    return () => window.cancelAnimationFrame(animationFrame.current);
  }, [drawFrame, pause])

  return <canvas onMouseEnter={() => isMouseOver.current = true} onMouseLeave={() => isMouseOver.current = false}
                 className={classes.canvas} ref={canvasRef}/>;
}

export default withStyles(styles)(WaveBorder);
