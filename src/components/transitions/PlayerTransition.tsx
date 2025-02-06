import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Villain } from '../../types/villains';

interface PlayerTransitionProps {
  isVisible: boolean;
  villain: Villain;
  onComplete: () => void;
}

export const PlayerTransition: React.FC<PlayerTransitionProps> = ({
  isVisible,
  villain,
  onComplete
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: villain.color }}
            className="text-white p-8 rounded-lg shadow-2xl text-center"
          >
            <h2 className="text-3xl font-bold">
              {t('nextPlayerTurn', { villain: villain.name[t('currentLanguage')] })}
            </h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};