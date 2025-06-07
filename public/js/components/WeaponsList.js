import { WeaponCard } from './WeaponCard.js';

export function WeaponsList(weapons) {
  if (!weapons.length) {
    return '<div class="text-center text-lg opacity-80">Loading weapons...</div>';
  }
  return `
    <div class="flex flex-col gap-6">
      ${weapons.map(w => `
        <div class="cursor-pointer transition transform hover:shadow-lg hover:scale-[1.02] active:scale-95" style="will-change: transform;">
          ${WeaponCard(w)}
        </div>
      `).join('')}
    </div>
  `;
} 