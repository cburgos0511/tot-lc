# Tower of Trials: Combat Mode

Welcome to **Tower of Trials: Combat Mode**!

This project is a web-based game where players ascend a mysterious tower, battling enemies on each floor. The goal is to reach the top by overcoming increasingly difficult combat challenges. The stack is modern, with a clear separation between backend (API/server) and frontend (UI/static assets).

---

## Project Structure

```
.
├── public/                  # Static frontend assets (HTML, JS, CSS, images)
│   ├── index.html           # Main HTML entry point for the game
│   ├── admin-panel.html     # Admin panel UI
│   ├── input.css            # TailwindCSS input file
│   ├── dist/                # (output.css is generated here by Tailwind)
│   ├── images/              # Game images and assets
│   │   └── weapons/         # Weapon images
│   └── js/                  # Frontend JavaScript
│       ├── main.js          # Main entry point for game logic
│       ├── start.js         # Start screen and countdown logic
│       ├── health.js        # Health check logic
│       ├── setting.js       # Settings overlay logic
│       ├── admin-panel.js   # Admin panel logic
│       └── components/      # Reusable UI components (modals, buttons, overlays, etc.)
│           ├── WeaponSimulator.js
│           ├── WeaponsList.js
│           ├── WeaponCard.js
│           ├── TabBar.js
│           └── SortBar.js
├── server/                  # Node.js backend (Express API)
│   ├── app.js               # Main Express server file
│   ├── controllers/         # Route controllers
│   ├── models/              # Data models
│   ├── routes/              # API route modules
│   ├── services/            # Business logic/services
│   ├── utils/               # Utility functions/helpers
│   └── config/              # Configuration files
├── models/                  # (Empty or legacy, see server/models for backend models)
├── routes/                  # (Empty or legacy, see server/routes for backend routes)
├── .gitignore               # Git ignore rules
├── .prettierrc              # Prettier code formatting config
├── eslint.config.mjs        # ESLint config for code linting
├── package.json             # Project metadata, scripts, dependencies
├── postcss.config.js        # PostCSS config for TailwindCSS
├── tailwind.config.js       # TailwindCSS config
└── README.md                # This file
```

- **Frontend:** All static assets, HTML, JS, CSS, and images are in `public/`.
  - UI is modularized in `public/js/components/` for maintainability.
  - Admin panel has its own HTML and JS entry points.
- **Backend:** All server logic, API routes, models, and utilities are in `server/`.
- **Legacy/Empty:** Top-level `models/` and `routes/` are placeholders; use `server/models/` and `server/routes/` for backend code.

---

## Tech Stack & Tooling

- **Backend:** Node.js + Express (API server, serves static files)
- **Frontend:** Vanilla JavaScript, HTML, TailwindCSS (utility-first CSS)
- **Build Tools:** TailwindCSS, PostCSS, Autoprefixer
- **Dev Experience:** ESLint (linting), Prettier (formatting), Nodemon (hot reload)
- **Scripts:** See below for all-in-one and dev commands

---

## How It Works

### Backend (`server/app.js`)

- Uses Express to serve static files from `public/`.
- Provides a health check endpoint at `/api/health`.
- Uses ES module syntax and handles Node.js quirks for file paths.
- Listens on port `3000` (or `process.env.PORT`).

### Frontend (`public/`)

- `index.html` is the main entry point, styled with TailwindCSS.
- `input.css` is the source for Tailwind; output is generated to `public/dist/output.css`.
- JavaScript for the UI is loaded via `<script src="/main.js"></script>` (add your logic here).

### Configuration

