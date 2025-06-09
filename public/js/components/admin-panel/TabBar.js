export function TabBar(tabs, currentTab) {
  return `
    <div class="flex gap-2 mb-4 text-lg font-semibold mb-7">
      ${tabs.map(t => `
        <button id="tab-${t}" class="tab-btn${currentTab === t ? ' tab-active' : ''}">${t.charAt(0).toUpperCase() + t.slice(1)}</button>
      `).join('')}
    </div>
  `;
} 