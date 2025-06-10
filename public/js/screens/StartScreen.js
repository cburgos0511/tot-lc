// Generates the HTML for the level buttons
function generateLevelButtonsHTML(level = 20) {
  let buttonsHTML = '';
  for (let i = 0; i < level; i++) {
    buttonsHTML += `
      <button
        class="bg-gradient-to-br from-yellow-900 via-tan-900 to-black text-yellow-300 rounded-lg px-4 py-4 w-16 h-16 text-xl font-semibold shadow-[0_0_15px_rgba(200,150,50,0.8)] border-4 border-yellow-800 hover:from-purple-800 hover:via-indigo-800 hover:to-black hover:text-yellow-400 hover:shadow-[0_0_30px_rgba(250,200,50,1)] transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-500 font-gothic tracking-wider select-none"
      >
        ${i + 1}
      </button>
    `;
  }
  return buttonsHTML;
}

// This function returns the HTML for the start screen of the app.
export function StartScreen() {
  // The HTML for the start screen, including all styles and elements.
  return `
    <div class="fixed top-4 right-4 z-50">
      <button
        id="settings-button-start"
        class="text-2xl p-2 bg-white rounded-full shadow hover:bg-gray-200"
      >
        ⚙️
      </button>
    </div>

    <div
      class="w-full w-screen h-screen min-h-screen bg-cover bg-center bg-no-repeat relative"
      style="
        background-image: url('https://external-preview.redd.it/y_YdHJBLaUlgNnIqvscJYAtTnN3ywXT4U4kn9uLSnr4.jpg?auto=webp&s=7bdcbf7a7be0a1577e0c708e6cb78af24e7f5ee0');
      "
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>

      <div class="relative z-10 p-6 max-w-4xl mx-auto pt-10">
        <h1 class="text-white text-3xl font-bold mb-6 text-center">Levels</h1>
        <div id="button-container" class="grid grid-cols-5 gap-4">
          ${generateLevelButtonsHTML()}

          <button
  id="traits-button"
  class="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 text-lg font-orbitron font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl shadow-md hover:from-indigo-500 hover:to-purple-600 hover:shadow-lg transition duration-300 ease-in-out animate-brightnessPulse z-50"
>
  Choose Character Traits
</button>

        </div>
      </div>
    </div>
  `;
}
