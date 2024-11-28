"use client";
import React, { useState } from "react";
import { usePlayerContext } from "@/components/player/PlayerContext";
import SpinWheel from "@/components/spinWheel/SpinWheel";
import { IspinWheelProps } from "@/components/spinWheel/SpinWheel.interface";
import QuestionDisplay from "@/components/question/QuestionDisplay";

const SpinPage: React.FC = () => {
    const { players, setPlayers } = usePlayerContext();
    const [needleText, setNeedleText] = useState<string>("");
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [showTextOnSpin, setShowTextOnSpin] = useState<boolean>(true);
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null); // Menyimpan id pemain terpilih

    const handleSpinFinish = (result: string) => {
        const selectedPlayer = players.find(player => player.name === result);
        if (selectedPlayer) {
            setSelectedPlayerId(selectedPlayer.id); // Simpan id pemain terpilih
            setNeedleText(result); // Tampilkan nama pemain di needle
            setIsStarted(true);
        }
        console.log(`Spun to: ${result}`);
    };

    const handleNext = () => {
      if (selectedPlayerId !== null) {
          setPlayers(prevPlayers =>
              prevPlayers.map(player =>
                  player.id === selectedPlayerId ? { ...player, score: player.score + 1 } : player
              )
          );
  
          // Logging skor pemain setelah ditambahkan 1
          const selectedPlayer = players.find(player => player.id === selectedPlayerId);
          if (selectedPlayer) {
              console.log(`Player ${selectedPlayer.name}'s new score: ${selectedPlayer.score + 1}`);
          }
      }
      resetState();
  };
  
  const handlePass = () => {
      if (selectedPlayerId !== null) {
          setPlayers(prevPlayers =>
              prevPlayers.map(player =>
                  player.id === selectedPlayerId ? { ...player, score: player.score - 1 } : player
              )
          );
  
          // Logging skor pemain setelah dikurangi 1
          const selectedPlayer = players.find(player => player.id === selectedPlayerId);
          if (selectedPlayer) {
              console.log(`Player ${selectedPlayer.name}'s new score: ${selectedPlayer.score - 1}`);
          }
      }
      resetState();
  };
  

    const resetState = () => {
        setNeedleText("");
        setIsStarted(false);
        setSelectedPlayerId(null);
        setShowTextOnSpin(false); // Menyembunyikan tombol setelah pertanyaan dijawab
    };

    const spinWheelProps: IspinWheelProps = {
        segments: players, // Ambil nama pemain untuk ditampilkan di roda
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
        showTextOnSpin: showTextOnSpin,
        needleText: needleText,
        setNeedleText: setNeedleText,
        isStarted: isStarted,
        setIsStarted: setIsStarted
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen justify-center items-center">
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <SpinWheel {...spinWheelProps} />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-5">
                {isStarted && (
                    <>
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5em', fontFamily: 'carter_one' }}>
                            {needleText}
                        </div>
                        <QuestionDisplay
                          selectedPlayerId={selectedPlayerId}
                          onNext={handleNext}
                          onPass={handlePass}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default SpinPage;
