export function WeaponCard(w) {
  return `
    <div class="bg-gray-700 rounded-lg p-4 flex flex-col gap-2 shadow">
      <div class="font-bold text-lg">${w.name}</div>
      <div class="text-sm opacity-80">${w.description}</div>
      <div class="text-sm">Type: <span class="text-blue-300">${w.type}</span></div>
      <div class="text-sm">Damage: <span class="text-pink-300">${w.damage}</span> | Range: <span class="text-yellow-200">${w.range}</span> | Acc: <span class="text-green-300">${Math.round(w.accuracy * 100)}%</span></div>
      <div class="text-sm">Rarity: <span class="text-yellow-400">${w.rarity}</span></div>
      <div class="text-sm">Special: <span class="text-pink-400">${w.specialAbility || '-'}</span></div>
    </div>
  `;
} 