import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../LanguageSelector';
import { Switch } from '../Switch';
import { useGame } from '../../contexts/GameContext';

interface SettingsPanelProps {
  isOpen: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen }) => {
  const { t } = useTranslation();
  const { showBoard, setShowBoard, scrollClips, setScrollClips, showCardsDetails, setShowCardsDetails, showCardsTitle, setShowCardsTitle } = useGame();

  // Gestion du changement pour showCardsTitle
  const handleShowCardsTitleChange = (checked: boolean) => {
    setShowCardsTitle(checked); // Met à jour la valeur de showCardsTitle

    if (checked) {
      // Si showCardsTitle est coché, on dégrise showCardsDetails mais on le laisse décoché
      setShowCardsDetails(false);
    } else {
      // Si showCardsTitle est décoché, on grise et désactive showCardsDetails
      setShowCardsDetails(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="space-y-4">
                  <div className="flex items-center justify-between">
                      <span>{t('settings.language')}</span>
                      <LanguageSelector/>
                  </div>
                  <div className="flex items-center justify-between">
                      <span>{t('settings.showBoard')}</span>
                      <Switch checked={showBoard} onChange={setShowBoard}/>
                  </div>
                  <div className="flex items-center justify-between">
                      <span>{t('settings.scrollClips')}</span>
                      <Switch checked={scrollClips} onChange={setScrollClips}/>
                  </div>
                  <div className="flex items-center justify-between">
                      <span>{t('settings.showCardsTitle')}</span>
                      <Switch checked={showCardsTitle} onChange={handleShowCardsTitleChange}/>
                  </div>
                  <div className="flex items-center justify-between">
                      <span>{t('settings.showCardsDetails')}</span>
                      <Switch
                          checked={showCardsDetails}
                          onChange={setShowCardsDetails}
                          disabled={!showCardsTitle} // Gray-out si showCardsTitle est décoché
                      />
                  </div>
              </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};