import { TabBar } from './components/TabBar.js';
import { SortBar } from './components/SortBar.js';
import { WeaponsList } from './components/WeaponsList.js';
import { WeaponSimulator } from './components/WeaponSimulator.js';

const tabs = ['weapons', 'lighthouse', 'characters'];
let currentTab = 'weapons';
const content = document.getElementById('admin-content');
const sortFields = [
  { key: 'name', label: 'Name' },
  { key: 'damage', label: 'Damage' },
  { key: 'rarity', label: 'Rarity' },
  { key: 'range', label: 'Range' },
  { key: 'piercing', label: 'Piercing' },
  { key: 'splashRadius', label: 'Splash Radius' },
  { key: 'headshotChance', label: 'Headshot Chance' }
];
let weaponsData = [];
let selectedSortField = 'name';
let sortDirection = 'asc'; // 'asc' or 'desc'
let selectedWeapon = null;

function setActive(tab) {
  currentTab = tab;
  selectedWeapon = null;
  renderTab();
}

function renderTab() {
  content.innerHTML = `
    ${TabBar(tabs, currentTab)}
    <div id="tab-content"></div>
  `;
  tabs.forEach(t => {
    document.getElementById('tab-' + t).onclick = () => setActive(t);
  });
  const tabContent = document.getElementById('tab-content');
  if (currentTab === 'weapons') {
    renderWeaponsTab(tabContent);
  } else if (currentTab === 'lighthouse') {
    tabContent.innerHTML = '<div class="text-center text-lg opacity-80">Lighthouse tab coming soon...</div>';
  } else if (currentTab === 'characters') {
    tabContent.innerHTML = '<div class="text-center text-lg opacity-80">Characters tab coming soon...</div>';
  }
}

function renderWeaponsTab(tabContent) {
  tabContent.innerHTML = `
    <div class="flex flex-col md:flex-row gap-8 h-[600px]">
      <div class="flex flex-col flex-1 min-w-[340px] max-w-[420px] h-full">
        <div id="simulator-container" class="flex-1"></div>
      </div>
      <div class="flex-1 min-w-[340px] h-full flex flex-col">
        <div class="mb-4 flex flex-col md:flex-row md:items-center md:gap-6 gap-3">
          ${SortBar(sortFields, selectedSortField, sortDirection)}
        </div>
        <div id="weapons-list" class="flex-1 overflow-y-auto max-h-[540px]"></div>
      </div>
    </div>
  `;
  document.getElementById('sort-dropdown').onchange = e => {
    selectedSortField = e.target.value;
    renderWeaponsList();
  };
  document.getElementById('sort-dir-btn').onclick = () => {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    renderWeaponsTab(tabContent);
  };
  renderWeaponsList();
  renderSimulatorAndLog();
  window.addEventListener('simulator-update', renderSimulatorAndLog);
}

function renderSimulatorAndLog() {
  const simContainer = document.getElementById('simulator-container');
  if (!simContainer) return;
  if (selectedWeapon) {
    simContainer.innerHTML = WeaponSimulator({ weapon: selectedWeapon, gridSize: 20, onLog: updateSimLog });
  } else {
    simContainer.innerHTML = `<div class='text-center text-lg opacity-70 mt-12'>Select a weapon to visualize its effects.</div>`;
    updateSimLog();
  }
}

function updateSimLog() {
  // No log rendering here; handled by WeaponSimulator
}

function renderWeaponsList() {
  const list = document.getElementById('weapons-list');
  // Sorting logic
  const sorted = [...weaponsData].sort((a, b) => {
    let va = a[selectedSortField], vb = b[selectedSortField];
    // Rarity: custom order
    if (selectedSortField === 'rarity') {
      const order = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
      va = order.indexOf(va);
      vb = order.indexOf(vb);
    }
    // Handle undefined/null values for new fields
    if (va === undefined || va === null) va = -Infinity;
    if (vb === undefined || vb === null) vb = -Infinity;
    if (va < vb) return sortDirection === 'asc' ? -1 : 1;
    if (va > vb) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  list.innerHTML = WeaponsList(sorted);
  // Attach click handlers to weapon cards (now by index)
  list.querySelectorAll('.cursor-pointer').forEach((el, idx) => {
    el.onclick = () => {
      const weapon = sorted[idx];
      selectedWeapon = weapon;
      renderSimulatorAndLog();
    };
  });
}

// Fetch weapons data once
fetch('/api/weapons').then(r => r.json()).then(data => {
  weaponsData = data;
  if (currentTab === 'weapons') renderTab();
});

renderTab(); 