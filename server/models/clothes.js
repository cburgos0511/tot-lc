export const clothingTypes = [
    'light-armor', 'medium-armor', 'heavy-armor', 'cloak', 'battle-garb'                  
  ];

  export const clothes = [ 
    {
        name: 'Jedi Robes',
        type: 'light armor',
        defense: 8,
        stealth: 0.1,
        agility: 0.2,
        resistance: {
          force: 0.4,
          blaster: 0.1
        },
        specials: [
          { type: 'meditate', effect: 'regenerates 2 health per turn', chance: 0.25 }
        ],
        image: '/images/clothing/jedi_robes.png',
        description: 'Traditional robes worn by Jedi, enhancing agility and Force resistance.',
        rarity: 'rare',
        weight: 2,
        upgradePath: [
          { level: 2, defense: 9, agility: 0.25 },
          { level: 3, defense: 10, agility: 0.3 }
        ]
      },
      {
        name: 'Mandalorian Armor',
        type: 'heavy armor',
        defense: 20,
        stealth: -0.1,
        resistance: {
          blaster: -0.5,
          explosion: -0.3
        },
        specials: [
          { type: 'jetpack', effect: 'evade one attack every 4 turns', chance: 0.2 }
        ],
        image: '/images/clothing/mandalorian_armor.png',
        description: 'Durable beskar armor with built-in gadgets and high protection.',
        rarity: 'epic',
        weight: 5,
        upgradePath: [
          { level: 2, defense: 22 },
          { level: 3, defense: 25 },
          { level: 4, defense: 27 },
          { level: 5, defense: 29 }
        ]
      },
      {
        name: 'Sith Cloak',
        type: 'cloak',
        defense: 5,
        stealth: 0.3,
        resistance: {
          force: 0.6
        },
        specials: [
          { type: 'intimidate', effect: 'lowers enemy accuracy by 10%', chance: 0.35 }
        ],
        image: '/images/clothing/sith_cloak.png',
        description: 'A dark cloak worn by Sith Lords, infused with the Dark Side.',
        rarity: 'legendary',
        weight: 1,
        upgradePath: [
          { level: 2, stealth: 0.35 },
          { level: 3, stealth: 0.4 },
          { level: 4, stealth: 0.45 },
          { level: 5, stealth: 0.5 }
        ]
      },
      {
        name: 'Rebel Scout Uniform',
        type: 'medium armor',
        defense: 12,
        stealth: 0.2,
        agility: 0.15,
        resistance: {
          blaster: 0.2
        },
        specials: [
          { type: 'recon', effect: 'reveals traps and enemies in stealth', chance: 0.3 }
        ],
        image: '/images/clothing/rebel_scout_uniform.png',
        description: 'Worn by elite Rebel scouts. Designed for stealth and quick movement.',
        rarity: 'uncommon',
        weight: 3,
        upgradePath: [
          { level: 2, defense: 14 },
          { level: 3, defense: 16 },
          { level: 4, defense: 19 },
          { level: 5, defense: 21 }

        ]
      },
      {
        name: 'Inquisitor Battle Garb',
        type: 'armor',
        defense: 16,
        stealth: 0.05,
        resistance: {
          force: 0.3,
          melee: 0.2
        },
        specials: [
          { type: 'force-channel', effect: 'increases damage of Force powers by 15%', chance: 0.4 }
        ],
        image: '/images/clothing/inquisitor_garb.png',
        description: 'Battle attire of Imperial Inquisitors, enhancing combat and Force synergy.',
        rarity: 'epic',
        weight: 4,
        upgradePath: [
          { level: 2, defense: 18 },
          { level: 3, defense: 21 },
          { level: 4, defense: 24 },
          { level: 5, defense: 26 }
        ]
      }
  ];