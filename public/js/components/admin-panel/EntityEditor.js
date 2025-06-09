// Modular component for editing properties of selected entities
export function renderEntityEditor(container, entity = null, idx = null, onSave = null) {
  if (!entity || idx === null || !window.layoutState || !window.layoutState.objects[idx]) {
    container.innerHTML = '<div class="text-gray-400">Select an entity to edit its properties.</div>';
    return;
  }
  const layoutArr = window.layoutState.objects;
  container.innerHTML = `
    <div class="font-bold mb-3 text-lg">Edit Entity</div>
    <div class="grid grid-cols-2 gap-3 mb-3">
      <div class="col-span-2 mb-2">Type: <span class="font-mono text-blue-400">${entity.type}</span></div>
      <label class="flex flex-col">Name
        <input class="bg-gray-700 text-white rounded px-2 py-1 mt-1" value="${entity.name || ''}" />
      </label>
      <label class="flex flex-col">Health
        <input type="number" class="bg-gray-700 text-white rounded px-2 py-1 mt-1" value="${entity.health || 0}" />
      </label>
      <label class="flex flex-col col-span-2">Effect
        <input class="bg-gray-700 text-white rounded px-2 py-1 mt-1" value="${entity.effect ? JSON.stringify(entity.effect) : ''}" />
      </label>
      <label class="flex flex-col">Radius
        <input type="number" class="bg-gray-700 text-white rounded px-2 py-1 mt-1" value="${entity.radius || 0}" />
      </label>
      <div class="flex flex-col gap-1 ml-3">
        <label class="flex items-center gap-1">X: <input id="entity-x" type="number" class="bg-gray-700 text-white rounded px-2 py-1 w-14 text-center" value="${entity.x}" min="0" /></label>
        <label class="flex items-center gap-1">Y: <input id="entity-y" type="number" class="bg-gray-700 text-white rounded px-2 py-1 w-14 text-center" value="${entity.y}" min="0" /></label>
      </div>
    </div>
    <button class="px-4 py-2 bg-blue-700 text-white rounded w-full mt-2 font-semibold">Save</button>
  `;
  setTimeout(() => {
    const xInput = container.querySelector('#entity-x');
    const yInput = container.querySelector('#entity-y');
    // Remove any previous keyHandler attached to this container
    if (container._entityEditorKeyHandler) {
      window.removeEventListener('keydown', container._entityEditorKeyHandler);
      container._entityEditorKeyHandler = null;
    }
    if (xInput) xInput.onchange = (e) => {
      layoutArr[idx].x = Math.max(0, parseInt(e.target.value, 10));
      if (window.redrawEntities) window.redrawEntities();
    };
    if (yInput) yInput.onchange = (e) => {
      layoutArr[idx].y = Math.max(0, parseInt(e.target.value, 10));
      if (window.redrawEntities) window.redrawEntities();
    };
    // Keyboard movement for entity (attach only once)
    function keyHandler(e) {
      if (e.repeat) return;
      let moved = false;
      let newX = layoutArr[idx].x;
      let newY = layoutArr[idx].y;
      if (e.key === 'ArrowUp') { newY = Math.max(0, layoutArr[idx].y - 1); moved = true; }
      if (e.key === 'ArrowDown') { newY = layoutArr[idx].y + 1; moved = true; }
      if (e.key === 'ArrowLeft') { newX = Math.max(0, layoutArr[idx].x - 1); moved = true; }
      if (e.key === 'ArrowRight') { newX = layoutArr[idx].x + 1; moved = true; }
      // Prevent moving to occupied cell (except itself)
      if (moved) {
        const collision = layoutArr.some((o, i) => i !== idx && o.x === newX && o.y === newY);
        if (!collision) {
          layoutArr[idx].x = newX;
          layoutArr[idx].y = newY;
          if (window.redrawEntities) window.redrawEntities();
          if (xInput) xInput.value = layoutArr[idx].x;
          if (yInput) yInput.value = layoutArr[idx].y;
        }
      }
    }
    window.addEventListener('keydown', keyHandler);
    container._entityEditorKeyHandler = keyHandler;
    // Save button logic
    const saveBtn = container.querySelector('button');
    if (saveBtn) saveBtn.onclick = () => {
      const nameInput = container.querySelector('input[type="text"]');
      const healthInput = container.querySelector('input[type="number"]');
      const effectInput = container.querySelectorAll('input')[2];
      const radiusInput = container.querySelectorAll('input')[3];
      const xInput = container.querySelector('#entity-x');
      const yInput = container.querySelector('#entity-y');
      let newX = Math.max(0, parseInt(xInput.value, 10));
      let newY = Math.max(0, parseInt(yInput.value, 10));
      // Prevent saving to occupied cell (except itself)
      const collision = layoutArr.some((o, i) => i !== idx && o.x === newX && o.y === newY);
      if (collision) {
        container.querySelector('.font-bold').innerHTML = '<span class="text-red-400">Position occupied! Choose another.</span>';
        return;
      }
      if (nameInput) layoutArr[idx].name = nameInput.value;
      if (healthInput) layoutArr[idx].health = parseInt(healthInput.value, 10);
      if (effectInput) {
        try {
          layoutArr[idx].effect = effectInput.value ? JSON.parse(effectInput.value) : null;
        } catch {
          layoutArr[idx].effect = effectInput.value;
        }
      }
      if (radiusInput) layoutArr[idx].radius = parseInt(radiusInput.value, 10);
      layoutArr[idx].x = newX;
      layoutArr[idx].y = newY;
      if (window.redrawEntities) window.redrawEntities();
      // After save, clear the editor immediately
      container.innerHTML = '';
      // Remove key handler if editor is removed
      if (container._entityEditorKeyHandler) {
        window.removeEventListener('keydown', container._entityEditorKeyHandler);
        container._entityEditorKeyHandler = null;
      }
      const observer = new MutationObserver(() => {
        if (!container.innerHTML && container._entityEditorKeyHandler) {
          window.removeEventListener('keydown', container._entityEditorKeyHandler);
          container._entityEditorKeyHandler = null;
        }
      });
      observer.observe(container, { childList: true });
      // Call onSave callback if provided
      if (typeof onSave === 'function') onSave();
    };
  }, 0);
} 