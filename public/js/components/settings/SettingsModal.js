// SettingsModal.js
// Returns the settings modal HTML as a string

export function SettingsModal() {
  return `
    <div
      id="setting-overlay"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden justify-center items-center"
    >
      <div
        class="relative bg-white rounded-lg shadow-xl flex flex-col items-center justify-center"
        style="width: 75vw; height: 75vh; max-width: 75vh; max-height: 75vw"
      >
        <button
          id="close-settings"
          class="absolute top-4 right-4 text-3xl leading-none text-gray-600 hover:text-black"
        >
          x
        </button>
        <h2 class="text-2xl font-bold mb-4 text-black">Settings</h2>
        <p class="text-gray-600">Your settings content goes here.</p>
      </div>
    </div>
  `;
} 