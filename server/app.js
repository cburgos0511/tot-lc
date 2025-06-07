/* global process */
// Import the Express framework for building the web server
import express from 'express';

// Import Node's path module for handling and transforming file paths
import path from 'path';

// Import fileURLToPath from 'url' to convert import.meta.url to a file path
import { fileURLToPath } from 'url';

// Import modular routers
import charactersRouter from './routes/characters.js';
import weaponsRouter from './routes/weapons.js';
import serversRouter from './routes/servers.js';
import layoutsRouter from './routes/layouts.js';
import adminPanelRouter from './routes/adminPanel.js';

// Create an instance of an Express application
const app = express();

// Set the port for the server to listen on. Use the environment variable PORT if available, otherwise default to 3000.
const PORT = process.env.PORT || 3000;

// Get the current file's absolute path (since __filename is not available in ES modules)
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module file (since __dirname is not available in ES modules)
const __dirname = path.dirname(__filename);

// Serve static files (HTML, CSS, JS, images, etc.) from the 'public' directory
// This allows users to access files in 'public' directly via the browser
app.use(express.static(path.join(__dirname, '../public')));

// Define a simple API route for health checks
// When a GET request is made to '/api/health', respond with a JSON object indicating status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is healthy',
    time: new Date().toLocaleString()
  });
});

// Mount API routers
app.use('/api/characters', charactersRouter);
app.use('/api/weapons', weaponsRouter);
app.use('/api/servers', serversRouter);
app.use('/api/layouts', layoutsRouter);
app.use('/admin-panel', adminPanelRouter);

// Start the server and have it listen on the specified port
// When the server starts, log a message to the console with the URL
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 