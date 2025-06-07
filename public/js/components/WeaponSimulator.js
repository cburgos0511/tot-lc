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

  function inRange(x, y) {
    const dx = Math.abs(x - lastSimState.player.x);
    const dy = Math.abs(y - lastSimState.player.y);
    return dx + dy <= weapon.range;
  }

  function getOverlay(x, y) {
    if (lastSimState.aim) {
      // Show aim marker
      if (x === lastSimState.aim.x && y === lastSimState.aim.y) return 'aim';
      // Show splash radius overlay while aiming
      if (weapon.splashRadius) {
        const dx = Math.abs(x - lastSimState.aim.x);
        const dy = Math.abs(y - lastSimState.aim.y);
        if (dx + dy <= weapon.splashRadius) return 'aim-splash';
      }
    }
    if (!lastSimState.shot) return null;
    // Splash
    if (weapon.splashRadius && lastSimState.shot) {
      const dx = Math.abs(x - lastSimState.shot.x);
      const dy = Math.abs(y - lastSimState.shot.y);
      if (dx + dy <= weapon.splashRadius) return 'splash';
    }
    // Piercing (draw a line from char to shot)
    if (weapon.piercing && lastSimState.shot) {
      if (x === lastSimState.player.x && y >= Math.min(lastSimState.player.y, lastSimState.shot.y) && y <= Math.max(lastSimState.player.y, lastSimState.shot.y)) return 'pierce';
      if (y === lastSimState.player.y && x >= Math.min(lastSimState.player.x, lastSimState.shot.x) && x <= Math.max(lastSimState.player.x, lastSimState.shot.x)) return 'pierce';
    }
    // Burn/Blind overlays
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
    rerender();
  }

  function shoot() {
    if (!lastSimState.aim) return;
    const { x, y } = lastSimState.aim;
    lastSimState.shot = { x, y };
    let log = [];
    let playerHit = false;
    let enemyHit = false;
    // Headshot
    let headshot = false;
    if (weapon.headshotChance && Math.random() < weapon.headshotChance) {
      log.push('Headshot!');
      headshot = true;
    }
    // Splash
    if (weapon.splashRadius) {
      log.push(`Splash occurred at (${x}, ${y}) with radius ${weapon.splashRadius}`);
      // Check if splash hits player or enemy
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
    // Direct hit
    if (x === lastSimState.enemy.x && y === lastSimState.enemy.y) enemyHit = true;
    if (x === lastSimState.player.x && y === lastSimState.player.y) playerHit = true;
    // Piercing
    if (weapon.piercing) {
      log.push(`Piercing shot through up to ${weapon.piercing} enemies.`);
      // If enemy is on the line
      if ((x === lastSimState.enemy.x && lastSimState.player.x === lastSimState.enemy.x) ||
        (y === lastSimState.enemy.y && lastSimState.player.y === lastSimState.enemy.y)) {
        enemyHit = true;
      }
    }
    // Burn
    if (weapon.burn) {
      log.push(`Burning for ${weapon.burn.duration} turns.`);
    }
    // Blind
    if (weapon.blind) {
      log.push(`Blinded for ${weapon.blind.duration} turns.`);
    }
    // Specials
    if (weapon.specials && weapon.specials.length > 0) {
      log.push('Specials: ' + weapon.specials.map(s => s.type).join(', '));
    }
    // Apply damage
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
    // Add log with timestamp
    log.forEach(msg => {
      lastSimState.log.push({ time: getTimeString(), message: msg });
    });
    if (onLog) onLog(lastSimState.log);
    lastSimState.aim = null;
    rerender();
  }

  function cancelAim() {
    lastSimState.aim = null;
    rerender();
  }

  function rerender() {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('simulator-update'));
    }
  }

  // Move enemy button
  let moveEnemyBtn = `<button id="move-enemy-btn" class="mb-2 px-3 py-1 rounded bg-yellow-700 text-white font-semibold hover:bg-yellow-800 transition">Move Enemy</button>`;

  // Shoot/cancel buttons
  let shootBtns = '';
  if (lastSimState.aim) {
    shootBtns = `<div class="flex gap-2 mt-2">
      <button id="shoot-btn" class="px-3 py-1 rounded bg-green-700 text-white font-semibold hover:bg-green-800 transition">Shoot</button>
      <button id="cancel-aim-btn" class="px-3 py-1 rounded bg-gray-700 text-white font-semibold hover:bg-gray-800 transition">Cancel</button>
    </div>`;
  }

  let gridHtml = '<div class="grid" style="display: grid; grid-template-columns: repeat(' + gridSize + ', 1fr); gap: 2px;">';
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let cellClass = 'bg-gray-800';
      let content = '';
      if (x === lastSimState.player.x && y === lastSimState.player.y) {
        cellClass = 'bg-blue-500';
        content = '<span class="block w-full h-full text-center text-xs text-white">P</span>';
      } else if (x === lastSimState.enemy.x && y === lastSimState.enemy.y) {
        cellClass = 'bg-red-600';
        content = '<span class="block w-full h-full text-center text-xs text-white">E</span>';
      } else if (lastSimState.shot && x === lastSimState.shot.x && y === lastSimState.shot.y) {
        cellClass = 'bg-red-500';
      } else if (inRange(x, y)) {
        cellClass = 'bg-green-600 cursor-pointer hover:bg-green-700';
      }
      // Overlays
      const overlay = getOverlay(x, y);
      if (overlay === 'aim') cellClass = 'bg-yellow-300';
      if (overlay === 'aim-splash') cellClass = 'bg-pink-200';
      if (overlay === 'splash') cellClass = 'bg-pink-400';
      if (overlay === 'pierce') cellClass = 'bg-yellow-400';
      if (overlay === 'burn') cellClass = 'bg-red-700';
      if (overlay === 'blind') cellClass = 'bg-yellow-200';
      gridHtml += `<div class="w-6 h-6 ${cellClass} border border-gray-700 flex items-center justify-center" data-x="${x}" data-y="${y}">${content}</div>`;
    }
  }
  gridHtml += '</div>';

  // Attach click handler after render
  setTimeout(() => {
    document.querySelectorAll('.grid [data-x][data-y]').forEach(cell => {
      const x = parseInt(cell.getAttribute('data-x'));
      const y = parseInt(cell.getAttribute('data-y'));
      cell.onclick = () => handleCellClick(x, y);
    });
    const btn = document.getElementById('move-enemy-btn');
    if (btn) btn.onclick = () => { lastSimState.mode = 'move-enemy'; };
    const shootBtn = document.getElementById('shoot-btn');
    if (shootBtn) shootBtn.onclick = shoot;
    const cancelBtn = document.getElementById('cancel-aim-btn');
    if (cancelBtn) cancelBtn.onclick = cancelAim;
  }, 0);

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

  return `
    <div>
      <div class="flex flex-col gap-2 mb-2">
        ${healthBar(lastSimState.player.health, 'Player')}
        ${healthBar(lastSimState.enemy.health, 'Enemy')}
        ${moveEnemyBtn}
      </div>
      <div class="mb-2 font-semibold">Grid World (${gridSize}x${gridSize})</div>
      ${gridHtml}
      ${shootBtns}
      <div class="mt-2 text-sm opacity-70">Blue: Player | Red: Enemy | Green: In Range | Yellow: Aim | <span class='bg-pink-200 px-1 rounded'>Pink-light: Aim Splash</span> | Red: Shot | Pink: Splash | Yellow: Pierce/Blind | Red-dark: Burn</div>
      <div class="mt-2">${renderLog()}</div>
    </div>
  `;
} 