const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import route files
const inventoryBackend = require('./inventoryBackend');
const analyticsBackend = require('./analyticsBackend');
const authRoutes = require('./auth');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/api/inventory', inventoryBackend);
app.use('/api/analytics', analyticsBackend);
app.use('/api/auth', authRoutes);

// Serve the React frontend in production
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start the server on port 3001 (or use process.env.PORT)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
