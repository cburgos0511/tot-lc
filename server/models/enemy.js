// Enemy Schema (Pseudocode/Comments)
// This file defines the structure for an Enemy in the game, extending Character.
// Use this as a reference for implementing the actual model (e.g., with Mongoose, Sequelize, or plain JS classes).

/* eslint-disable no-unused-vars */
/**
 * Enemy Model (extends Character)
 *
 * Fields: (inherits all from Character)
 * - archetype: Enemy type/class (string, e.g., 'brute', 'sniper', 'boss', etc.)
 * - aiType: AI behavior type (string, e.g., 'aggressive', 'defensive', 'patrol', 'sneaky', etc.)
 * - lootTable: (Optional) Array of possible loot drops (item ids or objects)
 * - spawnLocation: (Optional) { x: number, y: number } (for initial placement)
 * - aggroRange: (Optional) How far the enemy can detect players (number)
 * - taunt: (Optional) Array of taunt phrases (strings)
 * - isBoss: (Optional) Boolean flag for boss enemies
 * - uniqueAbilities: (Optional) Array of special abilities (see Character)
 *
 * Example Enemy Object:
 * {
 *   ...Character fields,
 *   archetype: 'sniper',
 *   aiType: 'defensive',
 *   lootTable: ['weaponId1', 'itemId2'],
 *   spawnLocation: { x: 5, y: 10 },
 *   aggroRange: 8,
 *   taunt: ['You can't hide!', 'Take this!'],
 *   isBoss: false,
  *   uniqueAbilities: [/* ability objects 
 */


// Pseudocode for Enemy schema definition
const Enemy = {
  // All Character fields...
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
  archetype: 'sniper',
  inventory: [/* item objects */],
  isEnemy: true,
  level: 1,
  experience: 0,
  abilities: [/* ability objects */],
  position: { x: 0, y: 0 },
  team: 'enemy',
  // Enemy-specific fields
  aiType: 'aggressive',
  lootTable: [/* item ids or objects */],
  spawnLocation: { x: 0, y: 0 },
  aggroRange: 8,
  taunt: [/* taunt phrases */],
  isBoss: false,
  uniqueAbilities: [/* ability objects */],
};

// Export or use as a reference for your actual model implementation 