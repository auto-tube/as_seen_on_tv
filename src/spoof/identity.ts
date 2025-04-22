import identities from '../data/identities.json';

export function getRandomIdentity() {
  const idx = Math.floor(Math.random() * identities.length);
  return identities[idx];
}
