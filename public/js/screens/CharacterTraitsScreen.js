export function traitScreen() {
return `<div class="max-w-xl mx-auto p-6 bg-black bg-opacity-70 rounded-lg shadow-lg text-yellow-200">
  <h2 class="text-3xl font-bold mb-6 text-center font-gothic tracking-wider">
    🧙 Select Your Character Traits
  </h2>

  <!-- Character Select -->
  <div class="mb-5">
    <label for="charSelect" class="block mb-2 text-lg font-semibold">Character</label>
    <select id="charSelect" class="w-full p-2 rounded bg-gray-800 border border-yellow-700 text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500">
      <option>Warrior</option>
      <option>Mage</option>
      <option>Rogue</option>
    </select>
  </div>

  <!-- Weapon Select -->
  <div class="mb-5">
    <label for="weaponSelect" class="block mb-2 text-lg font-semibold">Weapon</label>
    <select id="weaponSelect" class="w-full p-2 rounded bg-gray-800 border border-yellow-700 text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500">
      <option>Sword</option>
      <option>Staff</option>
      <option>Daggers</option>
    </select>
  </div>

  <!-- Clothes Select -->
  <div class="mb-6">
    <label for="clothesSelect" class="block mb-2 text-lg font-semibold">Clothes</label>
    <select id="clothesSelect" class="w-full p-2 rounded bg-gray-800 border border-yellow-700 text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500">
      <option>Armor</option>
      <option>Robe</option>
      <option>Cloak</option>
    </select>
  </div>

  <!-- Finalize Button -->
  <button class="w-full py-3 bg-yellow-800 text-yellow-100 font-semibold rounded-lg hover:bg-yellow-700 transition-all duration-300">
    ✅ Finalize Selection
  </button>

  <!-- Summary Placeholder -->
  <div id="summaryOutput" class="mt-8 text-yellow-200 text-lg font-gothic">
    <!-- Summary will go here -->
  </div>
</div>
`
}


