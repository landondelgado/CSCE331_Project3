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

// Route to get menu items by category
router.get('/menu-items/:category', async (req, res) => {
  const category = req.params.category;

  // Default query for a category
  let query = 'SELECT name, id, price FROM Menu WHERE category = $1';
  let values = [category];

  // Special case mappings
  const categoryMap = {
    "TOP ORDER": `SELECT itemname AS name, itemid AS id, saleprice AS price, COUNT(*) AS sales 
                  FROM Sales GROUP BY itemname, itemid, saleprice 
                  ORDER BY sales DESC LIMIT 1`,
    "2nd TOP ORDER": `SELECT itemname AS name, itemid AS id, saleprice AS price, COUNT(*) AS sales 
                      FROM Sales GROUP BY itemname, itemid, saleprice 
                      ORDER BY sales DESC LIMIT 1 OFFSET 1`,
    "3rd TOP ORDER": `SELECT itemname AS name, itemid AS id, saleprice AS price, COUNT(*) AS sales 
                      FROM Sales GROUP BY itemname, itemid, saleprice 
                      ORDER BY sales DESC LIMIT 1 OFFSET 2`,
    "4th TOP ORDER": `SELECT itemname AS name, itemid AS id, saleprice AS price, COUNT(*) AS sales 
                      FROM Sales GROUP BY itemname, itemid, saleprice 
                      ORDER BY sales DESC LIMIT 1 OFFSET 3`,
  };

  if (categoryMap[category]) {
    query = categoryMap[category];
    values = []; // not using $1 placeholders
  }

  try {
    console.log(`Querying: ${query} with values:`, values);
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/checkout', async (req, res) => {
  const order = req.body.order;

  if (!order || order.length === 0) {
    return res.status(400).json({ error: 'Order is empty' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertSaleQuery = `
      INSERT INTO Sales (itemid, itemname, category, saleprice, saledate, saletime, customerid)
      VALUES ($1, $2, $3, $4, CURRENT_DATE, CURRENT_TIME, $5)
    `;
    const updateInventoryQuery = `
      UPDATE Inventory SET stock = stock - 1 WHERE itemid = $1
    `;

    const customerId = Math.floor(Math.random() * 1000) + 9000;

    for (const item of order) {
      await client.query(insertSaleQuery, [
        item.id,
        item.name,
        item.category,
        item.price,
        customerId,
      ]);

      await client.query(updateInventoryQuery, [item.id]);

      console.log(`Checked out item: ${item.name}`);
    }

    await client.query('COMMIT');
    res.json({ message: 'Checkout successful' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Checkout failed' });
  } finally {
    client.release();
  }
});
module.exports = router;
