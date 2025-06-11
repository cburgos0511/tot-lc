// Characters Controller
// TODO: Implement character controller logic 

import { characters} from "../models/character.js";

export const getAllCharacters = (req,res) => {
    res.json(characters);
};

export const getCharactersByName = (req,res) => {
    const { name } = req.params;
    const character = character.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (character) {
        res.json(character);
    } else {
        res.status(404).json({ error: "Character not found" });
    }
}
