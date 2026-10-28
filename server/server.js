import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Newpass!',
  database: process.env.DB_NAME || 'titus_library',
  waitForConnections: true, connectionLimit: 10
});
const allowed = new Set(['books', 'users', 'transactions']);
app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true, database: 'connected' }); }
  catch (e) { res.status(500).json({ ok: false, error: 'Database connection failed' }); }
});
app.get('/api/:collection', async (req, res) => {
  const { collection } = req.params;
  if (!allowed.has(collection)) return res.status(404).json({ error: 'Unknown collection' });
  try {
    const [rows] = await pool.execute('SELECT data_value FROM app_data WHERE data_key = ?', [collection]);
    res.json(rows.length ? rows[0].data_value : []);
  } catch (e) { console.error(e); res.status(500).json({ error: 'Could not read data' }); }
});
app.put('/api/:collection', async (req, res) => {
  const { collection } = req.params;
  if (!allowed.has(collection)) return res.status(404).json({ error: 'Unknown collection' });
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Request body must be an array' });
  try {
    await pool.execute('INSERT INTO app_data (data_key, data_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE data_value = VALUES(data_value)', [collection, JSON.stringify(req.body)]);
    res.json({ ok: true, count: req.body.length });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Could not save data' }); }
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Library API running at http://localhost:${port}`));
