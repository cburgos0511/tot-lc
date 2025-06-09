import kaboom from "kaboom";

let lastSimState = null;

function getTimeString() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function WeaponSimulator({ weapon, gridSize = 20, onLog }) {
  // Character and enemy start positions
  const charX = Math.floor(gridSize / 2);
  const charY = Math.floor(gridSize / 2);
  if (!lastSimState || lastSimState.weaponName !== weapon.name) {
    lastSimState = {
      weaponName: weapon.name,
      shot: null, // last shot
      aim: null,  // current aim
      overlays: [],
      log: [], // array of {time, message}
      player: { x: charX, y: charY, health: 100 },
      enemy: { x: charX + 5, y: charY, health: 100 },
      mode: 'shoot' // or 'move-enemy'
    };
  }

  // Kaboom constants
  const CELL_SIZE = 28;
  const WIDTH = gridSize * CELL_SIZE;
  const HEIGHT = gridSize * CELL_SIZE;
  const CANVAS_ID = `kaboom-sim-canvas-${weapon.name.replace(/\W/g, '')}`;

  // Mount point for Kaboom
  setTimeout(() => {
    let root = document.getElementById(CANVAS_ID);
    if (!root) return;
    // Only initialize Kaboom if not already initialized for this root
    if (!root._kaboom) {
      root.innerHTML = '';
      const k = kaboom({ root, width: WIDTH, height: HEIGHT, background: [34, 34, 34], global: false });
      root._kaboom = k;
      const { add, rect, pos, color, area, onClick, onMouseMove, rgb, z, opacity, mousePos, destroyAll } = k;

      // Draw grid (static, only once)
      for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
          add([
            rect(CELL_SIZE - 2, CELL_SIZE - 2),
            pos(x * CELL_SIZE + 1, y * CELL_SIZE + 1),
            color(60, 60, 60),
            area(),
            'grid-cell',
            { gridX: x, gridY: y }
          ]);
        }
      }

      // Draw overlays and entities (dynamic)
      function drawEntities() {
        destroyAll('overlay');
        destroyAll('entity');
        // Range overlay (light green, lowest z)
        for (let x = 0; x < gridSize; x++) {
          for (let y = 0; y < gridSize; y++) {
            if (inRange(x, y)) {
              add([
                rect(CELL_SIZE - 4, CELL_SIZE - 4),
                pos(x * CELL_SIZE + 2, y * CELL_SIZE + 2),
                color(180, 255, 180), // very light green
                opacity(0.18),
                z(1),
                'overlay',
              ]);
            }
          }
        }
        // Overlays
        for (let x = 0; x < gridSize; x++) {
          for (let y = 0; y < gridSize; y++) {
            let overlay = getOverlay(x, y);
            if (overlay) {
              let overlayColor =
                overlay === 'aim' ? rgb(255, 230, 80) :
                  overlay === 'aim-splash' ? rgb(255, 180, 220) :
                    overlay === 'splash' ? rgb(255, 120, 180) :
                      overlay === 'pierce' ? rgb(255, 255, 80) :
                        overlay === 'burn' ? rgb(180, 30, 30) :
                          overlay === 'blind' ? rgb(255, 255, 180) :
                            null;
              if (overlayColor) {
                add([
                  rect(CELL_SIZE - 4, CELL_SIZE - 4),
                  pos(x * CELL_SIZE + 2, y * CELL_SIZE + 2),
                  color(overlayColor),
                  opacity(0.7),
                  z(10),
                  'overlay',
                ]);
              }
            }
          }
        }
        // Player
        add([
          rect(CELL_SIZE - 6, CELL_SIZE - 6),
          pos(lastSimState.player.x * CELL_SIZE + 3, lastSimState.player.y * CELL_SIZE + 3),
          color(80, 160, 255),
          z(20),
          'entity',
        ]);
        // Enemy
        add([
          rect(CELL_SIZE - 6, CELL_SIZE - 6),
          pos(lastSimState.enemy.x * CELL_SIZE + 3, lastSimState.enemy.y * CELL_SIZE + 3),
          color(255, 80, 80),
          z(20),
          'entity',
        ]);
        // Shot
        if (lastSimState.shot) {
          add([
            rect(CELL_SIZE - 10, CELL_SIZE - 10),
            pos(lastSimState.shot.x * CELL_SIZE + 5, lastSimState.shot.y * CELL_SIZE + 5),
            color(255, 80, 80),
            z(30),
            'entity',
          ]);
        }
      }
      root._drawEntities = drawEntities;
      drawEntities();

      // Mouse interaction
      onClick(() => {
        const mouse = mousePos();
        const x = Math.floor(mouse.x / CELL_SIZE);
        const y = Math.floor(mouse.y / CELL_SIZE);
        if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) return;
        handleCellClick(x, y);
        drawEntities();
      });
      // Hover aim
      onMouseMove(() => {
        const mouse = mousePos();
        const x = Math.floor(mouse.x / CELL_SIZE);
        const y = Math.floor(mouse.y / CELL_SIZE);
        if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) return;
        if (lastSimState.mode === 'shoot' && inRange(x, y)) {
          lastSimState.aim = { x, y };
        } else {
          lastSimState.aim = null;
        }
        drawEntities();
      });
      // Redraw on state update
      window.addEventListener('simulator-update', drawEntities);
    } else {
      // If already initialized, just update entities
      if (root._drawEntities) root._drawEntities();
    }
  }, 0);

  function inRange(x, y) {
    const dx = Math.abs(x - lastSimState.player.x);
    const dy = Math.abs(y - lastSimState.player.y);
    return dx + dy <= weapon.range;
  }

  function getOverlay(x, y) {
    if (lastSimState.aim) {
      if (x === lastSimState.aim.x && y === lastSimState.aim.y) return 'aim';
      if (weapon.splashRadius) {
        const dx = Math.abs(x - lastSimState.aim.x);
        const dy = Math.abs(y - lastSimState.aim.y);
        if (dx + dy <= weapon.splashRadius) return 'aim-splash';
      }
    }
    if (!lastSimState.shot) return null;
    if (weapon.splashRadius && lastSimState.shot) {
      const dx = Math.abs(x - lastSimState.shot.x);
      const dy = Math.abs(y - lastSimState.shot.y);
      if (dx + dy <= weapon.splashRadius) return 'splash';
    }
    if (weapon.piercing && lastSimState.shot) {
      if (x === lastSimState.player.x && y >= Math.min(lastSimState.player.y, lastSimState.shot.y) && y <= Math.max(lastSimState.player.y, lastSimState.shot.y)) return 'pierce';
      if (y === lastSimState.player.y && x >= Math.min(lastSimState.player.x, lastSimState.shot.x) && x <= Math.max(lastSimState.player.x, lastSimState.shot.x)) return 'pierce';
    }
    if (weapon.burn && lastSimState.shot && x === lastSimState.shot.x && y === lastSimState.shot.y) return 'burn';
    if (weapon.blind && lastSimState.shot && x === lastSimState.shot.x && y === lastSimState.shot.y) return 'blind';
    return null;
  }

  function handleCellClick(x, y) {
    if (lastSimState.mode === 'move-enemy') {
      lastSimState.enemy.x = x;
      lastSimState.enemy.y = y;
      lastSimState.mode = 'shoot';
      rerender();
      return;
    }
    if (!inRange(x, y)) return;
    // Set aim, do not shoot yet
    lastSimState.aim = { x, y };
    shoot();
    rerender();
  }

  function shoot() {
    if (!lastSimState.aim) return;
    const { x, y } = lastSimState.aim;
    lastSimState.shot = { x, y };
    let log = [];
    let playerHit = false;
    let enemyHit = false;
    let headshot = false;
    if (weapon.headshotChance && Math.random() < weapon.headshotChance) {
      log.push('Headshot!');
      headshot = true;
    }
    if (weapon.splashRadius) {
      log.push(`Splash occurred at (${x}, ${y}) with radius ${weapon.splashRadius}`);
      const splashCells = [];
      for (let sy = 0; sy < gridSize; sy++) {
        for (let sx = 0; sx < gridSize; sx++) {
          const dx = Math.abs(sx - x);
          const dy = Math.abs(sy - y);
          if (dx + dy <= weapon.splashRadius) splashCells.push([sx, sy]);
        }
      }
      splashCells.forEach(([sx, sy]) => {
        if (sx === lastSimState.player.x && sy === lastSimState.player.y) playerHit = true;
        if (sx === lastSimState.enemy.x && sy === lastSimState.enemy.y) enemyHit = true;
      });
    }
    if (x === lastSimState.enemy.x && y === lastSimState.enemy.y) enemyHit = true;
    if (x === lastSimState.player.x && y === lastSimState.player.y) playerHit = true;
    if (weapon.piercing) {
      log.push(`Piercing shot through up to ${weapon.piercing} enemies.`);
      if ((x === lastSimState.enemy.x && lastSimState.player.x === lastSimState.enemy.x) ||
        (y === lastSimState.enemy.y && lastSimState.player.y === lastSimState.enemy.y)) {
        enemyHit = true;
      }
    }
    if (weapon.burn) {
      log.push(`Burning for ${weapon.burn.duration} turns.`);
    }
    if (weapon.blind) {
      log.push(`Blinded for ${weapon.blind.duration} turns.`);
    }
    if (weapon.specials && weapon.specials.length > 0) {
      log.push('Specials: ' + weapon.specials.map(s => s.type).join(', '));
    }
    let damage = weapon.damage;
    if (headshot) damage *= 2;
    if (enemyHit) {
      lastSimState.enemy.health = Math.max(0, lastSimState.enemy.health - damage);
      log.push(`Enemy took ${damage} damage! (HP: ${lastSimState.enemy.health})`);
    }
    if (playerHit) {
      lastSimState.player.health = Math.max(0, lastSimState.player.health - damage);
      log.push(`Player took ${damage} damage! (HP: ${lastSimState.player.health})`);
    }
    log.forEach(msg => {
      lastSimState.log.push({ time: getTimeString(), message: msg });
    });
    if (onLog) onLog(lastSimState.log);
    lastSimState.aim = null;
    rerender();
  }

  function rerender() {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('simulator-update'));
    }
  }

  // Health bars
  function healthBar(hp, label) {
    return `<div class="mb-1 text-xs font-semibold">${label} HP: <span class="font-mono">${hp}</span></div>
      <div class="w-full h-3 bg-gray-700 rounded mb-2">
        <div class="h-3 rounded bg-green-500" style="width: ${Math.max(0, hp)}%"></div>
      </div>`;
  }

  // Log rendering
  function renderLog() {
    if (!lastSimState.log.length) return '<span class="opacity-60">No actions yet.</span>';
    return `<div style="max-height: 160px; overflow-y: auto;" id="sim-log-scroll">${lastSimState.log.map(l => `<div class='mb-1'><span class='text-xs opacity-60 mr-2'>[${l.time}]</span>${l.message}</div>`).join('')}</div>`;
  }

  setTimeout(() => {
    const logDiv = document.getElementById('sim-log-scroll');
    if (logDiv) logDiv.scrollTop = logDiv.scrollHeight;
  }, 0);

  // Move enemy button
  const moveEnemyBtn = `<button id="move-enemy-btn" class="mb-2 px-3 py-1 rounded bg-yellow-700 text-white font-semibold hover:bg-yellow-800 transition">Move Enemy</button>`;
  setTimeout(() => {
    const btn = document.getElementById('move-enemy-btn');
    if (btn) btn.onclick = () => { lastSimState.mode = 'move-enemy'; };
  }, 0);

  // Render
  return `
    <div class="px-1 md:px-0">
      <div class="flex flex-col gap-2 mb-2">
        ${healthBar(lastSimState.player.health, 'Player')}
        ${healthBar(lastSimState.enemy.health, 'Enemy')}
        ${moveEnemyBtn}
      </div>
      <div class="mb-2 font-semibold">Grid World (${gridSize}x${gridSize})</div>
      <div id="${CANVAS_ID}" style="width:${WIDTH}px;height:${HEIGHT}px;background:#222;"></div>
      <div class="mt-2 text-sm opacity-70">Blue: Player | Red: Enemy | Yellow: Aim | Pink-light: Aim Splash | Red: Shot | Pink: Splash | Yellow: Pierce/Blind | Red-dark: Burn</div>
      <div class="mt-2">${renderLog()}</div>
    </div>
  `;
} 