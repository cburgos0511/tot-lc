import express from 'express';
import { getAllCharacters, getCharactersByName } from '../controllers/charactersController.js';
const router = express.Router();
// TODO: Add character-related endpoints here

router.get("/", getAllCharacters);
router.get("/:name", getCharactersByName);

export default router; 



