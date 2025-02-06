import React from 'react';
import { Card } from '../types/villains';
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import { useGame } from "../contexts/GameContext";

interface CardGridProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  isCurrentPlayerGrid?: boolean;
}

export const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick, isCurrentPlayerGrid = true }) => {
  const { t } = useTranslation();
  const { showCardsDetails, showCardsTitle } = useGame();
  
  // Trier les cartes par catégorie
  const sortedCards = [...cards].sort((a, b) => a.category.localeCompare(b.category));
  
  // Grouper les cartes par catégorie
  const cardsByCategory = sortedCards.reduce((acc, card) => {
    const category = card.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(card);
    return acc;
  }, {} as Record<string, Card[]>);

  return (
    <div className="space-y-6">
      {Object.entries(cardsByCategory).map(([category, categoryCards]) => (
        <div key={category} className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryCards.map((card) => {
                const isDisabled = (
                    !card.clips[t('currentLanguage')]?.length ||
                    (!isCurrentPlayerGrid && !['condition'].includes(card.category))
                );
                return (
                    <button
                        key={card.id}
                        onClick={() => !isDisabled && onCardClick(card)}
                        disabled={isDisabled}
                        className="relative group w-fit justify-self-center self-center"
                    >
                        <div
                            className={clsx(
                                'w-40 overflow-hidden rounded-lg border-2 border-gray-400',
                                !showCardsTitle && 'h-28',                        // Limite à une hauteur fixe pour masquer le titre et les détails
                                showCardsTitle && !showCardsDetails && 'h-36',     // Limite à une hauteur fixe pour masquer les détails
                                isDisabled || 'transition-transform group-hover:scale-105'
                            )}
                        >
                            <img
                                src={card.imagePath[t('currentLanguage')]}
                                alt={card.id}
                                className='w-40'
                            />
                        </div>
                        {isDisabled && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg cursor-not-allowed"/>
                        )}
                    </button>
                )
            })}
          </div>
        </div>
          ))}
    </div>
  );
};