// main.js
// Main entry for client-side logic. This file contains the developer tools slide-out panel for testing game data.

// DEV-ONLY: Floating button and dev tools slide-out
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  const adminBtn = document.createElement('a');
  adminBtn.textContent = '🛠️ Admin Panel';
  adminBtn.href = '/admin-panel';
  adminBtn.style.position = 'fixed';
  adminBtn.style.bottom = '24px';
  adminBtn.style.right = '24px';
  adminBtn.style.zIndex = '1000';
  adminBtn.style.background = 'linear-gradient(90deg, #6366f1, #a21caf)';
  adminBtn.style.color = 'white';
  adminBtn.style.padding = '12px 20px';
  adminBtn.style.borderRadius = '9999px';
  adminBtn.style.boxShadow = '0 2px 12px rgba(0,0,0,0.2)';
  adminBtn.style.fontWeight = 'bold';
  adminBtn.style.fontSize = '1rem';
  adminBtn.style.border = 'none';
  adminBtn.style.cursor = 'pointer';
  adminBtn.style.opacity = '0.85';
  adminBtn.style.transition = 'opacity 0.2s';
  adminBtn.onmouseenter = () => (adminBtn.style.opacity = '1');
  adminBtn.onmouseleave = () => (adminBtn.style.opacity = '0.85');
  document.body.appendChild(adminBtn);
} 