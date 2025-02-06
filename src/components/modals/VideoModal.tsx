import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';

interface VideoModalProps {
  clips: string[];
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ clips, onClose }) => {
  const { scrollClips } = useGame();
  const [currentClipIndex, setCurrentClipIndex] = useState(0);

  if (!clips.length) return null;

  const currentClip = clips[currentClipIndex];

  const handlePrevious = () => {
      setCurrentClipIndex((prev) => {
          if (prev === 0) {
              onClose();
              return prev;
          }
          return (prev - 1 + clips.length) % clips.length;
      });
  };

  const handleNext = () => {
      setCurrentClipIndex((prev) => {
          if (prev === clips.length - 1) {
              onClose();
              return prev;
          }
          return (prev + 1) % clips.length;
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors z-10"
        >
          ×
        </button>

        <div className="relative">
          <video
            src={currentClip}
            controls
            autoPlay
            className="w-full rounded-t-lg"
            onEnded={scrollClips ? handleNext : onClose}
          />

          {clips.length > 1 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
              {/* Placeholder ou bouton précédent */}
              {currentClipIndex > 0 ? (
                <button
                  onClick={handlePrevious}
                  className="w-10 h-10 bg-white bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75 transition-opacity pointer-events-auto"
                >
                  ←
                </button>
              ) : (
                <div className="w-10 h-10" />
              )}

              {/* Placeholder ou bouton suivant */}
              {currentClipIndex < clips.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="w-10 h-10 bg-white bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75 transition-opacity pointer-events-auto"
                >
                  →
                </button>
              ) : (
                <div className="w-10 h-10" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};