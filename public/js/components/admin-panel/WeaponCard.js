export function WeaponCard(w) {
  return `
    <div class="bg-gray-700 rounded-lg p-4 flex flex-col gap-2 shadow">
      <div class="font-bold text-lg">${w.name}</div>
      <div class="text-sm opacity-80">${w.description}</div>
      <div class="text-sm">Type: <span class="text-blue-300">${w.type}</span></div>
      <div class="text-sm">Damage: <span class="text-pink-300">${w.damage}</span> | Range: <span class="text-yellow-200">${w.range}</span> | Acc: <span class="text-green-300">${Math.round(w.accuracy * 100)}%</span></div>
      <div class="text-sm">Rarity: <span class="text-yellow-400">${w.rarity}</span></div>
      ${w.piercing && w.piercing > 0 ? `<div class='text-sm'>Piercing: <span class='text-blue-400'>${w.piercing}</span></div>` : ''}
      ${w.splashRadius ? `<div class='text-sm'>Splash Radius: <span class='text-pink-400'>${w.splashRadius}</span></div>` : ''}
      ${w.headshotChance && w.headshotChance > 0 ? `<div class='text-sm'>Headshot Chance: <span class='text-purple-400'>${Math.round(w.headshotChance * 100)}%</span></div>` : ''}
      ${w.burn ? `<div class='text-sm'>Burn: <span class='text-red-400'>${w.burn.duration} turns</span></div>` : ''}
      ${w.blind ? `<div class='text-sm'>Blind: <span class='text-yellow-300'>${w.blind.duration} turns</span></div>` : ''}
      ${w.specials && w.specials.length > 0 ? `<div class='text-sm'>Specials: <span class='text-pink-400'>${w.specials.map(s => s.type.charAt(0).toUpperCase() + s.type.slice(1)).join(', ')}</span></div>` : ''}
    </div>
  `;
} 