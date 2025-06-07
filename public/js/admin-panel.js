import { TabBar } from './components/TabBar.js';
import { SortBar } from './components/SortBar.js';
import { WeaponsList } from './components/WeaponsList.js';

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

function setActive(tab) {
  currentTab = tab;
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
    <div class="mb-4 flex flex-col md:flex-row md:items-center md:gap-6 gap-3">
      ${SortBar(sortFields, selectedSortField, sortDirection)}
    </div>
    <div id="weapons-list"></div>
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
}

// Fetch weapons data once
fetch('/api/weapons').then(r => r.json()).then(data => {
  weaponsData = data;
  if (currentTab === 'weapons') renderTab();
});

renderTab(); 