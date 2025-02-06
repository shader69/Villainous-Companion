import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { VillainGrid } from '../components/VillainGrid';
import { SettingsPanel } from '../components/settings/SettingsPanel';
import { useGame } from '../contexts/GameContext';
import { loadBoxes, loadVillain } from '../utils/fileSystem';
import { Box, Villain } from '../types/villains';

export const VillainSelection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { startGame, players } = useGame();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [villains, setVillains] = useState<Record<string, Villain>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedVillains, setSelectedVillains] = useState<string[]>([]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        const loadedBoxes = await loadBoxes();
        if (loadedBoxes.length === 0) {
          setError(t('errors.noBoxes'));
          return;
        }

        const villainsMap: Record<string, Villain> = {};
        for (const box of loadedBoxes) {
          for (const villainId of box.villains) {
            const villain = await loadVillain(box.id, villainId);
            if (villain) {
              villainsMap[villainId] = villain;
            }
          }
        }

        setBoxes(loadedBoxes);
        setVillains(villainsMap);
      } catch (err) {
        setError(t('errors.loadingError') + err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [t]);

  const handleVillainSelect = (villainId: string) => {
      setSelectedVillains((prevSelected) => {
          // Si le villain est déjà dans la liste, on le supprime
          if (prevSelected.includes(villainId)) {
              return prevSelected.filter((id) => id !== villainId);
          }
          // Sinon, on l'ajoute
          return [...prevSelected, villainId];
      });
  };

  const handleStartGame = () => {
    if (players.length > 0) {
      startGame();
      navigate('/game');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">{t('loading.boxes')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <img
            src="/logo_villainous.png"
            alt="Disney Villainous"
            className="mx-auto h-40 mb-8"
          />

          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="px-6 py-3 bg-main border-main text-white rounded-lg hover:bg-main transition-colors mb-4"
          >
            {t('settings.toggle')}
          </button>

          <SettingsPanel isOpen={isSettingsOpen} />
        </motion.div>

        <VillainGrid
          boxes={boxes}
          villains={villains}
          onVillainSelect={handleVillainSelect}
          selectedVillains={selectedVillains}
        />

        {players.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-8 text-center"
          >
            <button
              onClick={handleStartGame}
              className="px-8 py-4 bg-main border-main text-white text-lg rounded-lg hover:bg-main transition-colors shadow-lg"
            >
              {t('startGame')}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};