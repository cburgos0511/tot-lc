# Tower of Trials: Combat Mode

Welcome to **Tower of Trials: Combat Mode**!

This project is a web-based game where players ascend a mysterious tower, battling enemies on each floor. The goal is to reach the top by overcoming increasingly difficult combat challenges. The stack is modern, with a clear separation between backend (API/server) and frontend (UI/static assets).

---

## Project Structure

```
.
├── public/           # Static frontend assets (HTML, JS, CSS)
│   ├── index.html    # Main HTML entry point
│   ├── input.css     # TailwindCSS input file
│   └── ...           # (output.css is generated here)
├── server/           # Node.js backend (Express API)
│   └── app.js        # Main Express server file
├── models/           # (Placeholder for future data models)
├── routes/           # (Placeholder for future route modules)
├── .gitignore        # Git ignore rules
├── .prettierrc       # Prettier code formatting config
├── eslint.config.mjs # ESLint config for code linting
├── package.json      # Project metadata, scripts, dependencies
├── postcss.config.js # PostCSS config for TailwindCSS
├── tailwind.config.js# TailwindCSS config
└── README.md         # This file
```

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

Enjoy climbing the Tower of Trials!  
Feel free to contribute or open issues on GitHub.
