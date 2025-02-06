import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoTransitionProps {
  isVisible: boolean;
  children: React.ReactNode;
  onExitComplete?: () => void;
}

export const VideoTransition: React.FC<VideoTransitionProps> = ({
  isVisible,
  children,
  onExitComplete
}) => {
  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};