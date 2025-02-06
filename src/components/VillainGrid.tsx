import React from 'react';
import { Box, Villain } from '../types/villains';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useGame } from '../contexts/GameContext';

interface VillainGridProps {
  boxes: Box[];
  villains: Record<string, Villain>;
  onVillainSelect: (villainId: string) => void;
  selectedVillains: string[];
}

export const VillainGrid: React.FC<VillainGridProps> = ({
  boxes,
  villains
}) => {
  const { t } = useTranslation();
  const { players, addPlayer, removePlayer } = useGame();

  const isVillainSelected = (villainId: string) =>
    players.some(player => player.villain.id === villainId);

  const handleVillainClick = (villain: Villain) => {
    if (isVillainSelected(villain.id)) {
      removePlayer(villain);
    } else {
      addPlayer(villain);
    }
  };

  const getPlayerOrder = (villainId: string) => {
      const index = players.findIndex(player => player.villain.id === villainId);
      return index !== -1 ? index + 1 : 0;
  };

  return (
    <div className="space-y-12">
      {boxes.map((box) => (
        <div
            key={box.id}
            className="bg-white rounded-lg shadow-lg p-6"
            style={{ backgroundColor: box.color }}
        >
          <div className="mb-6">
            <img
              src={`/boxes/${box.id}/cover/${t('currentLanguage')}/title.png`}
              alt={box.name[t('currentLanguage')]}
              className="h-14 w-auto mx-auto"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {box.villains.map((villainId) => {
              const villain = villains[villainId];
              const order = getPlayerOrder(villainId);
              const isSelected = isVillainSelected(villainId);

              if (!villain) return null;

              const isDisabled = !villain.fateCards.length || !villain.villainCards.length;

              return (
                <div key={villainId} className="space-y-4">
                  <button
                    onClick={() => !isDisabled && handleVillainClick(villain)}
                    disabled={isDisabled}
                    className={clsx(
                      'relative group w-full',
                      { 'opacity-50 cursor-not-allowed': isDisabled }
                    )}
                  >
                    <div className="relative">
                      {order > 0 && (
                        <div
                          style={{ backgroundColor: villain.color }}
                          className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold z-10">
                          {order}
                        </div>
                      )}
                      <img
                        src={villain.avatarPath}
                        alt={villain.name[t('currentLanguage')]}
                        className={clsx(
                          'w-full h-48 object-cover rounded-lg transition-all',
                          isSelected ? 'opacity-50 grayscale' : 'hover:scale-105'
                        )}
                      />
                    </div>
                    <div className="mt-2 text-center text-sm font-medium" style={{ backgroundColor: "var(--color-border-main)" }}>
                      {villain.name[t('currentLanguage')]}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};