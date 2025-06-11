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
 *
 * All special mechanics should be represented as explicit fields or in the specials array.
 */

export const weaponTypes = ['melee', 'short-range', 'mid-range', 'long-range', 'special'];
export const weapons = [
  
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
  
  {
    name: 'BowCaster',
    type: 'mid-range',
    range: 6,
    damage: 35,
    accuracy: 0.9,
    piercing: 1,
    splashRadius: 1,
    headshotChance: 0.1,
    burn: null,
    blind: null,
    specials: [
      { type: 'knockBack', effect: 'pushBack' }
    ],
    image: '/images/weapons/bowcaster.png',
    description: '',
    rarity: '',
    weight: 6,
    upgradePath: [
      { level: 2, damage: 36, accuracy: 0.91 },
      { level: 3, damage: 38, accuracy: 0.92 },
      { level: 4, damage: 40, accuracy: 0.93 },
      { level: 5, damage: 44, accuracy: 0.94 }
    ]
  },
  {
    name: "Flash Grenade",
    type: "melee",
    range: 6,
    damage: null,
    accuracy: 0.9,
    piercing: null,
    splashRadius: null,
    headshotChance: null,
    burn: null,
    blind: 1,
    image: '/images/weapons/flashGrenade.png',
    description: 'Blinds Enemys temporarily',
    rarity: 'common',
    weight: 1,
    upgradePath: [
      { level: 2, damage: 1, accuracy: 0.91 },
      { level: 3, damage: 4, accuracy: 0.92 },
      { level: 4, damage: 5, accuracy: 0.93 },
      { level: 5, damage: 7, accuracy: 0.94 }
    ]
  },
  {
    name: "Sniper",
    type: "long-range",
    range: 10,
    damage: 75,
    accuracy: 0.8,
    piercing: 2,
    splashRadius: null,
    headshotChance: 0.2,
    burn: null,
    blind: null,
    specials: [
      { type: "headshot" , effect: "instant death"  }
    ],
    image: '/images/weapons/bowcaster.png',
    description: 'Long range gunto kill enemys from afar.',
    rarity: 'legendary',
    weight: 6,
    upgradePath: [
      { level: 2, damage: 77, accuracy: 0.8 },
      { level: 3, damage: 79, accuracy: 0.82 },
      { level: 4, damage: 81, accuracy: 0.83 },
      { level: 5, damage: 85, accuracy: 0.84 }
    ],
  }
];