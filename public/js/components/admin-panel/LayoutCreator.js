import kaboom from "kaboom";
import { renderToolbox } from './Toolbox.js';
import { renderEntityEditor } from './EntityEditor.js';

const GRID_SIZE = 20;
const CELL_SIZE = 32;

const TOOLBOX_ENTITIES = [
  { type: "enemy", label: "Enemy", icon: "👾" },
  { type: "structure", label: "Barrel", icon: "🛢️" },
  { type: "entry", label: "Entry", icon: "🚪" },
  { type: "exit", label: "Exit", icon: "🏁" },
  { type: "trap", label: "Trap", icon: "💣" },
  { type: "wall", label: "Wall", icon: "🧱" },
];

const ENTITY_COLORS = {
  enemy: [200, 50, 50],
  structure: [200, 200, 50],
  entry: [50, 200, 50],
  exit: [50, 50, 200],
  trap: [200, 100, 100],
  wall: [120, 120, 120],
  default: [200, 200, 200],
};
const MAX_UNDO = 100;

let layoutState = {
  gridWidth: GRID_SIZE,
  gridHeight: GRID_SIZE,
  objects: [],
};
let selectedEntity = null;
let selectedEntityIdx = null;
let undoStack = [];
let redoStack = [];
let placementType = null;

export function renderLayoutCreator(container) {
  window.layoutState = layoutState;
  container.innerHTML = `
    <div class="text-xl font-bold mb-4">Layout Creator (KaboomJS)</div>
    <div class="flex gap-8">
      <div>
        <div id="kaboom-canvas-root" style="width: ${GRID_SIZE * CELL_SIZE}px; height: ${GRID_SIZE * CELL_SIZE}px; background: #222; margin-bottom: 1rem; position:relative;"></div>
        <div class="flex gap-2 mb-2">
          <button id="undo-btn" class="px-2 py-1 bg-gray-600 text-white rounded transition-transform duration-100 hover:scale-105 hover:shadow-lg active:scale-95">Undo</button>
          <button id="redo-btn" class="px-2 py-1 bg-gray-600 text-white rounded transition-transform duration-100 hover:scale-105 hover:shadow-lg active:scale-95">Redo</button>
          <button id="copy-btn" class="px-2 py-1 bg-gray-600 text-white rounded transition-transform duration-100 hover:scale-105 hover:shadow-lg active:scale-95">Copy</button>
          <button id="paste-btn" class="px-2 py-1 bg-gray-600 text-white rounded transition-transform duration-100 hover:scale-105 hover:shadow-lg active:scale-95">Paste</button>
          <button id="delete-btn" class="px-2 py-1 bg-red-700 text-white rounded transition-transform duration-100 hover:scale-105 hover:shadow-lg active:scale-95">Delete</button>
        </div>
        <div class="flex gap-2 mb-2">
          <button id="save-layout-btn" class="px-4 py-2 bg-green-700 text-white rounded font-bold transition-transform duration-100 hover:scale-105 hover:shadow-lg active:scale-95">Save Layout</button>
          <select id="load-layout-select" class="px-2 py-1 rounded bg-gray-700 text-white"></select>
          <button id="load-layout-btn" class="px-2 py-1 bg-blue-700 text-white rounded transition-transform duration-100 hover:scale-105 hover:shadow-lg active:scale-95">Load</button>
        </div>
      </div>
      <div class="w-full">
        <div id="toolbox-root" class="mb-4"></div>
        <div id="entity-editor-root"></div>
      </div>
    </div>
    <div class="mt-4 text-gray-500">(Click toolbox entity, then click grid to add. Shift+Click for multi-select. Ctrl+C/Ctrl+V for copy/paste. Click an entity to edit.)</div>
    <div id="validation-msg" class="mt-2 text-red-400"></div>
  `;

  // Toolbox
  const toolboxRoot = document.getElementById("toolbox-root");
  renderToolbox(toolboxRoot, TOOLBOX_ENTITIES);

  // Entity editor
  const entityEditorRoot = document.getElementById("entity-editor-root");
  function clearSelectionAndRedraw() {
    selectedEntityIdx = null;
    selectedEntity = null;
    renderEntityEditor(entityEditorRoot, null, null, clearSelectionAndRedraw);
    redrawEntities();
  }
  renderEntityEditor(entityEditorRoot, selectedEntity, selectedEntityIdx, clearSelectionAndRedraw);

  // JSON visualizer
  const jsonVisRoot = document.createElement('div');
  jsonVisRoot.id = 'json-visualizer-root';
  jsonVisRoot.style.marginTop = '2rem';
  jsonVisRoot.style.background = '#181818';
  jsonVisRoot.style.color = '#b5f4a5';
  jsonVisRoot.style.padding = '1rem';
  jsonVisRoot.style.borderRadius = '8px';
  jsonVisRoot.style.fontSize = '0.9rem';
  jsonVisRoot.style.maxHeight = '300px';
  jsonVisRoot.style.overflowY = 'auto';
  entityEditorRoot.parentNode.appendChild(jsonVisRoot);
  function updateJsonVisualizer() {
    jsonVisRoot.innerHTML = `<div class='font-bold mb-2 text-green-300'>Layout JSON</div><pre style='white-space:pre-wrap;'>${JSON.stringify(layoutState, null, 2)}</pre>`;
  }
  updateJsonVisualizer();

  // Kaboom setup
  const kaboomRoot = document.getElementById("kaboom-canvas-root");
  const k = kaboom({ root: kaboomRoot, width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE, background: [34, 34, 34], global: false });
  const { add, rect, pos, color, area, get, destroy, rgb } = k;

  function redrawEntities() {
    window.layoutState = layoutState;
    get("grid-cell").forEach(destroy);
    get("entity").forEach(destroy);
    // Debug: log the current objects
    console.log('RENDERING OBJECTS:', JSON.stringify(layoutState.objects));
    if (!Array.isArray(layoutState.objects) || layoutState.objects.length === 0) {
      console.warn('No objects to render after save!');
    }
    // Draw grid and attach click handlers
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const cell = add([
          rect(CELL_SIZE - 2, CELL_SIZE - 2),
          pos(x * CELL_SIZE + 1, y * CELL_SIZE + 1),
          color(60, 60, 60),
          area(),
          "grid-cell",
          { gridX: x, gridY: y }
        ]);
        cell.onClick(() => {
          if (placementType && TOOLBOX_ENTITIES.some(e => e.type === placementType)) {
            if (layoutState.objects.some(obj => obj.x === x && obj.y === y)) return;
            if (
              x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE
            ) {
              pushUndo();
              layoutState.objects.push({ type: placementType, x, y });
              setTimeout(() => redrawEntities(), 0);
            }
          } else {
            selectedEntityIdx = null;
            selectedEntity = null;
            entityEditorRoot.innerHTML = '';
            setTimeout(() => redrawEntities(), 0);
          }
        });
      }
    }
    // Draw entities
    layoutState.objects.forEach((obj, idx) => {
      if (
        typeof obj.x !== 'number' || isNaN(obj.x) ||
        typeof obj.y !== 'number' || isNaN(obj.y) ||
        typeof obj.type !== 'string'
      ) {
        console.warn('Invalid entity object at idx', idx, obj);
        return;
      }
      const colorArr = ENTITY_COLORS[obj.type] || ENTITY_COLORS.default;
      const spriteColor = rgb(...colorArr);
      const highlight = (selectedEntityIdx === idx) ? rgb(0, 255, 255) : spriteColor;
      const { x, y, type, name, health, effect } = obj;
      const ent = add([
        rect(CELL_SIZE - 6, CELL_SIZE - 6),
        pos(x * CELL_SIZE + 3, y * CELL_SIZE + 3),
        color(highlight),
        area(),
        "entity",
        { x, y, type, name, health, effect, idx }
      ]);
      ent.onClick((e) => {
        // Always clear the editor before opening a new one
        entityEditorRoot.innerHTML = '';
        selectedEntityIdx = idx;
        selectedEntity = obj;
        renderEntityEditor(entityEditorRoot, obj, idx, clearSelectionAndRedraw);
        setTimeout(() => redrawEntities(), 0);
        if (e && e.stopPropagation) e.stopPropagation();
      });
    });
    updateJsonVisualizer();
    window.layoutState = layoutState;
  }
  window.redrawEntities = redrawEntities;
  redrawEntities();

  // Placement mode: click toolbox item to activate
  toolboxRoot.querySelectorAll(".toolbox-item").forEach(item => {
    item.onclick = function () {
      placementType = item.getAttribute("data-type");
      toolboxRoot.querySelectorAll(".toolbox-item").forEach(i => i.classList.remove("bg-green-800"));
      item.classList.add("bg-green-800");
    };
  });

  // Undo/Redo logic
  function pushUndo() {
    undoStack.push(JSON.stringify(layoutState));
    if (undoStack.length > MAX_UNDO) undoStack.shift();
    redoStack = [];
    updateJsonVisualizer();
    window.layoutState = layoutState;
  }
  document.getElementById("undo-btn").onclick = () => {
    if (undoStack.length) {
      redoStack.push(JSON.stringify(layoutState));
      layoutState = JSON.parse(undoStack.pop());
      window.layoutState = layoutState;
      redrawEntities();
    }
  };
  document.getElementById("redo-btn").onclick = () => {
    if (redoStack.length) {
      undoStack.push(JSON.stringify(layoutState));
      layoutState = JSON.parse(redoStack.pop());
      window.layoutState = layoutState;
      redrawEntities();
    }
  };

  // Copy/Paste logic
  let clipboard = [];
  document.getElementById("copy-btn").onclick = () => {
    if (selectedEntityIdx !== null) {
      clipboard = [JSON.parse(JSON.stringify(layoutState.objects[selectedEntityIdx]))];
    } else {
      clipboard = [];
    }
  };
  document.getElementById("paste-btn").onclick = () => {
    if (clipboard.length) {
      pushUndo();
      clipboard.forEach(obj => {
        layoutState.objects.push({ ...obj, x: Math.min(obj.x + 1, GRID_SIZE - 1), y: Math.min(obj.y + 1, GRID_SIZE - 1) });
      });
      redrawEntities();
    }
  };
  document.getElementById("delete-btn").onclick = () => {
    pushUndo();
    if (selectedEntityIdx !== null) {
      layoutState.objects = layoutState.objects.filter((_, idx) => idx !== selectedEntityIdx);
      selectedEntityIdx = null;
      selectedEntity = null;
      entityEditorRoot.innerHTML = '';
    }
    window.layoutState = layoutState;
    redrawEntities();
  };

  // Save/load logic (mocked)
  document.getElementById("save-layout-btn").onclick = async () => {
    const name = prompt("Layout name?");
    if (!name) return;
    // TODO: POST to /api/layouts
    alert("Layout saved (mock)");
  };
  document.getElementById("load-layout-btn").onclick = async () => {
    // TODO: Load from /api/layouts
    alert("Load layout (mock)");
  };
} 