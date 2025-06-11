export function traitScreen() {
  return `
    <div
  class="max-w-xl mx-auto p-6 rounded-lg shadow-lg text-white font-sans"
  style="
    background-image:
      linear-gradient(rgba(55, 0, 100, 0.7), rgba(0, 0, 80, 0.7)),
      url('https://media.timeout.com/images/105863223/750/562/image.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  "
>
  <h2 class="text-3xl font-extrabold mb-6 text-center tracking-wide text-purple-300 drop-shadow-md">
    Select Your Character Traits
  </h2>

  <div class="mb-5">
    <label for="charSelect" class="block mb-2 text-lg font-semibold text-blue-300">Character</label>
    <select id="charSelect" 
            class="w-full p-3 rounded border-2 border-purple-600 bg-indigo-900 bg-opacity-70 text-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-500 transition">
      <option value="" disabled selected>Select a character</option>
      <option></option>
      <option></option>
      <option></option>
    </select>
  </div>

  <div class="mb-5">
    <label for="weaponSelect" class="block mb-2 text-lg font-semibold text-blue-300">Weapon</label>
    <select id="weaponSelect" 
            class="w-full p-3 rounded border-2 border-purple-600 bg-indigo-900 bg-opacity-70 text-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-500 transition">
      <option value="" disabled selected>Select a weapon</option>
      <option></option>
      <option></option>
      <option></option>
    </select>
  </div>

  <div class="mb-6">
    <label for="clothesSelect" class="block mb-2 text-lg font-semibold text-blue-300">Clothes</label>
    <select id="clothesSelect" 
            class="w-full p-3 rounded border-2 border-purple-600 bg-indigo-900 bg-opacity-70 text-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-500 transition">
      <option value="" disabled selected>Select clothes</option>
      <option></option>
      <option></option>
      <option></option>
    </select>
  </div>

  
  <button id="finalize-btn"class="w-full py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg">
    ✅ Finalize Selection
  </button>
</div>

<div id="summary" class="mt-4 text-white text-lg font-bold"></div>

<div id="start-playing" class="mt-6 text-center hidden">
  <button id ="start-playing-btn"class="py-3 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300 shadow-lg">
    🚀 Start Playing
  </button>
</div>

  `;
}
