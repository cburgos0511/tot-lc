// This function shows one screen and hides all others.
// It takes the id of the screen to show, and a function that returns the HTML for that screen.
export function ScreenManager(screenId, renderScreen) {
  // 1. Hide all elements with the class 'app-screen'
  const allScreens = document.querySelectorAll('.app-screen');
  allScreens.forEach((screen) => {
    screen.style.display = 'none';
  });

  // 2. Find the screen we want to show by its id
  const screenToShow = document.getElementById(screenId);
  if (screenToShow) {
    // 3. Show this screen
    screenToShow.style.display = 'block';
    // 4. If a render function is provided, set the screen's HTML
    if (renderScreen) {
      screenToShow.innerHTML = renderScreen();
    }
  }
}
