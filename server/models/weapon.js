// Weapon Model
// Defines the structure for a weapon in the game

/**
 * Weapon Types: 'melee', 'short-range', 'mid-range', 'long-range', 'special'
 * Example attributes: name, type, range, damage, accuracy, specialAbility, image, description
 */

export const weaponTypes = ['melee', 'short-range', 'mid-range', 'long-range', 'special'];

export const weapons = [
  // Melee
  {
    name: 'Iron Sword',
    type: 'melee',
    range: 1,
    damage: 15,
    accuracy: 0.95,
    specialAbility: null,
    image: '/images/weapons/iron-sword.png',
    description: 'A basic iron sword. Reliable and sturdy.',
    rarity: 'common'
  },


  {
    name: 'Spear',
    type: 'melee',
    range: 2,
    damage: 13,
    accuracy: 0.92,
    specialAbility: 'Reach (can attack from 2 tiles away)',
    image: '/images/weapons/spear.png',
    description: 'Long reach, moderate damage.',
    rarity: 'uncommon'
  },
  // Short-range

  {
    name: 'Molotov Cocktail',
    type: 'short-range',
    range: 2,
    damage: 14,
    accuracy: 0.7,
    specialAbility: 'Splash Damage (burns in a radius)',
    image: '/images/weapons/molotov.png',
    description: 'Explodes on impact, burning nearby tiles.',
    rarity: 'rare'
  },
  // Mid-range

  {
    name: 'Smoke Bomb',
    type: 'mid-range',
    range: 4,
    damage: 0,
    accuracy: 1.0,
    specialAbility: 'Blind (reduces enemy accuracy)',
    image: '/images/weapons/smoke_bomb.png',
    description: 'No damage, but blinds enemies in an area.',
    rarity: 'uncommon'
  },

  // Long-range
  {
    name: 'Longbow',
    type: 'long-range',
    range: 10,
    damage: 18,
    accuracy: 0.8,
    specialAbility: null,
    image: null,
    description: 'High damage at long distances.',
    rarity: 'rare'
  },
  {
    name: 'Storm Trooper Rifle',
    type: 'long-range',
    range: 12,
    damage: 22,
    accuracy: 0.75,
    specialAbility: 'Headshot (chance for double damage) and piercing (can hit through multiple enemies)',
    image: '/images/weapons/storm-trooper-rifle.png',
    description: 'Modern weapon, high damage, lower accuracy.',
    rarity: 'epic'
  },
  {
    name: 'Magic Staff',
    type: 'long-range',
    range: 9,
    damage: 15,
    accuracy: 0.9,
    specialAbility: 'Splash Damage (magic explosion)',
    image: null,
    description: 'Casts spells with area effect.',
    rarity: 'epic'
  },
  {
    name: 'Grenade Launcher',
    type: 'long-range',
    range: 8,
    damage: 20,
    accuracy: 0.7,
    specialAbility: 'Splash Damage (large radius)',
    image: null,
    description: 'Explosive rounds for maximum area damage.',
    rarity: 'epic'
  },
  {
    name: 'Sniper Rifle',
    type: 'long-range',
    range: 15,
    damage: 30,
    accuracy: 0.6,
    specialAbility: 'Pierce (can hit through multiple enemies)',
    image: '/images/weapons/sniper.png',
    description: 'Extreme range and damage, but low accuracy.',
    rarity: 'legendary'
  },
  // Special
  {
    name: 'Thunder Hammer',
    type: 'special',
    range: 1,
    damage: 28,
    accuracy: 0.85,
    specialAbility: 'Chain Lightning (hits multiple enemies in a line)',
    image: null,
    description: 'Unleashes lightning on impact.',
    rarity: 'epic'
  },

  {
    name: 'Gravity Gun',
    type: 'special',
    range: 6,
    damage: 10,
    accuracy: 0.9,
    specialAbility: 'Pull (draws enemies together in a radius)',
    image: null,
    description: 'Manipulates the battlefield with gravity.',
    rarity: 'epic'
  },

]; 