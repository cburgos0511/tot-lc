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
];

let layoutState = {
  gridWidth: GRID_SIZE,
  gridHeight: GRID_SIZE,
  objects: [], // {type, x, y, ...props}
};
let selectedEntity = null;
let selectedEntities = new Set(); // For multi-select
let undoStack = [];
let redoStack = [];
let dragPreview = null;
let hoverCell = null;

export function renderLayoutCreator(container) {
  container.innerHTML = `
    <div class="text-xl font-bold mb-4">Layout Creator (KaboomJS)</div>
    <div class="flex gap-8">
      <div>
        <div id="kaboom-canvas-root" style="width: ${GRID_SIZE * CELL_SIZE}px; height: ${GRID_SIZE * CELL_SIZE}px; background: #222; margin-bottom: 1rem; position:relative;"></div>
        <div class="flex gap-2 mb-2">
          <button id="undo-btn" class="px-2 py-1 bg-gray-600 text-white rounded">Undo</button>
          <button id="redo-btn" class="px-2 py-1 bg-gray-600 text-white rounded">Redo</button>
          <button id="copy-btn" class="px-2 py-1 bg-gray-600 text-white rounded">Copy</button>
          <button id="paste-btn" class="px-2 py-1 bg-gray-600 text-white rounded">Paste</button>
          <button id="delete-btn" class="px-2 py-1 bg-red-700 text-white rounded">Delete</button>
        </div>
        <div class="flex gap-2 mb-2">
          <button id="save-layout-btn" class="px-4 py-2 bg-green-700 text-white rounded font-bold">Save Layout</button>
          <select id="load-layout-select" class="px-2 py-1 rounded bg-gray-700 text-white"></select>
          <button id="load-layout-btn" class="px-2 py-1 bg-blue-700 text-white rounded">Load</button>
        </div>
      </div>
      <div style="min-width:180px;">
        <div id="toolbox-root" class="mb-4"></div>
        <div id="entity-editor-root"></div>
      </div>
    </div>
    <div class="mt-4 text-gray-500">(Drag and drop entities. Shift+Click for multi-select. Ctrl+C/Ctrl+V for copy/paste. Click an entity to edit.)</div>
    <div id="validation-msg" class="mt-2 text-red-400"></div>
  `;

  // Toolbox
  const toolboxRoot = document.getElementById("toolbox-root");
  renderToolbox(toolboxRoot, TOOLBOX_ENTITIES);

  // Entity editor
  const entityEditorRoot = document.getElementById("entity-editor-root");
  renderEntityEditor(entityEditorRoot, selectedEntity);

  // Kaboom setup
  const kaboomRoot = document.getElementById("kaboom-canvas-root");
  const k = kaboom({ root: kaboomRoot, width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE, background: [34, 34, 34], global: false });
  const { add, rect, pos, color, area, get, destroy, rgb, onMouseMove, onDraw } = k;

  // Draw grid
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      add([
        rect(CELL_SIZE - 2, CELL_SIZE - 2),
        pos(x * CELL_SIZE + 1, y * CELL_SIZE + 1),
        color(60, 60, 60),
        area(),
        "grid-cell",
        { gridX: x, gridY: y }
      ]);
    }
  }

  // Place entities from layoutState
  function redrawEntities() {
    get("entity").forEach(destroy);
    layoutState.objects.forEach((obj, idx) => {
      const spriteColor = obj.type === "enemy" ? rgb(200, 50, 50) : obj.type === "structure" ? rgb(200, 200, 50) : obj.type === "entry" ? rgb(50, 200, 50) : obj.type === "exit" ? rgb(50, 50, 200) : rgb(200, 200, 200);
      const highlight = selectedEntities.has(idx) ? rgb(255, 255, 0) : spriteColor;
      add([
        rect(CELL_SIZE - 6, CELL_SIZE - 6),
        pos(obj.x * CELL_SIZE + 3, obj.y * CELL_SIZE + 3),
        color(highlight),
        area(),
        "entity",
        { ...obj, idx }
      ]).onClick(() => {
        if (window.event.shiftKey) {
          selectedEntities.add(idx);
        } else {
          selectedEntities.clear();
          selectedEntities.add(idx);
        }
        selectedEntity = obj;
        renderEntityEditor(entityEditorRoot, selectedEntity);
        redrawEntities();
      });
    });
  }
  redrawEntities();

  // Hover highlight
  onMouseMove(() => {
    const mouse = k.mousePos();
    const x = Math.floor(mouse.x / CELL_SIZE);
    const y = Math.floor(mouse.y / CELL_SIZE);
    if (x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE) {
      hoverCell = { x, y };
    } else {
      hoverCell = null;
    }
  });
  onDraw(() => {
    if (hoverCell) {
      add([
        rect(CELL_SIZE - 2, CELL_SIZE - 2),
        pos(hoverCell.x * CELL_SIZE + 1, hoverCell.y * CELL_SIZE + 1),
        color(100, 200, 255),
        area(),
        k.opacity(0.2),
        k.z(1000)
      ]);
    }
    if (dragPreview) {
      add([
        rect(CELL_SIZE - 6, CELL_SIZE - 6),
        pos(dragPreview.x * CELL_SIZE + 3, dragPreview.y * CELL_SIZE + 3),
        color(180, 180, 180),
        area(),
        k.opacity(0.5),
        k.z(1000)
      ]);
    }
  });

  // Drag-and-drop logic
  let draggingType = null;
  toolboxRoot.querySelectorAll(".toolbox-item").forEach(item => {
    item.addEventListener("dragstart", function () {
      draggingType = item.getAttribute("data-type");
    });
  });
  kaboomRoot.addEventListener("dragover", e => {
    e.preventDefault();
    const rect = kaboomRoot.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
    dragPreview = { x, y };
  });
  kaboomRoot.addEventListener("dragleave", () => { dragPreview = null; });
  kaboomRoot.addEventListener("drop", e => {
    const rect = kaboomRoot.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
    if (draggingType && x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE) {
      pushUndo();
      layoutState.objects.push({ type: draggingType, x, y });
      redrawEntities();
      draggingType = null;
      dragPreview = null;
    }
  });

  // Undo/Redo logic
  function pushUndo() {
    undoStack.push(JSON.stringify(layoutState));
    redoStack = [];
  }
  document.getElementById("undo-btn").onclick = () => {
    if (undoStack.length) {
      redoStack.push(JSON.stringify(layoutState));
      layoutState = JSON.parse(undoStack.pop());
      redrawEntities();
    }
  };
  document.getElementById("redo-btn").onclick = () => {
    if (redoStack.length) {
      undoStack.push(JSON.stringify(layoutState));
      layoutState = JSON.parse(redoStack.pop());
      redrawEntities();
    }
  };

  // Copy/Paste logic
  let clipboard = [];
  document.getElementById("copy-btn").onclick = () => {
    clipboard = Array.from(selectedEntities).map(idx => ({ ...layoutState.objects[idx] }));
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
    layoutState.objects = layoutState.objects.filter((_, idx) => !selectedEntities.has(idx));
    selectedEntities.clear();
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