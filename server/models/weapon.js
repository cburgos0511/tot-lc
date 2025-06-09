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
  // Melee
  {
    name: 'Iron Sword',
    type: 'melee',
    range: 1,
    damage: 15,
    accuracy: 0.95,
    piercing: 0,
    splashRadius: null,
    headshotChance: 0,
    burn: null,
    blind: null,
    specials: [],
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
    piercing: 0,
    splashRadius: null,
    headshotChance: 0,
    burn: null,
    blind: null,
    specials: [
      { type: 'reach', value: 2 }
    ],
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
    piercing: 0,
    splashRadius: 2,
    headshotChance: 0,
    burn: { duration: 2 },
    blind: null,
    specials: [
      { type: 'splash', radius: 2 },
      { type: 'burn', duration: 2 }
    ],
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
    piercing: 0,
    splashRadius: 2,
    headshotChance: 0,
    burn: null,
    blind: { duration: 2 },
    specials: [
      { type: 'blind', duration: 2 },
      { type: 'splash', radius: 2 }
    ],
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
    piercing: 0,
    splashRadius: null,
    headshotChance: 0,
    burn: null,
    blind: null,
    specials: [],
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
    piercing: 1,
    splashRadius: null,
    headshotChance: 0.2,
    burn: null,
    blind: null,
    specials: [
      { type: 'piercing', value: 1 },
      { type: 'headshot', chance: 0.2 }
    ],
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
    piercing: 0,
    splashRadius: 2,
    headshotChance: 0,
    burn: null,
    blind: null,
    specials: [
      { type: 'splash', radius: 2 },
      { type: 'magicExplosion', radius: 2 }
    ],
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
    piercing: 0,
    splashRadius: 3,
    headshotChance: 0,
    burn: null,
    blind: null,
    specials: [
      { type: 'splash', radius: 3 }
    ],
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
    piercing: 2,
    splashRadius: null,
    headshotChance: 0.15,
    burn: null,
    blind: null,
    specials: [
      { type: 'piercing', value: 2 },
      { type: 'headshot', chance: 0.15 }
    ],
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
    piercing: 0,
    splashRadius: null,
    headshotChance: 0,
    burn: null,
    blind: null,
    specials: [
      { type: 'chainLightning', targets: 3 }
    ],
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
    piercing: 0,
    splashRadius: 2,
    headshotChance: 0,
    burn: null,
    blind: null,
    specials: [
      { type: 'pull', radius: 2 }
    ],
    image: null,
    description: 'Manipulates the battlefield with gravity.',
    rarity: 'epic'
  },
];

// Weapon Schema (Pseudocode/Comments)
// This file defines the structure for a Weapon in the game.
// Use this as a reference for implementing the actual model (e.g., with Mongoose, Sequelize, or plain JS classes).

/* eslint-disable no-unused-vars */
/**
 * Weapon Model
 *
 * Fields:
 * - id: Unique identifier (string or ObjectId)
 * - name: Weapon's name (string)
 * - type: Weapon type/category (string, e.g., 'melee', 'ranged', 'explosive')
 * - damage: Base damage (number)
 * - range: Number of squares weapon can reach (number)
 * - accuracy: Hit chance (0-1 float)
 * - headshotChance: Chance for headshot (0-1 float)
 * - specials: Array of special effect objects (see below)
 * - rarity: (Optional) Rarity level (string, e.g., 'common', 'rare')
 * - piercing: (Optional) Number of targets pierced (number)
 * - splashRadius: (Optional) Area of effect radius (number)
 * - burn: (Optional) Burn effect object (see status effects)
 * - bleed: (Optional) Bleed effect object
 * - blind: (Optional) Blind effect object
 * - ammo: (Optional) Ammo count or type (number or string)
 * - weight: (Optional) Weapon weight (number)
 * - description: (Optional) Weapon description (string)
 * - image: (Optional) Image URL or path (string)
 * - owner: (Optional) Character id or reference
 *
 * Example Special Effect Object:
 * {
 *   type: 'piercing',
 *   value: 2 // pierces 2 targets
 * }
 *
 * Example Burn Effect Object:
 * {
 *   duration: 2, // turns
 *   potency: 5 // damage per turn
 * }
 */

// Pseudocode for Weapon schema definition
const Weapon = {
  id: 'string',
  name: 'string',
  type: 'melee', // e.g., 'melee', 'ranged', 'explosive'
  damage: 10,
  range: 1,
  accuracy: 0.8,
  headshotChance: 0.1,
  specials: [/* special effect objects */],
  rarity: 'common',
  piercing: 0,
  splashRadius: 0,
  burn: null, // { duration, potency }
  bleed: null, // { duration, potency }
  blind: null, // { duration, potency }
  ammo: null,
  weight: 1,
  description: '',
  image: '',
  owner: null,
};

// Export or use as a reference for your actual model implementation 