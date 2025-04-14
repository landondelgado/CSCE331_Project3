// TranslateBackend.js
const express = require('express');
const router = express.Router();

// Stub endpoint: translation is handled on the client side.
router.post('/', (req, res) => {
  res.json({ message: 'Translation is handled client-side by the Google Translate widget.' });
});

module.exports = router;
