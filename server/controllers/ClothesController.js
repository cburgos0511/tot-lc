import { clothes } from "../models/clothes.js";

export const getAllClothes = (req,res) => {
    res.json(clothes);
};

export const getClothesByName = (req,res) => {
    const { name } = req.params;
    const clothes = clothes.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (clothes) {
        res.json(clothes);
    } else {
        res.status(404).json({ error: "Clothes not found" });
    }
}