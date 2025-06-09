// Item Schema (Pseudocode/Comments)
// This file defines the structure for an Item in the game.
// Use this as a reference for implementing the actual model (e.g., with Mongoose, Sequelize, or plain JS classes).

/* eslint-disable no-unused-vars */
/**
 * Item Model
 *
 * Fields:
 * - id: Unique identifier (string or ObjectId)
 * - name: Item name (string)
 * - type: Item type/category (string, e.g., 'attack', 'defense', 'hide-and-seek')
 * - description: (Optional) Description of the item (string)
 * - effect: Object describing the item's effect (see below)
 * - usage: (Optional) How/when the item can be used (string, e.g., 'active', 'passive', 'once-per-level')
 * - cooldown: (Optional) Turns before item can be used again (number)
 * - image: (Optional) Image URL or path (string)
 * - rarity: (Optional) Rarity level (string)
 * - owner: (Optional) Character id or reference
 *
 * Example Effect Object:
 * {
 *   type: 'heal',
 *   value: 20 // heals 20 HP
 * }
 * or
 * {
 *   type: 'shield',
 *   value: 10, // blocks 10 damage
 *   duration: 2 // lasts 2 turns
 * }
 *
 * Slot Logic:
 * - Each player can equip up to 2 items in their item slots.
 * - Items can be of any type, but you may restrict to one per type if desired.
 */

// Pseudocode for Item schema definition
const Item = {
  id: 'string',
  name: 'Health Potion',
  type: 'attack', // 'attack', 'defense', 'hide-and-seek'
  description: 'Restores 20 HP.',
  effect: { type: 'heal', value: 20 },
  usage: 'active', // 'active', 'passive', 'once-per-level'
  cooldown: 0,
  image: '',
  rarity: 'common',
  owner: null,
};

// Export or use as a reference for your actual model implementation 