const db = require('../config/db');
const util = require('util');

const run = util.promisify(db.run).bind(db);
const all = util.promisify(db.all).bind(db);

class Emergency {
    // Enregistre une nouvelle alerte d'urgence
    static async create({ userId, location, type, healthData, timestamp }) {
        if (!userId || !location) throw new Error('userId ou localisation manquant');
        const result = await run(
            `INSERT INTO emergency (userId, location, type, healthData, timestamp)
             VALUES (?, ?, ?, ?, ?)`,
            [
                userId,
                location,
                type || 'inconnue',
                healthData ? JSON.stringify(healthData) : null,
                timestamp || new Date().toISOString()
            ]
        );
        return { id: result.lastID };
    }

    // Récupère l'historique des alertes d'un utilisateur
    static async history(userId) {
        if (!userId) throw new Error('userId manquant');
        const rows = await all(
            `SELECT * FROM emergency WHERE userId = ? ORDER BY timestamp DESC`,
            [userId]
        );
        // Parse healthData JSON si présent
        return rows.map(row => ({
            ...row,
            healthData: row.healthData ? JSON.parse(row.healthData) : null
        }));
    }
}

module.exports = Emergency;