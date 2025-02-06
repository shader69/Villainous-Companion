import React from 'react';
import { Villain, Place } from '../types/villains';
import {useTranslation} from "react-i18next";
import clsx from "clsx";

interface VillainBoardProps {
  villain: Villain;
  setModalClips: (clips: string[]) => void;
  disabled?: boolean;
}

export const VillainBoard: React.FC<VillainBoardProps> = ({ villain, setModalClips, disabled = false }) => {
  const { t } = useTranslation();

  const sortedPlaces = [...villain.places].sort((a, b) => a.order - b.order);

  const handlePlaceClick = (place: Place) => {
      const currentLanguage = t('currentLanguage');
      const clips = place.clips[currentLanguage] || [];

      if (clips.length > 0) {
        setModalClips(clips);
      }
  }

  return (
    <div className="grid grid-cols-4 gap-4 flex-1 items-center">
        {sortedPlaces.map((place) => (
            <div key={place.id} className="relative">
                <button
                    onClick={() => !disabled && handlePlaceClick(place)}
                    disabled={disabled}
                    className={clsx(
                      'overflow-hidden hover:scale-105 transition-transform',
                      { 'opacity-50 cursor-not-allowed': disabled }
                    )}
                >
                    <img
                        src={place.imagePath}
                        alt={place.id}
                        className="w-40 rounded-lg border-2 border-gray-400"
                    />
                </button>
            </div>
        ))}
    </div>
  );
};