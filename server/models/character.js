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
 * - type: ["Jedi,", "Smuggler", "Wookie", "Droid", "Princess", "Jedi Master", "Mandolorian", "Bounty Hunter"];
 * - isGood: boolean
 * - level: integer (1-5)
 * - experience: integer (XP needed for next level)
 * - upgradePath: array of { level: integer, speed: integer, defense: integer, health: integer, skills: array, special: object }
 */
export const characterTypes = ["Jedi,", "Smuggler", "Wookie", "Droid", "Princess", "Jedi Master", "Mandolorian", "Bounty Hunter"];

export const characters = [

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
    health: 100,
    type: 'Jedi',
    isGood: true,
    level: 1,
    experience: 0,
    upgradePath: [
      { level: 2, speed: 6, defense: 9, health: 110, skills: [], special: {} },
      { level: 3, speed: 7, defense: 10, health: 120, skills: [], special: {} },
      { level: 4, speed: 8, defense: 12, health: 130, skills: [], special: {} },
      { level: 5, speed: 9, defense: 14, health: 150, skills: [], special: {} }
    ]
  },
  {
    id: "uuid-2",
    name: "Han Solo",
    skills: [
      { name: "Head Shot", description: "Hits enemy wtih headshot", effects: { headShotChance: 100 } },
      { name: "Pistol Mastery", description: "Bonus damage with pistols.", effect: { weaponType: "pistol", bonusDamage: 10 } }
    ],
    speed: 5,
    defense: 8,
    special: { name: "Light Speed", description: "Go to light speed move double the amount in on move.", effect: { dodge: 1 } },
    health: 100,
    type: "Smuggler",
    isGood: true,
    level: 1,
    experience: 0,
    upgradePath: [
      { level: 2, speed: 6, defense: 9, health: 110, skills: [], special: {} },
      { level: 3, speed: 7, defense: 10, health: 120, skills: [], special: {} },
      { level: 4, speed: 8, defense: 12, health: 130, skills: [], special: {} },
      { level: 5, speed: 9, defense: 14, health: 150, skills: [], special: {} }
    ]
  },
  {
    id: "uuid-3",
    name: "Chewbaca",
    skills: [
      { name: 'Smash', description: 'Smash an enemy', effect: { smashRadius: 15 } },
      { name: 'bowCaster mastery', description: 'Crossbow boiunces back enemy 2 tiles', effect: { weaponType: 'bowcaster', pushDistance: 2 } }
    ],
    speed: 5,
    defense: 8,
    special: { name: 'smash', description: 'You smash an enemie dead.', effect: { bonusDamage: 100 } },
    health: 100,
    type: 'Wookie',
    isGood: true,
    level: 1,
    experience: 0,
    upgradePath: [
      { level: 2, speed: 6, defense: 9, health: 110, skills: [], special: {} },
      { level: 3, speed: 7, defense: 10, health: 120, skills: [], special: {} },
      { level: 4, speed: 8, defense: 12, health: 130, skills: [], special: {} },
      { level: 5, speed: 9, defense: 14, health: 150, skills: [], special: {} }
    ]
  },
  {
    id: 'uuid-4',
    name: 'Princess Leia',
    skills: [
      { name: 'Rebel attack', description: 'All current enemies get raided from ally rebels.', effect: { /*add later*/ } },
    ],
    speed: 5,
    defense: 8,
    special: { name: 'Lola robot', description: 'Leias robot tazes enemies', effect: { bonusDamage: 25 } },
    health: 100,
    type: 'Princess',
    isGood: true,
    level: 1,
    experience: 0,
    upgradePath: [
      { level: 2, speed: 6, defense: 9, health: 110, skills: [], special: {} },
      { level: 3, speed: 7, defense: 10, health: 120, skills: [], special: {} },
      { level: 4, speed: 8, defense: 12, health: 130, skills: [], special: {} },
      { level: 5, speed: 9, defense: 14, health: 150, skills: [], special: {} }
    ]
  }
]; 