const path = require('path');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// Utilise DB_PATH depuis .env ou fallback sur ./database.sqlite
const dbPath = process.env.DB_PATH
  ? path.resolve(__dirname, process.env.DB_PATH)
  : path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erreur de connexion à SQLite:', err.message, '\nChemin utilisé :', dbPath);
  } else {
    console.log('✅ Connecté à la base de données SQLite :', dbPath);
  }
});

module.exports = db;