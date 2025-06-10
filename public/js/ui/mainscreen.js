export function mainScreenui() {
    const container = document.getElementById("main-screen");
    container.innerHTML = `  <div
        class="fixed inset-0 -z-10 bg-[url('https://webres-atmoph.global.ssl.fastly.net/assets/images/thumbnails/starwars_hero.jpeg')] bg-cover bg-center animate-brightnessPulse pointer-events-none"
      ></div>

      <div
        class="text-center px-4 md:px-16 lg:px-32 xl:px-64 2xl:px-96 py-8 md:py-16 space-y-10"
      >
        <h1
          class="text-6xl md:text-7xl font-orbitron tracking-wider animate-possessed bg-gradient-to-r from-blue-600 via-red-500 to-purple-700 text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(0,0,0,1)] select-none cursor-default -mt-32 mb-10"
        >
        Galactic Defense
        </h1>

        <p
          class="mb-12 bg-gradient-to-r from-blue-600 via-red-500 to-purple-700 bg-clip-text text-transparent animate-wavy text-lg md:text-xl"
        >
          Travel the galaxy, solve puzzels, fight the empire!
        </p>
        <div class="flex items-center justify-center gap-8 mb-12">
          <button
            id="start-btn"
            class="bg-gradient-to-b from-purple-700 to-red-900
            text-white
            font-black text-lg uppercase px-8 py-3 rounded-md border-4 border-blue-800 animate-glowPulse 
            hover:bg-gradient-to-b from-purple-600 to-red-800 hover:scale-105 active:scale-95
            transition-transform transition-colors duration-200 ease-in-out select-none cursor-pointer tracking-wider font-serif mb-4
            "
          >
            Start Game
          </button>

          <button
            id="settings-button-main"
            class= "bg-gradient-to-b from-purple-700 to-red-900
            text-white
            font-black text-lg uppercase px-8 py-3 rounded-md border-4 border-blue-800 animate-glowPulse 
            hover:bg-gradient-to-b from-purple-600 to-red-800 hover:scale-105 active:scale-95
            transition-transform transition-colors duration-200 ease-in-out select-none cursor-pointer tracking-wider font-serif mb-4
            "
          >
            ⚙️ Setting
          </button>
        </div>
        <div class="flex items-center justify-center mt-12">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer" />
            <div
              class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-purple-600 peer-focus:ring-4 peer-focus:ring-purple-300 dark:bg-gray-700 dark:peer-checked:bg-purple-500 transition-colors duration-300"
            ></div>
            <div
              class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow-md peer-checked:translate-x-full peer-checked:border-purple-600 transition-transform duration-300"
            ></div>
          </label>
          <span class="ml-3 text-yellow-100 font-orbitron select-none"
            >Dark Mode</span
          >
        </div>
      </div>
    
    `;
};
