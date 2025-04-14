// Backend.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const inventoryBackend = require('./inventoryBackend');
const analyticsBackend = require('./analyticsBackend');
const authRoutes = require('./auth');
const translateBackend = require('./TranslateBackend'); // Stub endpoint

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/inventory', inventoryBackend);
app.use('/api/analytics', analyticsBackend);
app.use('/api/auth', authRoutes);
app.use('/api/translate', translateBackend); // This endpoint now just returns a stub response

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
