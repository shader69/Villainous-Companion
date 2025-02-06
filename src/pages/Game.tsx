import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { GameBoard } from '../components/GameBoard';

export const Game: React.FC = () => {
  const navigate = useNavigate();
  const { gameStarted, players } = useGame();

  // Rediriger vers la sélection si le jeu n'a pas commencé
  React.useEffect(() => {
    if (!gameStarted || players.length === 0) {
      navigate('/');
    }
  }, [gameStarted, players, navigate]);

  if (!gameStarted || players.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <GameBoard />
    </div>
  );
};