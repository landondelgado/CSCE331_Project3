const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const pool = new Pool({
  user: 'team_74',
  host: 'csce-315-db.engr.tamu.edu',
  database: 'team_74_db',
  password: 'alka',
  port: 5432,
});



router.post('/google-login', async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query(
      'SELECT username, ismanager FROM Users WHERE username = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    const user = result.rows[0];
    res.json({ username: user.username, isManager: user.ismanager });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
