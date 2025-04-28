const db = require('../config/db');
const util = require('util');

const run = util.promisify(db.run).bind(db);
const all = util.promisify(db.all).bind(db);
const get = util.promisify(db.get).bind(db);

class Room {
    static async create(params) {
        const { name, admin_id } = params;
        if (!name || !admin_id) {
            throw new Error('Missing parameters');
        }
        const created_at = new Date().toISOString();
        const result = await run(
            'INSERT INTO rooms (name, admin_id, created_at) VALUES (?, ?, ?)',
            [name, admin_id, created_at]
        );
        return { id: result.lastID, name, admin_id, created_at };
    }

    static async update(id, params) {
        const { name } = params;
        if (!name) {
            throw new Error('Missing name');
        }
        const result = await run(
            'UPDATE rooms SET name = ? WHERE id = ?',
            [name, id]
        );
        return { id, name, changes: result.changes };
    }

    static async _delete(id) {
        const result = await run(
            'DELETE FROM rooms WHERE id = ?',
            [id]
        );
        return { id, changes: result.changes };
    }

    static async all() {
        const rows = await all(
            'SELECT * FROM rooms ORDER BY created_at DESC'
        );
        return rows;
    }

    static async show(id) {
        const row = await get(
            'SELECT * FROM rooms WHERE id = ?',
            [id]
        );
        return row;
    }
}

module.exports = Room;