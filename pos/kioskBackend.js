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

router.get('/menu-items/toppings', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        Inventory.itemid AS id, 
        Inventory.itemname AS name, 
        Inventory.category, 
        Inventory.stock, 
        Menu.price
      FROM Inventory
      JOIN Menu ON Inventory.itemid = Menu.id
      WHERE LOWER(Menu.category) = 'toppings'
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Toppings fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch toppings' });
  }
});

// Route to get menu items by category
router.get('/menu-items/:category', async (req, res) => {
  const category = req.params.category;

  // Default query for a category
  let query = `SELECT Menu.name, Menu.id, Menu.price, Inventory.stock
              FROM Menu
              JOIN Inventory ON Menu.id = Inventory.itemid
              WHERE Menu.category = $1`;
              
  let values = [category];

  //Get top menu items
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
    query = categoryMap[category]; //get the items
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

    const fetchCategoryQuery = `SELECT category FROM Inventory WHERE itemid = $1`;

    const customerId = Math.floor(Math.random() * 1000) + 9000;

    for (const item of order) {
      // Determine the item's category
      let category = item.category;
      if (!category) {
        const catResult = await client.query(fetchCategoryQuery, [item.id]);
        category = catResult.rows[0]?.category || 'Uncategorized';
      }

      // Insert main item sale
      await client.query(insertSaleQuery, [
        item.id,
        item.name,
        category,
        parseFloat(item.basePrice ?? item.price),
        customerId,
      ]);
      await client.query(updateInventoryQuery, [item.id]);
      console.log(`Added sale for item: ${item.name}`);

      // Insert topping sales if any
      if (Array.isArray(item.toppings)) {
        for (const topping of item.toppings) {
          if (!topping.id || !topping.name || !topping.price) {
            console.warn('Skipping topping due to missing data:', topping);
            continue;
          }
      
          await client.query(insertSaleQuery, [
            parseInt(topping.id),
            topping.name,
            'Toppings',
            parseFloat(topping.price),
            customerId,
          ]);
      
          const invResult = await client.query(updateInventoryQuery, [parseInt(topping.id)]);
          console.log(`Topping inventory updated (${topping.name}) - rows affected: ${invResult.rowCount}`);
        }
      }
    }

    await client.query('COMMIT');
    res.json({ message: 'Checkout successful' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Checkout failed:', error);
    res.status(500).json({ error: 'Checkout failed' });
  } finally {
    client.release();
  }
});

module.exports = router;
