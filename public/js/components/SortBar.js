export function SortBar(sortFields, selectedSortField, sortDirection) {
  return `
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
  `;
} 