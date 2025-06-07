import express from 'express';
import { getAllWeapons, getWeaponByName } from '../controllers/weaponsController.js';
const router = express.Router();

// Get all weapons
router.get('/', getAllWeapons);
// Get weapon by name
router.get('/:name', getWeaponByName);

export default router; 