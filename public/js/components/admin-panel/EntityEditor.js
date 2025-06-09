// Modular component for editing properties of selected entities
export function renderEntityEditor(container, entity = null) {
  if (!entity) {
    container.innerHTML = '<div class="text-gray-400">Select an entity to edit its properties.</div>';
    return;
  }
  container.innerHTML = `
    <div class="font-bold mb-2">Edit Entity</div>
    <div class="mb-2">Type: <span class="font-mono">${entity.type}</span></div>
    <div class="mb-2">Name: <input class="bg-gray-700 text-white rounded px-2 py-1" value="${entity.name || ''}" /></div>
    <div class="mb-2">Health: <input type="number" class="bg-gray-700 text-white rounded px-2 py-1" value="${entity.health || 0}" /></div>
    <div class="mb-2">Effect: <input class="bg-gray-700 text-white rounded px-2 py-1" value="${entity.effect ? JSON.stringify(entity.effect) : ''}" /></div>
    <div class="mb-2">Radius: <input type="number" class="bg-gray-700 text-white rounded px-2 py-1" value="${entity.radius || 0}" /></div>
    <button class="px-3 py-1 bg-blue-700 text-white rounded">Save</button>
  `;
} 