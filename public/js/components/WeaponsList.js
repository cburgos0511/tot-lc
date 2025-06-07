import { WeaponCard } from './WeaponCard.js';

export function WeaponsList(weapons) {
  if (!weapons.length) {
    return '<div class="text-center text-lg opacity-80">Loading weapons...</div>';
  }
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${weapons.map(WeaponCard).join('')}
    </div>
  `;
} 