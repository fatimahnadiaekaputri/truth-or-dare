"use client";
import React, { useState } from "react";
import InputForm from "@/components/form/InputForm";
import SpinWheel from "@/components/spinWheel/SpinWheel";
import { IspinWheelProps } from "@/components/spinWheel/SpinWheel.interface";
import { IDataPlayers } from "@/components/player/player.interface";

// const segments: IDataPlayers[] = [
//   { id: 1, name: 'nadia', color: 'red', score: 0 },
//   { id: 2, name: 'mark', color: 'blue', score: 0 }
// ];

const Page2: React.FC = () => {

  const [players, setPlayers] = useState<IDataPlayers[]>([
    { id: 1, name: 'nadia', color: 'red', score: 0 },
    { id: 2, name: 'mark', color: 'blue', score: 0 }, 
  ]);

  const handleSpinFinish = (result: string) => {
    console.log(`Spun to: ${result}`);
  };

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
    showTextOnSpin: true
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
        <InputForm players={players} setPlayers={setPlayers} />
      </div>
    </div>
  );
};

export default Page2;
