// Character Model
// Defines the structure for a character in the game

/**
 * Character Schema:
 * - id: string (UUID)
 * - name: string
 * - skills: array of { name: string, description: string, effect: object }
 * - speed: integer (number of squares the character can move)
 * - defense: integer (reduces incoming damage)
 * - special: { name: string, description: string, effect: object }
 * - clothing: array of string (UUIDs referencing clothing items)
 * - weapons: array of string (UUIDs referencing weapons, up to 2 or 3 for special cases)
 * - health: integer
 * - type: 'good' | 'bad'
 * - level: integer (1-5)
 * - experience: integer (XP needed for next level)
 * - upgradePath: array of { level: integer, speed: integer, defense: integer, health: integer, skills: array, special: object }
 */

export const characters = [
  // Example character
  {
    id: 'uuid-1',
    name: 'Luke Skywalker',
    skills: [
      { name: 'Force Push', description: 'Pushes enemies back 2 tiles.', effect: { pushDistance: 2 } },
      { name: 'Lightsaber Mastery', description: 'Bonus damage with lightsabers.', effect: { weaponType: 'lightsaber', bonusDamage: 10 } }
    ],
    speed: 5,
    defense: 8,
    special: { name: 'Jedi Reflexes', description: 'Dodge one attack per turn.', effect: { dodge: 1 } },
    clothing: ['cloak-uuid-1'],
    weapons: ['weapon-uuid-lightsaber', 'weapon-uuid-blaster'],
    health: 100,
    type: 'good',
    level: 1,
    experience: 0,
    upgradePath: [
      { level: 2, speed: 6, defense: 9, health: 110, skills: [], special: {} },
      { level: 3, speed: 7, defense: 10, health: 120, skills: [], special: {} },
      { level: 4, speed: 8, defense: 12, health: 130, skills: [], special: {} },
      { level: 5, speed: 9, defense: 14, health: 150, skills: [], special: {} }
    ]
  }
  // Add more characters as needed
]; 