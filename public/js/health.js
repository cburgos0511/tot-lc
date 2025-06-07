// health.js

document.getElementById('fetch-health')?.addEventListener('click', async () => {
  const res = await fetch('/api/health');
  const data = await res.json();
  const pre = document.getElementById('api-response');
  pre.textContent = JSON.stringify(data, null, 2);
  pre.classList.remove('hidden');
}); 