export interface Box {
  id: string;
  name: Record<string, string>;
  color: string;
  villains: string[];
}

export interface Villain {
  id: string;
  boxId: string;
  name: Record<string, string>;
  color: string;
  forcedCardsLanguage?: string; /** Langue à utiliser pour les images des cartes (ex: "en"). Si absent, une path par langue du name. */
  avatarPath: string;
  introPath: Record<string, string>;
  outroPath: Record<string, string>;
  places: Place[];
  villainCards: Card[];
  fateCards: Card[];
}

export interface Place {
  id: string;
  order: number;
  clips: Record<string, string[]>;
  imagePath: string;
}

export interface Card {
  id: string;
  category: string;
  imagePath: Record<string, string>;
  clips: Record<string, string[]>;
  defaultClip?: Record<string, string>;
}