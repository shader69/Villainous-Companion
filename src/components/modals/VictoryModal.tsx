import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Villain } from '../../types/villains';
import { VideoModal } from './VideoModal';

interface VictoryModalProps {
  villain: Villain;
  isOpen: boolean;
  onClose: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({ villain, isOpen, onClose }) => {
  const { t } = useTranslation();
  const [showVideo, setShowVideo] = useState(false);

  // Récupérer le clip de démo du méchant
  const outroClip = villain.outroPath[t('currentLanguage')];

  // Lancer la vidéo à l'ouverture de la modale
  useEffect(() => {
    if (isOpen && outroClip) {
      setShowVideo(true);
    }
  }, [isOpen, outroClip]);

  const handleVideoClose = () => {
    setShowVideo(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{ backgroundColor: villain.color }}
              className="relative p-8 rounded-lg shadow-xl text-center max-w-lg w-full mx-4"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                {t('victory.congratulations')}
              </h2>
              <p className="text-2xl text-white mb-8">
                {villain.name[t('currentLanguage')]}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {t('victory.backToHome')}
              </button>
            </motion.div>
          </motion.div>

          {showVideo && outroClip && (
            <VideoModal
              clips={[outroClip]}
              onClose={handleVideoClose}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
};