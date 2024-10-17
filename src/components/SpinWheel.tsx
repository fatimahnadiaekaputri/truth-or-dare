import React, { useEffect, useRef, useState } from "react";
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { registerables } from "chart.js";

Chart.register(...registerables, ChartDataLabels);

interface Player {
  id: number;
  name: string;
  color: string;
  score: string;
}

interface SpinWheelProps {
  players: Player[];
}

const SpinWheel: React.FC<SpinWheelProps> = ({ players }) => {
  const [finalValue, setFinalValue] = useState<string>('Click On The Spin Button To Start');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spinBtnRef = useRef<HTMLButtonElement | null>(null);
  const myChartRef = useRef<Chart<"pie", number[], string> | null>(null);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  const calculateRotationValues = (numPlayers: number) => {
    const degreePerSegment = 360 / numPlayers;
    const rotationValues = [];
    for (let i = 0; i < numPlayers; i++) {
      rotationValues.push({
        minDegree: i * degreePerSegment,
        maxDegree: (i + 1) * degreePerSegment - 1,
        value: i + 1,
      });
    }
    return rotationValues;
  };

  const rotationValues = calculateRotationValues(players.filter(player => player.name).length);

  const valueGenerator = (angleValue: number) => {
    for (let i of rotationValues) {
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        setFinalValue(`Value: ${players[i.value - 1].name}`);
        spinBtnRef.current!.disabled = false;
        setSpinResult(i.value);
        break;
      }
    }
  };

  const handleSpinClick = () => {
    if (spinBtnRef.current) {
      spinBtnRef.current.disabled = true;
    }
    setFinalValue('Good Luck!');

    const randomDegree = Math.floor(Math.random() * 356) + 360 * 5; // 5 full rotations plus random degree
    canvasRef.current!.style.setProperty('--rotate-to', `${randomDegree}deg`);
    canvasRef.current!.classList.remove('animate-custom-spin'); // Reset animation
    void canvasRef.current!.offsetWidth; // Trigger reflow
    canvasRef.current!.classList.add('animate-custom-spin'); // Start animation

    setTimeout(() => {
      const finalDegree = randomDegree % 360;
      valueGenerator(finalDegree);
    }, 3000); // 3s is the duration of the animation
  };

  useEffect(() => {
    if (!canvasRef.current || !spinBtnRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const initializeChart = () => {
      myChartRef.current = new Chart(ctx!, {
        type: 'pie',
        data: {
          labels: players.filter(player => player.name).map(player => player.name),
          datasets: [{
            data: players.filter(player => player.name).map(() => 1),
            backgroundColor: players.filter(player => player.name).map(player => player.color || '#b163da'), // Use player color or default
          }],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false },
            datalabels: {
              color: '#ffffff',
              font: { size: 24 },
              formatter: (_value: any, context: { chart: { data: { labels: { [x: string]: any; }; }; }; dataIndex: string | number; }) => context.chart.data.labels?.[context.dataIndex] ?? '',
            },
          },
        },
      });
    };

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }
    initializeChart();
  }, [players]);

  return (
    <div className="wrapper">
      <div className="container">
        <canvas ref={canvasRef} id="wheel" className="transition-transform"></canvas>
        <button ref={spinBtnRef} id="spin-btn" onClick={handleSpinClick}>Spin</button>
      </div>
      <div id="final-value">
        <p>{finalValue}</p>
        {spinResult !== null && <p>Spin Result: {players[spinResult - 1].name}</p>}
      </div>
    </div>
  );
};

export default SpinWheel;
