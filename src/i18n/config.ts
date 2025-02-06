import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          currentLanguage: 'fr',
          selectVillain: 'Sélectionnez votre méchant',
          startGame: 'Commencer la partie',
          endTurn: 'Fin de tour',
          nextPlayerTurn: 'Au tour de {{villain}} !',
          closeVideo: 'Fermer',
          settings: {
            title: 'Paramètres',
            toggle: 'Paramètres du jeu',
            language: 'Langue',
            showBoard: 'Afficher le plateau',
            scrollClips: 'Défiler les clips automatiquement',
            showCardsTitle: 'Afficher le titre des cartes',
            showCardsDetails: 'Afficher le détail des cartes'
          },
          victory: {
            iWon: 'J\'ai gagné !',
            congratulations: 'Félicitations !',
            backToHome: 'Retour à l\'accueil'
          },
          loading: {
            boxes: 'Chargement des boîtes de jeu...',
            villains: 'Chargement des méchants...'
          },
          errors: {
            noBoxes: 'Aucune boîte de jeu trouvée.',
            noVillains: 'Aucun méchant trouvé.',
            loadingError: 'Erreur lors du chargement.'
          }
        }
      },
      en: {
        translation: {
          currentLanguage: 'en',
          selectVillain: 'Select your villain',
          startGame: 'Start Game',
          endTurn: 'End Turn',
          nextPlayerTurn: "{{villain}}'s turn!",
          closeVideo: 'Close',
          settings: {
            title: 'Settings',
            toggle: 'Game Settings',
            language: 'Language',
            showBoard: 'Show board',
            scrollClips: 'Scroll through clips automatically',
            showCardsTitle: 'Show cards title',
            showCardsDetails: 'Show cards details'
          },
          victory: {
            iWon: 'I won!',
            congratulations: 'Congratulations!',
            backToHome: 'Back to Home'
          },
          loading: {
            boxes: 'Loading game boxes...',
            villains: 'Loading villains...'
          },
          errors: {
            noBoxes: 'No game boxes found.',
            noVillains: 'No villains found.',
            loadingError: 'Error while loading.'
          }
        }
      }
    },
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;