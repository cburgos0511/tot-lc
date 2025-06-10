import { SettingsModal, setupSettingsModal } from "./settingmodal.js";

import { mainScreenui } from "/js/ui/mainscreen.js";

import { startScreenui } from "/js/ui/startscreen.js";

document.body.insertAdjacentHTML('beforeend', SettingsModal());
setupSettingsModal();

mainScreenui();

startScreenui();
