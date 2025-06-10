export function startScreenui() {
    const container = document.getElementById("start-screen");

    container.innerHTML = `<div class="fixed top-4 right-4 z-50">
        <button
          id="settings-button-start"
          class="text-2xl p-2 bg-white rounded-full shadow hover:bg-gray-200"
        >
          ⚙️
        </button>
      </div>

      <div
        class="w-full h-full bg-cover bg-center bg-no-repeat relative"
        style="
          background-image: url('https://external-preview.redd.it/y_YdHJBLaUlgNnIqvscJYAtTnN3ywXT4U4kn9uLSnr4.jpg?auto=webp&s=7bdcbf7a7be0a1577e0c708e6cb78af24e7f5ee0');
        "
      >
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>

        <div class="relative z-10 p-6 max-w-4xl mx-auto pt-10">
          <h1 class="text-white text-3xl font-bold mb-6 text-center">Levels</h1>
          <div id="button-container" class="grid grid-cols-5 gap-4">
          </div>
        </div>
      </div>`;
};