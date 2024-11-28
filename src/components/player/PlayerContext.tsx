"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IDataPlayers } from './player.interface';

// Create the context
const PlayerContext = createContext<{
  players: IDataPlayers[];
  setPlayers: React.Dispatch<React.SetStateAction<IDataPlayers[]>>;
} | undefined>(undefined);

// Create a provider component
export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<IDataPlayers[]>([
    { id: 1, name: 'hecan', color: 'red', score: 0 },
    { id: 2, name: 'mark', color: 'blue', score: 0 },
  ]);

  return (
    <PlayerContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Create a hook for easy access to the context
export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};
