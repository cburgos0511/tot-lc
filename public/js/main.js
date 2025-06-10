import { SettingsModal, setupSettingsModal } from "/js/components/settingmodal.js";

import { MainScreen } from '/js/screens/MainScreen.js';
import { StartScreen } from '/js/screens/StartScreen.js';
import { ScreenManager } from '/js/screens/ScreenManager.js';
import { traitScreen } from "/js/screens/CharacterTraitsScreen.js";

document.body.insertAdjacentHTML('beforeend', SettingsModal());
setupSettingsModal();


ScreenManager('main-screen', MainScreen);

document.addEventListener('click', async (e) => {
  if (e.target.id === 'start-btn') {
    ScreenManager('start-screen', StartScreen);
  } else if (e.target.id === "traits-button") {
    ScreenManager("traitScreen", traitScreen);
   
    await new Promise(resolve => setTimeout(resolve, 0));
    await populateCharacterSelect();
  }
});


async function fetchCharacters() {
  try {
    const res = await fetch("http://localhost:3000/api/characters");
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    return [];
  }
}

async function populateCharacterSelect() {
  const characters = await fetchCharacters();
  const charSelect = document.getElementById('charSelect');

  if (!charSelect) return;

  
  charSelect.innerHTML = '';

  characters.forEach((char) => {
    const option = document.createElement('option');
    option.value = char.id || char.name; 
    
    const displayedSkills = Array.isArray(char.skills) && char.skills.length
      ? char.skills.map(skill => skill.name).slice(0, 3).join(', ')
      : "No skills";
  
    option.textContent = `${char.name} Abilities: ${displayedSkills}`;
  
    charSelect.appendChild(option);
  });
  
}