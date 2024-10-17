"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import SpinWheel from "@/components/SpinWheel";
import InputForm from "@/components/InputForm";

interface Player {
  id: number;
  name: string;
  color: string;
  score: string;
}

const initialPlayers: Player[] = [
  { id: 1, name: "Player 1", color: "#8b35bc", score: "" },
  { id: 2, name: "Player 2", color: "#b163da", score: "" },
  { id: 3, name: "", color: "", score: "" },
  { id: 4, name: "", color: "", score: "" },
  { id: 5, name: "", color: "", score: "" },
];

const Page2: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const spinWheelContainerRef = useRef<HTMLDivElement | null>(null);
  const inputFormContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (spinWheelContainerRef.current && inputFormContainerRef.current) {
      const root = ReactDOM.createRoot(spinWheelContainerRef.current);
      const secondRoot = ReactDOM.createRoot(inputFormContainerRef.current);

      root.render(
        <React.StrictMode>
          <SpinWheel players={players} />
        </React.StrictMode>
      );

      secondRoot.render(
        <React.StrictMode>
          <InputForm players={players} setPlayers={setPlayers} />
        </React.StrictMode>
      );

      return () => {
        root.unmount();
        secondRoot.unmount();
      };
    }
  }, [players]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center md:pt-0 pt-20">
        <div ref={spinWheelContainerRef}></div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center md:pt-0 pt-20">
        <div ref={inputFormContainerRef}></div>
      </div>
    </div>
  );
};

export default Page2;
