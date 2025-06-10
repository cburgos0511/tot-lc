// Weapon Model
// Defines the structure for a weapon in the game

/**
 * Weapon Types: 'melee', 'short-range', 'mid-range', 'long-range', 'special'
 * Example attributes: name, type, range, damage, accuracy, specialAbility, image, description
 *
 * New fields:
 * - piercing: number (how many enemies projectile can pass through)
 * - splashRadius: number (area of effect radius, in tiles)
 * - headshotChance: number (probability of double damage, 0-1)
 * - burn: { duration: number } | null (burn effect duration in turns)
 * - blind: { duration: number } | null (blind effect duration in turns)
 * - specials: array of { type: string, ...params } (for extensibility)
 * - upgradePath: array of { level: integer, damage: integer, accuracy: number, special: object, etc. }
 * - weight: number (calculated based on type and upgrades)
 *
 * All special mechanics should be represented as explicit fields or in the specials array.
 *
 * Example extensibility: Add new upgrade paths and weight logic per weapon type.
 */

export const weaponTypes = ['melee', 'short-range', 'mid-range', 'long-range', 'special'];

export const weapons = [
  // Lightsaber (Melee)
  {
    name: 'Lightsaber',
    type: 'melee',
    range: 1,
    damage: 25,
    accuracy: 0.98,
    piercing: 2,
    splashRadius: null,
    headshotChance: 0.1,
    burn: null,
    blind: null,
    specials: [
      { type: 'deflect', chance: 0.3 },
      { type: 'energy', effect: 'ignores normal armor' }
    ],
    image: '/images/weapons/lightsaber.png',
    description: 'A Jedi or Sith weapon. Can deflect blaster bolts and cut through almost anything.',
    rarity: 'legendary',
    weight: 4,
    upgradePath: [
      { level: 2, damage: 28, accuracy: 0.99 },
      { level: 3, damage: 32, accuracy: 0.99 },
      { level: 4, damage: 36, accuracy: 1.0 },
      { level: 5, damage: 40, accuracy: 1.0 }
    ]
  },
  // Blaster (Short/Mid-range)
  {
    name: 'Blaster',
    type: 'mid-range',
    range: 6,
    damage: 15,
    accuracy: 0.85,
    piercing: 0,
    splashRadius: null,
    headshotChance: 0.2,
    burn: null,
    blind: null,
    specials: [
      { type: 'rapidFire', shots: 2 }
    ],
    image: '/images/weapons/blaster.png',
    description: 'Standard issue for many in the galaxy. Reliable and quick.',
    rarity: 'rare',
    weight: 3,
    upgradePath: [
      { level: 2, damage: 17, accuracy: 0.87 },
      { level: 3, damage: 19, accuracy: 0.89 },
      { level: 4, damage: 22, accuracy: 0.91 },
      { level: 5, damage: 25, accuracy: 0.93 }
    ]
  },
  // Vibro-ax (Long weapon)
  {
    name: 'Vibro-ax',
    type: 'long-range',
    range: 2,
    damage: 20,
    accuracy: 0.9,
    piercing: 1,
    splashRadius: null,
    headshotChance: 0.05,
    burn: null,
    blind: null,
    specials: [
      { type: 'heavy', effect: 'can stagger enemies' }
    ],
    image: '/images/weapons/vibro-ax.png',
    description: 'A heavy, long weapon favored by Gamorreans and other brutes.',
    rarity: 'epic',
    weight: 6,
    upgradePath: [
      { level: 2, damage: 23, accuracy: 0.91 },
      { level: 3, damage: 26, accuracy: 0.92 },
      { level: 4, damage: 30, accuracy: 0.93 },
      { level: 5, damage: 34, accuracy: 0.94 }
    ]
  }
]; 