import React, { createContext, useContext, useState, useCallback } from 'react';
import { Villain } from '../types/villains';

interface GameContextType {
  players: { villain: Villain }[];
  currentPlayerIndex: number;
  showBoard: boolean;
  showCardsDetails: boolean;
  showCardsTitle: boolean;
  scrollClips: boolean;
  addPlayer: (villain: Villain) => void;
  removePlayer: (villain: Villain) => void;
  nextPlayer: () => void;
  endGame: () => void;
  gameStarted: boolean;
  startGame: () => void;
  setShowBoard: (show: boolean) => void;
  setShowCardsDetails: (show: boolean) => void;
  setShowCardsTitle: (show: boolean) => void;
  setScrollClips: (use: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<{ villain: Villain }[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showBoard, setShowBoard] = useState(true);
  const [scrollClips, setScrollClips] = useState(false);
  const [showCardsTitle, setShowCardsTitle] = useState(true);
  const [showCardsDetails, setShowCardsDetails] = useState(false);

  const addPlayer = useCallback((villain: Villain) => {
    setPlayers(prev => [...prev, { villain }]);
  }, []);

  const removePlayer = useCallback((villain: Villain) => {
    setPlayers(prev => prev.filter(player => player.villain.id !== villain.id));
  }, []);

  const nextPlayer = useCallback(() => {
    setCurrentPlayerIndex(prev => (prev + 1) % players.length);
  }, [players.length]);

  const startGame = useCallback(() => {
    if (players.length > 0) {
      setGameStarted(true);
      setCurrentPlayerIndex(0);
    }
  }, [players.length]);

  const endGame = useCallback(() => {
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setGameStarted(false);
  }, []);

  return (
    <GameContext.Provider value={{
      players,
      currentPlayerIndex,
      showBoard,
      showCardsDetails,
      showCardsTitle,
      scrollClips,
      addPlayer,
      removePlayer,
      nextPlayer,
      endGame,
      gameStarted,
      startGame,
      setShowBoard,
      setShowCardsDetails,
      setShowCardsTitle,
      setScrollClips
    }}>
      {children}
    </GameContext.Provider>
  );
};