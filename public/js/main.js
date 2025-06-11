import { SettingsModal, setupSettingsModal } from "/js/components/settingmodal.js";
import { MainScreen } from '/js/screens/MainScreen.js';
import { StartScreen } from '/js/screens/StartScreen.js';
import { ScreenManager } from '/js/screens/ScreenManager.js';
import { traitScreen } from "/js/screens/CharacterTraitsScreen.js";

document.body.insertAdjacentHTML('beforeend', SettingsModal());
setupSettingsModal();

ScreenManager('main-screen', MainScreen);

let selectedCharacter = null;
let selectedWeapon = null;
let selectedClothes = null;

document.addEventListener('click', async (e) => {
  if (e.target.id === 'start-btn') {
    ScreenManager('start-screen', StartScreen);
  } else if (e.target.id === "traits-button") {
    ScreenManager("traitScreen", traitScreen);
    await new Promise(resolve => setTimeout(resolve, 0));
    await populateCharacterSelect();
    await populateWeaponSelect();
    await populateClothesSelect();
  } else if (e.target.textContent.includes('Finalize')) {
    console.log('Final Selection:');
    console.log('Character:', selectedCharacter);
    console.log('Weapon:', selectedWeapon);
    console.log('Clothes:', selectedClothes);
    // You can store or use these variables however you like here
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

  
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Select a character';
  charSelect.appendChild(placeholder);

  
  characters.forEach((char) => {
    const option = document.createElement('option');
    option.value = char.id || char.name;

    const displayedSkills = Array.isArray(char.skills) && char.skills.length
      ? char.skills.map(skill => skill.name).slice(0, 3).join(', ')
      : "No skills";

    option.textContent = `${char.name} Abilities: ${displayedSkills}`;
    charSelect.appendChild(option);
  });

  
  charSelect.addEventListener('change', () => {
    const selectedValue = charSelect.value;
    selectedCharacter = characters.find(char => (char.id || char.name) === selectedValue);
    console.log("Selected character:", selectedCharacter);
  });
}

async function fetchWeapons() {
  try {
    const res = await fetch("http://localhost:3000/api/weapons");
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch weapons:", error);
    return [];
  }
}

async function populateWeaponSelect() {
  const weapons = await fetchWeapons();
  const weaponSelect = document.getElementById('weaponSelect');
  if (!weaponSelect) return;

  weaponSelect.innerHTML = '';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Select a weapon';
  weaponSelect.appendChild(placeholder);

  weapons.forEach(weapon => {
    const option = document.createElement('option');
    option.value = weapon.id || weapon.name;
    const damage = weapon.damage ?? '?';
    const range = weapon.range ?? '?';
    const type = weapon.type ?? 'Unknown';
    option.textContent = `${weapon.name} – Damage: ${damage}, Range: ${range}, Type: ${type}`;
    weaponSelect.appendChild(option);
  });

  weaponSelect.addEventListener('change', () => {
    const selectedValue = weaponSelect.value;
    selectedWeapon = weapons.find(w => (w.id || w.name) === selectedValue);
    console.log("Selected weapon:", selectedWeapon);
  });
}

async function fetchClothes() {
  try {
    const res = await fetch("http://localhost:3000/api/clothes");
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch clothes:", error);
    return [];
  }
}

async function populateClothesSelect() {
  const clothes = await fetchClothes();
  const clothesSelect = document.getElementById('clothesSelect');
  if (!clothesSelect) return;

  clothesSelect.innerHTML = '';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Select clothes';
  clothesSelect.appendChild(placeholder);

  clothes.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id || item.name;
    const ability = item.specials?.map(s => s.type || s.effect).join(', ') || 'No ability';
    option.textContent = `${item.name} – Type: ${item.type}, Ability: ${ability}`;
    clothesSelect.appendChild(option);
  });

  clothesSelect.addEventListener('change', () => {
    const selectedValue = clothesSelect.value;
    selectedClothes = clothes.find(c => (c.id || c.name) === selectedValue);
    console.log("Selected clothes:", selectedClothes);
  });
}
