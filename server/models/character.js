// Character Schema (Pseudocode/Comments)
// This file defines the structure for a Character in the game.
// Use this as a reference for implementing the actual model (e.g., with Mongoose, Sequelize, or plain JS classes).

/* eslint-disable no-unused-vars */
/**
 * Character Model
 *
 * Fields:
 * - id: Unique identifier (string or ObjectId)
 * - name: Character's name (string)
 * - health: Current health points (number)
 * - maxHealth: Maximum health points (number)
 * - move: Number of squares the character can move per turn (number)
 * - speed: (Optional) Used for initiative or turn order (number)
 * - baseDamage: Base damage multiplier or additive value (number)
 * - skills: Array of special skill objects (see below)
 * - weapons: Array of weapon references/objects (max 2, or more if allowed by skills)
 * - maxWeapons: Maximum number of weapons this character can equip (number, default 2)
 * - statusEffects: Array of current status effects (see status effect schema)
 * - archetype: (Optional) For enemies, defines their type/class (string)
 * - inventory: (Optional) Array of items/objects the character holds
 * - isEnemy: Boolean flag to distinguish player/enemy
 * - level: (Optional) Character level for progression (number)
 * - experience: (Optional) XP for leveling up (number)
 * - abilities: (Optional) Array of active/passive abilities (for future extensibility)
 * - position: { x: number, y: number } (for grid placement)
 * - team: (Optional) Team/faction identifier (string)
 *
 * Example Skill Object:
 * {
 *   name: 'Force Push',
 *   description: 'Pushes enemy back 2 squares',
 *   cooldown: 3, // turns
 *   effect: { type: 'push', value: 2 }
 * }
 *
 * Example Status Effect Object:
 * {
 *   type: 'burning',
 *   duration: 2, // turns
 *   potency: 5 // damage per turn
 * }
 *
 * Example Weapon Reference:
 *   weaponId: 'abc123' // or embedded weapon object
 */

// Pseudocode for Character schema definition
const Character = {
  id: 'string',
  name: 'string',
  health: 100,
  maxHealth: 100,
  move: 3,
  speed: 1,
  baseDamage: 10,
  skills: [/* skill objects */],
  weapons: [/* weapon references or objects */],
  maxWeapons: 2,
  statusEffects: [/* status effect objects */],
  archetype: 'jedi', // e.g., 'jedi', 'sith', 'trooper', etc.
  inventory: [/* item objects */],
  isEnemy: false,
  level: 1,
  experience: 0,
  abilities: [/* ability objects */],
  position: { x: 0, y: 0 },
  team: 'player',
};

// Export or use as a reference for your actual model implementation 