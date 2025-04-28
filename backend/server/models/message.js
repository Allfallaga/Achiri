const db = require('../config/db');
const util = require('util');

const run = util.promisify(db.run).bind(db);
const all = util.promisify(db.all).bind(db);
const get = util.promisify(db.get).bind(db);

class Message {
    static async create(params) {
        const { content, user_id, room_id } = params;
        if (!content || !user_id || !room_id) {
            throw new Error('Missing parameters');
        }
        const result = await run(
            'INSERT INTO messages (content, user_id, room_id, created_at) VALUES (?, ?, ?, ?)',
            [content, user_id, room_id, new Date().toISOString()]
        );
        return { id: result.lastID, content, user_id, room_id, created_at: new Date().toISOString() };
    }

    static async update(id, params) {
        const { content } = params;
        if (!content) {
            throw new Error('Missing content');
        }
        const result = await run(
            'UPDATE messages SET content = ? WHERE id = ?',
            [content, id]
        );
        return { id, content, changes: result.changes };
    }

    static async _delete(id) {
        const result = await run(
            'DELETE FROM messages WHERE id = ?',
            [id]
        );
        return { id, changes: result.changes };
    }

    static async all() {
        const rows = await all(
            'SELECT * FROM messages ORDER BY created_at DESC'
        );
        return rows;
    }

    static async show(id) {
        const row = await get(
            'SELECT * FROM messages WHERE id = ?',
            [id]
        );
        return row;
    }
}

module.exports = Message;