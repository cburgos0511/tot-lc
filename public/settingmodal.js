export function SettingsModal() {
    return `
      <div id="setting-overlay" style="position:fixed;inset:0;z-index:50;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);">
        <div style="background:#222;border-radius:10px;padding:2rem;box-shadow:0 0 20px #0008;position:relative;max-width:350px;width:90%;">
          <button id="close-setting-modal" style="position:absolute;top:10px;right:10px;font-size:2rem;background:none;border:none;color:#fff;cursor:pointer;">&times;</button>
          <h2 style="color:gold;font-size:1.5rem;margin-bottom:1rem;">Settings</h2>
          <div style="display:flex;flex-direction:column;gap:1rem;">
            <label><input type="checkbox" id="music-toggle" /> Background Music</label>
            <label><input type="checkbox" id="sfx-toggle" /> Sound Effects</label>
          </div>
        </div>
      </div>
    `;
  }
  

  export function setupSettingsModal() {
    document.getElementById('settings-button-main')?.addEventListener('click', function() {
      document.getElementById('setting-overlay').style.display = 'flex';
    });
    document.getElementById('settings-button-start')?.addEventListener('click', function() {
      document.getElementById('setting-overlay').style.display = 'flex';
    });
    document.getElementById('close-setting-modal')?.addEventListener('click', function() {
      document.getElementById('setting-overlay').style.display = 'none';
    });
    document.getElementById('setting-overlay')?.addEventListener('click', function(e) {
      if (e.target.id === 'setting-overlay') {
        document.getElementById('setting-overlay').style.display = 'none';
      }
    });
  }