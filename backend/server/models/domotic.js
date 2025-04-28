const db = require('../config/db');
const util = require('util');

const run = util.promisify(db.run).bind(db);
const all = util.promisify(db.all).bind(db);
const get = util.promisify(db.get).bind(db);

class Domotic {
    // Ajoute un nouvel appareil domotique pour un utilisateur
    static async add({ userId, name, type, state, params }) {
        if (!userId || !name || !type) throw new Error('Paramètres manquants');
        const result = await run(
            `INSERT INTO domotic (userId, name, type, state, params, created_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                userId,
                name,
                type,
                state || 'off',
                params ? JSON.stringify(params) : '{}',
                new Date().toISOString()
            ]
        );
        return { id: result.lastID };
    }

    // Liste tous les appareils d'un utilisateur
    static async list(userId) {
        if (!userId) throw new Error('userId manquant');
        const rows = await all(
            `SELECT * FROM domotic WHERE userId = ? ORDER BY created_at DESC`,
            [userId]
        );
        // Parse params JSON si présent
        return rows.map(row => ({
            ...row,
            params: row.params ? JSON.parse(row.params) : {}
        }));
    }

    // Met à jour l'état ou les paramètres d'un appareil
    static async updateState(userId, deviceId, state, params) {
        if (!userId || !deviceId) throw new Error('Paramètres manquants');
        const result = await run(
            `UPDATE domotic SET state = ?, params = ?, updated_at = ? WHERE userId = ? AND id = ?`,
            [
                state,
                params ? JSON.stringify(params) : '{}',
                new Date().toISOString(),
                userId,
                deviceId
            ]
        );
        return { changes: result.changes };
    }

    // Supprime un appareil
    static async remove(userId, deviceId) {
        if (!userId || !deviceId) throw new Error('Paramètres manquants');
        const result = await run(
            `DELETE FROM domotic WHERE userId = ? AND id = ?`,
            [userId, deviceId]
        );
        return { changes: result.changes };
    }

    // Récupère un appareil précis
    static async get(userId, deviceId) {
        if (!userId || !deviceId) throw new Error('Paramètres manquants');
        const row = await get(
            `SELECT * FROM domotic WHERE userId = ? AND id = ?`,
            [userId, deviceId]
        );
        return row ? { ...row, params: row.params ? JSON.parse(row.params) : {} } : null;
    }
}

module.exports = Domotic;