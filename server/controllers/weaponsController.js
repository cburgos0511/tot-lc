// Weapons Controller
import { weapons } from '../models/weapon.js';

// Get all weapons
export const getAllWeapons = (req, res) => {
  res.json(weapons);
};

// Get weapon by name
export const getWeaponByName = (req, res) => {
  const { name } = req.params;
  const weapon = weapons.find(w => w.name.toLowerCase() === name.toLowerCase());
  if (weapon) {
    res.json(weapon);
  } else {
    res.status(404).json({ error: 'Weapon not found' });
  }
};

// TODO: Implement weapon controller logic 