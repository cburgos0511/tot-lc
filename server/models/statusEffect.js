// StatusEffect Schema (Pseudocode/Comments)
// This file defines the structure for a Status Effect in the game.
// Use this as a reference for implementing the actual model (e.g., with Mongoose, Sequelize, or plain JS classes).

/* eslint-disable no-unused-vars */
/**
 * StatusEffect Model
 *
 * Fields:
 * - id: Unique identifier (string or ObjectId)
 * - type: Status effect type (string, e.g., 'burning', 'bleeding', 'stunned', 'frozen', 'poisoned', etc.)
 * - duration: Number of turns the effect lasts (number)
 * - potency: Strength of the effect (number, e.g., damage per turn)
 * - source: (Optional) Who or what caused the effect (string or id)
 * - appliedAt: (Optional) Turn or timestamp when applied (number or date)
 * - stackable: (Optional) Can this effect stack? (boolean)
 * - maxStacks: (Optional) Maximum number of stacks (number)
 * - description: (Optional) Description of the effect (string)
 * - visual: (Optional) Visual indicator or animation (string)
 *
 * Example Status Effect Object:
 * {
 *   type: 'burning',
 *   duration: 2,
 *   potency: 5,
 *   source: 'weaponId',
 *   stackable: true,
 *   maxStacks: 3,
 *   description: 'Takes 5 damage per turn from burning.'
 * }
 */

// Pseudocode for StatusEffect schema definition
const StatusEffect = {
  id: 'string',
  type: 'burning',
  duration: 2,
  potency: 5,
  source: null,
  appliedAt: null,
  stackable: false,
  maxStacks: 1,
  description: '',
  visual: '',
};

// Export or use as a reference for your actual model implementation 