- **ESLint:** Enforces code quality for JavaScript.
- **Prettier:** Ensures consistent code formatting.
- **TailwindCSS:** Utility-first CSS framework, configured to scan `public/` for classes.
- **PostCSS:** Processes Tailwind and autoprefixer plugins.

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/cburgos0511/tot-lc.git
cd tower-trial
```

### 2. One-step setup (recommended)

This will install dependencies, build CSS, and start the server:

```sh
npm run setup
```

### 3. For development (hot reloading)

- Automatically restarts the server on changes:
  ```sh
  npm run dev
  ```
- Rebuild Tailwind CSS if you change `input.css`:
  ```sh
  npm run build:css
  ```

### 4. Open the app

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `npm run setup`     | Install, build CSS, and start the server       |
| `npm run dev`       | Start server with hot reloading (nodemon)      |
| `npm start`         | Start server (no hot reload)                   |
| `npm run build:css` | Build Tailwind CSS to `public/dist/output.css` |

---

## Development Notes

- **Backend code** lives in `server/`. Add new API routes or logic there.
- **Frontend code** lives in `public/`. Add new JS or HTML as needed.
- **Models** and **routes** folders are placeholders for future expansion.
- **Linting/formatting**: Run ESLint and Prettier as needed for code quality.

---

## Frontend Componentization & Organization

To keep the codebase scalable and maintainable, follow these best practices for the frontend:

### 1. Componentize the UI

- **Move Modals to Separate Files:**
  - Place modal HTML and logic in dedicated JS files (e.g., `public/js/components/SettingsModal.js`).
  - Export a function that returns the modal's HTML or DOM element.
  - Inject the modal into the DOM from your main script.
  - Keep open/close logic in the same file or a related controller.
- **Generate Level Buttons Dynamically:**
  - Use a JS array and loop to generate level buttons instead of hardcoding them in HTML.
  - Place this logic in a component file (e.g., `public/js/components/LevelButtons.js`).
- **Generalize Other Repeated UI Elements:**
  - Move overlays, toggles, and other repeated UI to their own JS modules or template files.

### 2. Folder Structure Recommendations

**Suggested Structure:**

```
tower-trial/
  models/                # Data models (if backend)
  public/
    js/
      components/        # Reusable UI components (modals, buttons, overlays)
      utils/             # Utility/helper functions
      main.js            # Main entry point for client logic
      start.js           # Start screen logic
      health.js          # Health check logic
      setting.js         # Settings logic
    css/                 # Custom CSS (if any, aside from Tailwind)
    assets/              # Images, fonts, etc.
    index.html           # Main HTML file (now much cleaner)
  routes/                # API or server routes
  server/                # Server logic
  README.md
  ...
```

- **Separation of concerns:** UI, logic, and assets are clearly separated.
- **Scalability:** Easy to add new components or utilities.
- **Maintainability:** Each file has a single responsibility.

### 3. How to Add a New UI Component

1. Create a new file in `public/js/components/`, e.g., `MyComponent.js`.
2. Export a function that returns the component's HTML or DOM node.
3. Import and use this function in your main script or wherever needed.
4. Keep all event listeners and logic related to the component in the same file or a related controller.

### 4. How to Generate Dynamic UI

- Use arrays and loops in JS to generate repeated elements (e.g., level buttons).
- Inject generated HTML into the DOM using `innerHTML` or DOM methods.
- Keep your `index.html` minimal—just a root container and script imports.

### 5. Summary of Steps to Clean Up index.html

- Move all modals and overlays to JS component files.
- Generate repeated UI (like level buttons) dynamically from JS.
- Keep only the root containers and script imports in `index.html`.
- Organize JS files into `components/` and `utils/` for clarity.
- Update the README to reflect the new structure and provide onboarding instructions.

---

## Server Folder Structure

The `server/` directory is organized to follow best practices for scalable and maintainable Node.js applications. Here's a breakdown of each main folder:

- **controllers/**: Handle incoming requests, process input, and return responses. Controllers act as the bridge between routes and business logic (services).
- **models/**: Define the data structures and schemas for the application. In a real app, these would map to database collections/tables.
- **routes/**: Define the API endpoints and route incoming HTTP requests to the appropriate controller functions.
- **services/**: Contain the core business logic of the application. Services are called by controllers to perform operations, calculations, or data manipulation.
- **utils/**: Utility functions and helpers used throughout the server codebase. This can include database connection logic, formatting helpers, etc.
- **config/**: Configuration files for environment variables, database settings, and other app-wide config.

This structure makes it easy to scale, refactor, and onboard new developers.

---

Enjoy climbing the Tower of Trials!  
Feel free to contribute or open issues on GitHub.
