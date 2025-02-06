import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Card } from '../types/villains';
import { VideoTransition } from './transitions/VideoTransition';
import { PlayerTransition } from './transitions/PlayerTransition';
import { VillainBoard } from './VillainBoard';
import { useTranslation } from 'react-i18next';
import { CardGrid } from './CardGrid';
import { VideoModal } from './modals/VideoModal';
import { VictoryModal } from './modals/VictoryModal';
import { useNavigate } from 'react-router-dom';
import clsx from "clsx";

export const GameBoard: React.FC = () => {
  const { players, currentPlayerIndex, nextPlayer, endGame, showBoard } = useGame();
  const { t } = useTranslation();
  const [modalClips, setModalClips] = useState<string[]>([]);
  const [showPlayerTransition, setShowPlayerTransition] = useState(false);
  const [displayedPlayerIndex, setDisplayedPlayerIndex] = useState(currentPlayerIndex);
  const currentPlayer = players[currentPlayerIndex];
  const displayedPlayer = players[displayedPlayerIndex];
  const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  const navigate = useNavigate();
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  const orderedPlayers = [...players.slice(currentPlayerIndex), ...players.slice(0, currentPlayerIndex)];

  const handleCardClick = (card: Card) => {
    const currentLanguage = t('currentLanguage');
    const clips = card.clips[currentLanguage] || [];

    if (clips.length > 0) {
      setModalClips(clips);
    }
  };

  const handleCurrentPlayerAvatarClick = () => {
    const currentLanguage = t('currentLanguage');
    const introClip = currentPlayer.villain.introPath[currentLanguage];
    if (introClip) {
      setModalClips([introClip]);
    }
  };

  const handlePlayerAvatarClick = (index: number) => {
    setDisplayedPlayerIndex(index);
  };

  const handleNextPlayer = () => {
    setModalClips([]);
    setShowPlayerTransition(true);
  };

  const handleTransitionComplete = () => {
    setShowPlayerTransition(false);
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    setDisplayedPlayerIndex(nextIndex);
    nextPlayer();
  };

  const handleVictory = () => {
    setShowVictoryModal(true);
  };

  const handleVictoryClose = () => {
    setShowVictoryModal(false);
    endGame();
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col">

      {/* Main Header Area */}
      <div className="mb-4">
        <div className="max-w-6xl mx-auto flex gap-8">

          {/* Villain Info and Board */}
          <div className="flex-1">
            <div
                className="rounded-lg p-3"
                style={{backgroundColor: currentPlayer.villain.color}}
            >
                <div className="flex justify-between items-center gap-6">
                  <div className="flex gap-6">
                    <div className="flex justify-center">
                        <button
                            onClick={handleCurrentPlayerAvatarClick}
                            className="overflow-hidden hover:scale-105 transition-transform"
                        >
                            <img
                                src={currentPlayer.villain.avatarPath}
                                alt={currentPlayer.villain.name[t('currentLanguage')]}
                                className="w-40 h-44 object-cover rounded-lg"
                            />
                        </button>
                    </div>
                    {showBoard && (
                      <VillainBoard
                          villain={currentPlayer.villain}
                          setModalClips={setModalClips}
                          disabled={displayedPlayerIndex !== currentPlayerIndex}
                      />
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col justify-center gap-4">
                    {players.length > 1 && (
                        <button
                            onClick={handleNextPlayer}
                            disabled={displayedPlayerIndex !== currentPlayerIndex}
                            className={clsx(
                              'px-4 py-3 bg-blue-600 text-white rounded-lg transition-colors whitespace-nowrap',
                              displayedPlayerIndex === currentPlayerIndex ? 'hover:bg-blue-700' : 'disabled:opacity-50'
                            )}
                        >
                            {t('endTurn')}
                        </button>
                    )}
                    <button
                          onClick={handleVictory}
                          disabled={displayedPlayerIndex !== currentPlayerIndex}
                          className={clsx(
                            'px-4 py-3 bg-green-600 text-white rounded-lg transition-colors whitespace-nowrap',
                            displayedPlayerIndex === currentPlayerIndex ? 'hover:bg-green-700' : 'disabled:opacity-50'
                          )}
                    >
                        {t('victory.iWon')}
                    </button>
                </div>
              </div>
            </div>
          </div>

          {/* Players Avatar Bar */}
          {players.length > 1 && (
              <div className="bg-main p-4 rounded-lg flex justify-center items-center">
                  <div className="flex flex-col flex-wrap gap-4 max-h-[150px]">
                      {orderedPlayers.map((player, index) => {
                          const isSelected = displayedPlayerIndex === (currentPlayerIndex + index) % players.length;

                          return (
                              <button
                                  key={index}
                                  onClick={() => handlePlayerAvatarClick((currentPlayerIndex + index) % players.length)}
                                  className='relative transition-transform hover:scale-105'
                              >
                                  <img
                                      src={player.villain.avatarPath}
                                      alt={player.villain.name[t('currentLanguage')]}
                                      className={clsx(
                                        'w-16 h-16 rounded-lg object-cover',
                                        !isSelected && 'opacity-50'
                                      )}
                                  />
                                  {index > 0 && (
                                      <div
                                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                        style={{ backgroundColor: "var(--color-border-main)" }}
                                      >
                                          +{index}
                                      </div>
                                  )}
                              </button>
                          )
                      })}
                  </div>
              </div>
          )}

        </div>
      </div>

        {/* Main Content */}
        <div className="flex-1 flex">

            {/* Fate Cards (Left Side) */}
            <div
                className="w-1/2 p-4 overflow-y-auto rounded-l-lg"
                style={{backgroundColor: "#FBF1D1"}}
            >
                <CardGrid
                    cards={displayedPlayer.villain.fateCards}
                    onCardClick={handleCardClick}
                />
            </div>

            {/* Villain Cards (Right Side) */}
            <div
                className="w-1/2 p-4 overflow-y-auto rounded-r-lg"
                style={{backgroundColor: displayedPlayer.villain.color}}
            >
                <CardGrid
                    cards={displayedPlayer.villain.villainCards}
                    onCardClick={handleCardClick}
                    isCurrentPlayerGrid={displayedPlayerIndex === currentPlayerIndex}
                />
            </div>
        </div>

        <VideoTransition isVisible={!!modalClips.length} onExitComplete={() => setModalClips([])}>
            <VideoModal clips={modalClips} onClose={() => setModalClips([])}/>
        </VideoTransition>

        <PlayerTransition
            isVisible={showPlayerTransition}
            villain={players[nextPlayerIndex].villain}
            onComplete={handleTransitionComplete}
      />

      <VictoryModal
        villain={currentPlayer.villain}
        isOpen={showVictoryModal}
        onClose={handleVictoryClose}
      />
    </div>
  );
};