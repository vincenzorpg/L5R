/**
 * SORTS_DATA - Point d'entrée principal réagrégé
 * L5R 4e Édition (Livre de Base complet & Suppléments)
 */

import { SORTS_UNIVERSELS } from './sorts/sorts-universels.js';
import { SORTS_AIR } from './sorts/sorts-air.js';
import { SORTS_TERRE } from './sorts/sorts-terre.js';
import { SORTS_FEU } from './sorts/sorts-feu.js';
import { SORTS_EAU } from './sorts/sorts-eau.js';
import { SORTS_VIDE } from './sorts/sorts-vide.js';
import { SORTS_KIHO } from './sorts/sorts-kiho.js';
import { SORTS_MAHO } from './sorts/sorts-maho.js';

export const SORTS_DATA = [
  ...SORTS_UNIVERSELS,
  ...SORTS_AIR,
  ...SORTS_TERRE,
  ...SORTS_FEU,
  ...SORTS_EAU,
  ...SORTS_VIDE,
  ...SORTS_KIHO,
  ...SORTS_MAHO
];

// Indexation rapide par ID pour la recherche O(1)
export const SORTS_BY_ID = Object.fromEntries(
  SORTS_DATA.map(sort => [sort.id, sort])
);

// Rétrocompatibilité navigateur direct sans bundler
if (typeof window !== "undefined") {
  window.SORTS_DATA = SORTS_DATA;
  window.SORTS_BY_ID = SORTS_BY_ID;
}
