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

// Get analytics data
router.get('/category-summary', async (req, res) => {
  const sql = `
    WITH categorytot AS (
      SELECT category, COUNT(*) AS totcnt, SUM(saleprice) AS salecnt
      FROM Sales
      GROUP BY category
    ),
    mostpplr AS (
      SELECT category, itemname, COUNT(*) AS itemcnt,
             ROW_NUMBER() OVER (PARTITION BY category ORDER BY COUNT(*) DESC) AS rn
      FROM Sales
      GROUP BY category, itemname
    )
    SELECT cs.category,
           cs.totcnt AS "Sales Qty",
           cs.salecnt AS "Sales",
           mp.itemname AS "Top Seller",
           (mp.itemcnt::numeric / cs.totcnt * 100) AS "Top Seller %Sales"
    FROM categorytot cs
    JOIN mostpplr mp ON cs.category = mp.category
    WHERE mp.rn = 1;
  `;
  try {
    const result = await pool.query(sql);
    console.log("Category Summary Result:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("Error loading category summary:", err);
    res.status(500).json({ error: "Failed to load category summary" });
  }
});

// Gets product usage
router.get('/product-usage', async (req, res) => {
  const { start, end } = req.query;
  if (!start || !end) {
    return res.status(400).json({ error: "Both start and end query parameters are required" });
  }
  
  // Cast saledate to timestamp 
  const sql = `
    WITH item_counts AS (
      SELECT itemname, COUNT(*) AS item_sold
      FROM Sales
      WHERE (saledate::timestamp + saletime) BETWEEN $1 AND $2
      GROUP BY itemname
    ),
    ingredient_totals AS (
      SELECT i.ingredient_name, SUM(ic.item_sold * i.quantity) AS total_used, i.unit
      FROM item_counts ic
      JOIN Ingredients i ON i.menu_item_name = ic.itemname
      GROUP BY i.ingredient_name, i.unit
    )
    SELECT ingredient_name, total_used, unit
    FROM ingredient_totals
    ORDER BY total_used DESC;
  `;
  
  try {
    const result = await pool.query(sql, [start, end]);
    console.log("Product Usage Result:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("Error loading product usage data:", err);
    res.status(500).json({ error: "Failed to load product usage data" });
  }
});

// Get hourly sales
router.get('/hourly-sales', async (req, res) => {
  const sql = `
    SELECT hrs.hour,
           COALESCE(sales_data.sales_count, 0) AS sales_count,
           COALESCE(sales_data.total_revenue, 0) AS total_revenue
    FROM (SELECT generate_series(11, 23) AS hour) hrs
    LEFT JOIN (
        SELECT EXTRACT(HOUR FROM saletime)::int AS hour,
               COUNT(*) AS sales_count,
               SUM(saleprice) AS total_revenue
        FROM Sales
        WHERE saledate = CURRENT_DATE
        GROUP BY EXTRACT(HOUR FROM saletime)
    ) sales_data ON hrs.hour = sales_data.hour
    ORDER BY hrs.hour;
  `;
  
  try {
    const result = await pool.query(sql);
    console.log("Hourly Sales Result:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("Error loading hourly sales data:", err);
    res.status(500).json({ error: "Failed to load hourly sales data" });
  }
});

module.exports = router;
