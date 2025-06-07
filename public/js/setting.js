import { SettingsModal } from './components/settings/SettingsModal.js';

// Inject the settings modal into the DOM if not already present
if (!document.getElementById('setting-overlay')) {
  document.body.insertAdjacentHTML('beforeend', SettingsModal());
}

// Settings overlay logic moved from index.html

const settingOverlay = document.getElementById('setting-overlay');
const settingsButtonMain = document.getElementById('settings-button-main');
const settingsButton = document.getElementById('settings-button-start');
const closeButton = document.getElementById('close-settings');

function openSettings() {
  settingOverlay.classList.remove('hidden');
  settingOverlay.classList.add('flex');
}

function closeSettings() {
  settingOverlay.classList.remove('flex');
  settingOverlay.classList.add('hidden');
}

if (settingOverlay && closeButton) {
  if (settingsButtonMain) {
    settingsButtonMain.addEventListener('click', openSettings);
  }
  if (settingsButton) {
    settingsButton.addEventListener('click', openSettings);
  }
  closeButton.addEventListener('click', closeSettings);
}
