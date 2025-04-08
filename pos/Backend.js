const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const inventoryBackend = require('./inventoryBackend');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use inventory backend files
app.use('/api/inventory', inventoryBackend);

// Open backend on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
