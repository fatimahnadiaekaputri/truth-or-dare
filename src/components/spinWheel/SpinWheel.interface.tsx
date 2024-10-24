import React from "react";
import { IDataPlayers } from "../player/player.interface";

export interface IspinWheelProps {
    segments: IDataPlayers[];
    setPlayers: React.Dispatch<React.SetStateAction<IDataPlayers[]>>;
    onFinished: (result: string) => void;
    wheelColor?: string;
    textColor?: string;
    needleColor?: string;
    buttonText?: string;
    isOnlyOnce?: boolean;
    size?: number;
    upDuration?: number;
    downDuration?: number;
    fontFamily?: string;
    fontSize?: number;
    needleLocation?: 'center' | 'top';
    showTextOnSpin?: boolean;
}