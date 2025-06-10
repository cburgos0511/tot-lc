// Layout Model
// Defines the structure for a clothing/cloak item in the game

/**
 * Clothing (Cloak) Schema:
 * - id: string (UUID)
 * - name: string
 * - defense: integer (adds to character defense)
 * - attack: integer (adds to character attack)
 * - additiveMove: integer (adds to character speed)
 * - invisibility: { duration: integer, cooldown: integer } | null
 * - upgradePath: array of { level: integer, defense: integer, attack: integer, additiveMove: integer, invisibility: object|null }
 */

export const clothing = [
  // Example cloak
  {
    id: 'cloak-uuid-1',
    name: 'Shadow Cloak',
    defense: 5,
    attack: 0,
    additiveMove: 2,
    invisibility: { duration: 2, cooldown: 3 },
    upgradePath: [
      { level: 2, defense: 6, attack: 0, additiveMove: 2, invisibility: { duration: 2, cooldown: 2 } },
      { level: 3, defense: 7, attack: 1, additiveMove: 3, invisibility: { duration: 3, cooldown: 2 } },
      { level: 4, defense: 8, attack: 2, additiveMove: 3, invisibility: { duration: 3, cooldown: 1 } },
      { level: 5, defense: 10, attack: 3, additiveMove: 4, invisibility: { duration: 4, cooldown: 1 } }
    ]
  }
  // Add more clothing items as needed
]; 