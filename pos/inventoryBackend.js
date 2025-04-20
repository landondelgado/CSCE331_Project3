const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
  user: 'team_74',
  host: 'csce-315-db.engr.tamu.edu',
  database: 'team_74_db',
  password: 'alka',
  port: 5432,
});

// Get inventory data
router.get('/', async (req, res) => {
  try {
    const query = `
      WITH WeeklyUsage AS (
        SELECT i.category, COUNT(s.itemid) AS weekly_usage
        FROM Sales s
        JOIN Inventory i ON s.itemid = i.itemid
        WHERE s.saledate >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY i.category
      ),
      LowStockItems AS (
        SELECT category, itemname
        FROM Inventory
        WHERE stock < 10
      )
      SELECT 
        i.category AS "category",
        SUM(i.stock) AS "stock",
        wu.weekly_usage AS "previousUsage",
        COALESCE(STRING_AGG(DISTINCT ls.itemname, ', '), 'None') AS "lowStockItems"
      FROM Inventory i
      LEFT JOIN WeeklyUsage wu ON i.category = wu.category
      LEFT JOIN LowStockItems ls ON i.category = ls.category
      GROUP BY i.category, wu.weekly_usage
      ORDER BY i.category;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error loading inventory:', err);
    res.status(500).json({ error: 'Failed to load inventory' });
  }
});

// Add stock
router.post('/add-stock', async (req, res) => {
  const { item, amount } = req.body;
  try {
    const result = await pool.query(
      'UPDATE Inventory SET stock = stock + $1 WHERE itemname = $2 RETURNING *',
      [amount, item]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Stock updated successfully', updated: result.rows[0] });
  } catch (err) {
    console.error('Error adding stock:', err);
    res.status(500).json({ error: 'Failed to add stock' });
  }
});

// Create item
router.post('/create-item', async (req, res) => {
  const { itemId, itemName, category, price } = req.body;
  try {
    const menuCheck = await pool.query('SELECT * FROM Menu WHERE id = $1 OR name = $2', [itemId, itemName]);
    if (menuCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Item ID or name already exists' });
    }

    await pool.query('INSERT INTO Menu (id, name, category, price) VALUES ($1, $2, $3, $4)', [itemId, itemName, category, price]);
    await pool.query('INSERT INTO Inventory (stock, itemid, itemname, category) VALUES (0, $1, $2, $3)', [itemId, itemName, category]);

    res.json({ message: 'Item created successfully' });
  } catch (err) {
    console.error('Error creating item:', err);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Lookup item by id and name
router.post('/check-item', async (req, res) => {
  const { itemId, itemName } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM Menu WHERE id = $1 AND name = $2',
      [itemId, itemName]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error checking item:', err);
    res.status(500).json({ error: 'Failed to check item' });
  }
});

// Edit item
router.put('/edit-item', async (req, res) => {
  const { oldItemId, newItemId, newName, newCategory, newPrice } = req.body;
  try {
    await pool.query('UPDATE Menu SET id = $1, name = $2, category = $3, price = $4 WHERE id = $5',
      [newItemId, newName, newCategory, newPrice, oldItemId]
    );
    await pool.query('UPDATE Inventory SET itemid = $1, itemname = $2, category = $3 WHERE itemid = $4',
      [newItemId, newName, newCategory, oldItemId]
    );
    res.json({ message: 'Item updated successfully' });
  } catch (err) {
    console.error('Error editing item:', err);
    res.status(500).json({ error: 'Failed to edit item' });
  }
});

// Delete item
router.delete('/delete-item', async (req, res) => {
  const { itemName } = req.body;
  try {
    await pool.query('DELETE FROM Inventory WHERE itemname = $1', [itemName]);
    const result = await pool.query('DELETE FROM Menu WHERE name = $1', [itemName]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Item not found in menu' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Add a new user
router.post('/add-user', async (req, res) => {
  const { email, isManager } = req.body;
  try {
    const check = await pool.query('SELECT * FROM Users WHERE username = $1', [email]);
    if (check.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    await pool.query('INSERT INTO Users (username, ismanager) VALUES ($1, $2)', [email, isManager]);
    res.json({ message: 'User added successfully' });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Edit an existing user
router.put('/edit-user', async (req, res) => {
  const { oldEmail, newEmail, isManager } = req.body;
  try {
    const check = await pool.query('SELECT * FROM Users WHERE username = $1', [oldEmail]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    await pool.query(
      'UPDATE Users SET username = $1, ismanager = $2 WHERE username = $3',
      [newEmail, isManager, oldEmail]
    );

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error editing user:', err);
    res.status(500).json({ error: 'Failed to edit user' });
  }
});

// Remove a user
router.delete('/remove-user', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query('DELETE FROM Users WHERE username = $1', [email]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User removed successfully' });
  } catch (err) {
    console.error('Error removing user:', err);
    res.status(500).json({ error: 'Failed to remove user' });
  }
});

module.exports = router;