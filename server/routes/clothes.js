import express from 'express';
import { getAllClothes, getClothesByName } from '../controllers/ClothesController.js';
const router = express.Router();


router.get("/", getAllClothes);
router.get("/:name", getClothesByName);

export default router; 




