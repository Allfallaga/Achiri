const db = require('../config/db');
const util = require('util');

const run = util.promisify(db.run).bind(db);
const all = util.promisify(db.all).bind(db);
const get = util.promisify(db.get).bind(db);

class Health {
    // Enregistre une nouvelle donnée santé
    static async create({ userId, heartRate, bloodPressure, glucose, activity, timestamp }) {
        if (!userId) throw new Error('userId manquant');
        const result = await run(
            `INSERT INTO health (userId, heartRate, bloodPressure, glucose, activity, timestamp)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                userId,
                heartRate || null,
                bloodPressure || null,
                glucose || null,
                activity || null,
                timestamp || new Date().toISOString()
            ]
        );
        return { id: result.lastID };
    }

    // Récupère l'historique santé d'un utilisateur
    static async history(userId) {
        if (!userId) throw new Error('userId manquant');
        const rows = await all(
            `SELECT * FROM health WHERE userId = ? ORDER BY timestamp DESC`,
            [userId]
        );
        return rows;
    }

    // Dernière donnée santé d'un utilisateur
    static async last(userId) {
        if (!userId) throw new Error('userId manquant');
        const row = await get(
            `SELECT * FROM health WHERE userId = ? ORDER BY timestamp DESC LIMIT 1`,
            [userId]
        );
        return row;
    }
}

module.exports = Health;