"use client";
import React, { useState } from "react";
import InputForm from "@/components/form/InputForm";
import SpinWheel from "@/components/spinWheel/SpinWheel";
import { IspinWheelProps } from "@/components/spinWheel/SpinWheel.interface";
import { usePlayerContext } from "@/components/player/PlayerContext";


const FillName: React.FC = () => {

  const {players, setPlayers} = usePlayerContext();

  const handleSpinFinish = (result: string) => {
    console.log(`Spun to: ${result}`);
  };

  const [needleText, setNeedleText] = useState<string>("");
  const [isStarted, setIsStarted] =useState<boolean>(false);

  const spinWheelProps: IspinWheelProps = {
    segments: players,
    setPlayers,
    onFinished: handleSpinFinish,
    wheelColor: 'mainGreen',
    textColor: 'white',
    needleColor: 'lightCream',
    buttonText: 'Spin',
    isOnlyOnce: false,
    size: 290,
    upDuration: 100,
    downDuration: 600,
    fontFamily: 'carter_one',
    fontSize: 15,
    needleLocation: 'top',
    showTextOnSpin: true,
    needleText: needleText,
    setNeedleText: setNeedleText,
    isStarted: isStarted,
    setIsStarted: setIsStarted
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Spin Wheel Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center md:pt-0 pt-20">
        <SpinWheel {...spinWheelProps} />
      </div>

      {/* Input Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center md:pt-0 pt-20">
        {/* Menambahkan InputForm dan meneruskan state dan setter */}
        <InputForm  />
      </div>
    </div>
  );
};

export default FillName;
