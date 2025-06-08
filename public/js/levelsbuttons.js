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


document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("button-container");
  container.innerHTML = generateLevelButtonsHTML(); // inject the HTML
});
