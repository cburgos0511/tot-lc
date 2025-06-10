import { SettingsModal, setupSettingsModal } from "/js/components/settingmodal.js";

import { MainScreen } from '/js/screens/MainScreen.js';
import { StartScreen } from '/js/screens/StartScreen.js';
import { ScreenManager } from '/js/screens/ScreenManager.js';
import { traitScreen } from "/js/screens/CharacterTraitsScreen.js";

document.body.insertAdjacentHTML('beforeend', SettingsModal());
setupSettingsModal();

// Show main screen on load
ScreenManager('main-screen', MainScreen);

document.addEventListener('click', (e) => {
  if (e.target.id === 'start-btn') {
    ScreenManager('start-screen', StartScreen);
  }
  else if (e.target.id === "traits-button") {
    ScreenManager("traitScreen", traitScreen)
  }
});
