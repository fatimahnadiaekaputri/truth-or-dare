"use client";
import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { IspinWheelProps } from "./SpinWheel.interface";

const SpinWheel = forwardRef(({
    segments,
    // setPlayers,
    onFinished,
    wheelColor = 'mainGreen',
    textColor = 'white',
    needleColor = 'lightCream',
    buttonText = 'Spin',
    isOnlyOnce = false,
    size = 290,
    upDuration = 100,
    downDuration = 600,
    fontFamily = 'carter_one',
    // fontSize = 15,
    needleLocation = 'center',
    // showTextOnSpin = true,
    // needleText,
    setNeedleText,
    // isStarted,
    setIsStarted,
}: IspinWheelProps, ref) => {

    const nameArray = segments.map((segment) => segment.name).filter(Boolean);
    // const colorArray = segments.map((segment) => segment.color).filter(Boolean);
    const [isFinished, setFinished] = useState<boolean>(false);
    
    let currentSegment = '';
    let timerHandle: any = 0;
    const timerDelay = segments.length;
    let angleCurrent = 0;
    let angleDelta = 0;
    let canvasContext: any = null;
    let maxSpeed = Math.PI / segments.length;
    const upTime = segments.length * upDuration;
    const downTime = segments.length * downDuration;
    let spinStart = 0;
    let frames = 0;
    const centerX = (size);
    const centerY = (size);

    const wheelInit = () => {
      initCanvas();
      wheelDraw();
    }

    useEffect(() => {
      wheelInit();
      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 0);
    }, [segments]);

   

    const initCanvas = () => {
      let canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;

      if(!canvas) {
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', `${size * 2}`);
        canvas.setAttribute('height', `${size * 2}`);
        canvas.setAttribute('id', 'canvas');
        document?.getElementById('wheel')?.appendChild(canvas);
      }
      
      canvasContext = canvas.getContext('2d');
      canvas.style.borderRadius = '50%';
      canvas?.addEventListener('click', spin, false);
    }

    const drawSegment = (key: number, lastAngle: number, angle: number) => {
      const ctx = canvasContext;
      const value = nameArray[key];
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, size, lastAngle, angle, false);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = segments[key].color;
      ctx.fill();
      ctx.stroke();
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((lastAngle + angle) / 2);
      ctx.fillStyle = textColor;
      ctx.font = 'bold 1em' + fontFamily;
      ctx.fillText(value.substring(0, 21), size / 2 + 20, 0);
      ctx.restore();
    };

    const drawWheel = () => {
      const ctx = canvasContext;
      let lastAngle = angleCurrent;
      const len = nameArray.length;
      const PI2 = Math.PI * 2;
      ctx.lineWidth = 1;
      ctx.strokeStyle = wheelColor;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.font = '1em' + fontFamily;
      for(let i = 1; i <= len; i++) {
        const angle = PI2 * (i / len) + angleCurrent;
        drawSegment(i-1, lastAngle, angle);
        lastAngle = angle;
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, PI2, false);
      ctx.closePath();
      ctx.fillStyle = wheelColor;
      ctx.lineWidth = 2;
      ctx.strokeStyle = textColor;
      ctx.fill();
      ctx.font = 'bold 1em' + fontFamily;
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.fillText(buttonText, centerX, centerY + 3);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, size, 0, PI2, false);
      ctx.closePath();

      ctx.lineWidth = 4;
      ctx.strokeStyle = wheelColor;
      ctx.stroke();

    }

    const drawNeedle = () => {
      const ctx = canvasContext;
      ctx.lineWidth = 1;
      ctx.strokeStyle = needleColor;
      ctx.fillStyle = needleColor;
      ctx.beginPath();

      if(needleLocation === 'top') {
        ctx.moveTo(centerX + 20, centerY / 15);
        ctx.lineTo(centerX - 20, centerY / 15);
        ctx.lineTo(centerX, centerY - (centerY / 1.35));
      } else {
        ctx.moveTo(centerX + 20, centerY - 30);
        ctx.lineTo(centerX - 20, centerY - 30);
        ctx.lineTo(centerX, centerY - (centerY / 2.5));
      }
      
      ctx.closePath();
      ctx.fill();
      const change = angleCurrent + Math.PI / 2;
      let i = nameArray.length - Math.floor((change / (Math.PI * 2)) * nameArray.length) - 1;
      if (i < 0) i = i + nameArray.length;
      else if(i >= nameArray.length) i = i - nameArray.length;
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = wheelColor;
      ctx.font = 'bold 1.5em' + fontFamily;
      currentSegment = nameArray[i];
      setNeedleText(nameArray[i]);
    }

    // Gunakan useImperativeHandle untuk mengekspor fungsi spin
    useImperativeHandle(ref, () => ({
      spin,
    }));

    const spin = () => {
      setIsStarted(true);
      if(timerHandle === 0) {
        spinStart = new Date().getTime();
        maxSpeed = Math.PI / nameArray.length;
        frames = 0;
        timerHandle = setInterval(onTimerTick, timerDelay * 5);
      }
    };

    const onTimerTick = () => {
      frames++;
      wheelDraw();
      const duration = (new Date().getTime() - spinStart);
      let progress = 0;
      let finished = false;

      if(duration < upTime) {
        progress = duration / upTime;
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
      } else {
        progress = duration / downTime;
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
        if(progress >= 1) finished = true;
      }

      angleCurrent += angleDelta;
      while(angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
      if(finished) {
        setFinished(true);
        onFinished(currentSegment);
        clearInterval(timerHandle);
        timerHandle = 0;
        angleDelta = 0;
      }
    }

    const wheelDraw = () => {
      clear();
      drawWheel();
      drawNeedle();
    }

    const clear = () => {
      const ctx = canvasContext;
      ctx.clearRect(0, 0, size, size);
    };

    return (
      <div id='wheel'>
        <canvas 
            id='canvas'
            width={size * 2}
            height={size * 2}
            style={{
              pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto', 
            }}>
        </canvas>
      </div>
    )
});

// Set the display name for the component
SpinWheel.displayName = 'SpinWheel';

export default SpinWheel;
