import {Box, Villain, Place, Card } from '../types/villains';

export async function loadBoxes(): Promise<Box[]> {
  try {
    const baseGameResponse = await fetch('/boxes/base-game/box.json');
    if (!baseGameResponse.ok) {
      console.error('Could not load base game box');
      return [];
    }
    const baseGame = await baseGameResponse.json();
    console.log('Loaded base game:', baseGame);
    return [baseGame];
  } catch (error) {
    console.error('Error loading boxes:', error);
    return [];
  }
}

export async function loadVillain(boxId: string, villainId: string): Promise<Villain | null> {
  try {
    const villainPath = `/boxes/${boxId}/villains/${villainId}`;
    const response = await fetch(`${villainPath}/villain.json`);
    if (!response.ok) {
      console.error(`JSON not found for ${villainId} at ${villainPath}`);
      return null;
    }

    const villain = await response.json();

    const addVillainPath = (arrayToReduce: Record<string, string[]>): Record<string, string[]> => {
        return Object.keys(arrayToReduce).reduce((newElems, lang) => ({
        ...newElems,
        [lang]: arrayToReduce[lang].map((clip: string) => {
          return `${villainPath}/${clip}`;
        }),
      }), {})
    }

    // Mettre à jour les chemins pour les ressources
    villain.avatarPath = `${villainPath}/avatar.png`;

    // Mettre à jour les chemins pour les intro/outro
    villain.introPath = Object.keys(villain.introPath).reduce((newIntroPath, lang) => {
      return {
        ...newIntroPath,
        [lang]: `${villainPath}/${villain.introPath[lang]}`,
      };
    }, {});
    villain.outroPath = Object.keys(villain.outroPath).reduce((newOutroPath, lang) => {
      return {
        ...newOutroPath,
        [lang]: `${villainPath}/${villain.outroPath[lang]}`,
      };
    }, {});

    // Mettre à jour les chemins pour les places
    villain.places = villain.places.map((place: Place) => ({
      ...place,
      clips: addVillainPath(place.clips),
      imagePath: `${villainPath}/places/${place.id}/place.png`
    }));

    // Mettre à jour les chemins pour les cartes
    villain.villainCards = villain.villainCards.map((card: Card) => ({
      ...card,
      clips: addVillainPath(card.clips),
      imagePath: Object.keys(villain.name).reduce((paths, lang) => ({
        ...paths,
        [lang]: `${villainPath}/villain-cards/${card.id}/${lang}/card.png`,
      }), {}),
    }));
    
    villain.fateCards = villain.fateCards.map((card: Card) => ({
      ...card,
      clips: addVillainPath(card.clips),
      imagePath: Object.keys(villain.name).reduce((paths, lang) => ({
        ...paths,
        [lang]: `${villainPath}/fate-cards/${card.id}/${lang}/card.png`,
      }), {}),
    }));
    
    console.log(`Successfully loaded villain ${villainId}:`, villain);
    return villain;
  } catch (error) {
    console.error(`Error loading villain ${villainId}:`, error);
    return null;
  }
}