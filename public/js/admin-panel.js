const tabs = ['weapons', 'lighthouse', 'characters'];
let currentTab = 'weapons';
const content = document.getElementById('admin-content');
const sortFields = [
  { key: 'name', label: 'Name' },
  { key: 'damage', label: 'Damage' },
  { key: 'rarity', label: 'Rarity' },
  { key: 'range', label: 'Range' }
];
let weaponsData = [];
let selectedSortField = 'name';
let sortDirection = 'asc'; // 'asc' or 'desc'

function setActive(tab) {
  tabs.forEach(t => {
    document.getElementById('tab-' + t).classList.remove('tab-active');
  });
  document.getElementById('tab-' + tab).classList.add('tab-active');
  currentTab = tab;
  renderTab();
}
tabs.forEach(t => {
  document.getElementById('tab-' + t).onclick = () => setActive(t);
});

function renderTab() {
  if (currentTab === 'weapons') {
    renderWeaponsTab();
  } else if (currentTab === 'lighthouse') {
    content.innerHTML = '<div class="text-center text-lg opacity-80">Lighthouse tab coming soon...</div>';
  } else if (currentTab === 'characters') {
    content.innerHTML = '<div class="text-center text-lg opacity-80">Characters tab coming soon...</div>';
  }
}

function renderWeaponsTab() {
  content.innerHTML = `
    <div class="mb-4 flex flex-col md:flex-row md:items-center md:gap-6 gap-3">
      <div class="flex items-center gap-3 w-full md:w-auto">
        <label class="block font-semibold text-lg mb-1 md:mb-0 whitespace-nowrap">Sort by:</label>
        <select id="sort-dropdown" class="block w-44 px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          ${sortFields.map(f => `<option value="${f.key}" ${selectedSortField === f.key ? 'selected' : ''}>${f.label}</option>`).join('')}
        </select>
        <button id="sort-dir-btn" class="flex items-center px-3 py-2 rounded-lg bg-blue-700 text-white font-semibold shadow hover:bg-blue-800 transition ml-2">
          <span id="sort-dir-icon">${sortDirection === 'asc' ? '▲' : '▼'}</span>
          <span class="ml-2 text-sm">${sortDirection === 'asc' ? 'Ascending' : 'Descending'}</span>
        </button>
      </div>
    </div>
    <div id="weapons-list"></div>
  `;
  document.getElementById('sort-dropdown').onchange = e => {
    selectedSortField = e.target.value;
    renderWeaponsList();
  };
  document.getElementById('sort-dir-btn').onclick = () => {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    renderWeaponsTab();
  };
  renderWeaponsList();
}

function renderWeaponsList() {
  const list = document.getElementById('weapons-list');
  if (!weaponsData.length) {
    list.innerHTML = '<div class="text-center text-lg opacity-80">Loading weapons...</div>';
    return;
  }
  // Sorting logic
  const sorted = [...weaponsData].sort((a, b) => {
    let va = a[selectedSortField], vb = b[selectedSortField];
    // Rarity: custom order
    if (selectedSortField === 'rarity') {
      const order = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
      va = order.indexOf(va);
      vb = order.indexOf(vb);
    }
    if (va < vb) return sortDirection === 'asc' ? -1 : 1;
    if (va > vb) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  list.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${sorted.map(w => `
        <div class="bg-gray-700 rounded-lg p-4 flex flex-col gap-2 shadow">
          <div class="font-bold text-lg">${w.name}</div>
          <div class="text-sm opacity-80">${w.description}</div>
          <div class="text-sm">Type: <span class="text-blue-300">${w.type}</span></div>
          <div class="text-sm">Damage: <span class="text-pink-300">${w.damage}</span> | Range: <span class="text-yellow-200">${w.range}</span> | Acc: <span class="text-green-300">${Math.round(w.accuracy * 100)}%</span></div>
          <div class="text-sm">Rarity: <span class="text-yellow-400">${w.rarity}</span></div>
          <div class="text-sm">Special: <span class="text-pink-400">${w.specialAbility || '-'}</span></div>
        </div>
      `).join('')}
    </div>
  `;
}

// Fetch weapons data once
fetch('/api/weapons').then(r => r.json()).then(data => {
  weaponsData = data;
  if (currentTab === 'weapons') renderWeaponsTab();
});

renderTab(); 