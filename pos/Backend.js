const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const inventoryBackend = require('./inventoryBackend');
const kioskBackend = require('./kioskBackend');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use inventory backend files
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/inventory', inventoryBackend);
app.use('/api/menupos', kioskBackend);
const authRoutes = require('./auth'); // if saved in auth.js
app.use('/api/auth', authRoutes);

// Serve frontend in production
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Open backend on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});