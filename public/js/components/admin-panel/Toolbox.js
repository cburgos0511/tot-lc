// Modular component for the drag-and-drop toolbox
export function renderToolbox(container, entities = []) {
  container.innerHTML = `
    <div class="flex gap-4 mb-2">
      ${entities.map(e => `
        <div class="toolbox-item cursor-pointer p-2 bg-gray-700 rounded text-center" draggable="true" data-type="${e.type}">
          <div class="text-2xl">${e.icon || '❓'}</div>
          <div class="text-xs mt-1">${e.label}</div>
        </div>
      `).join('')}
    </div>
    <div class="text-gray-400 text-xs">(Drag an item onto the grid to place it)</div>
  `;
} 