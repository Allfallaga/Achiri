const Joi = require('joi');
const connection = require('../config/db');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

class MessageService {
    static async getAll() {
        return await query('SELECT id, content, user_id, room_id FROM messages');
    }

    static async getById(id) {
        const [message] = await query('SELECT id, content, user_id, room_id FROM messages WHERE id = ?', id);
        if (!message) throw new Error("Message not found");
        return message;
    }

    static async create(params) {
        const schema = Joi.object({
            content: Joi.string().required(),
            user_id: Joi.number().required(),
            room_id: Joi.number().required(),
        });

        const { value, error } = schema.validate(params);
        if (error) throw error;

        await query(
            'INSERT INTO messages SET content = ?, user_id = ?, room_id = ?, created_at = ?, updated_at = ?',
            [value.content, value.user_id, value.room_id, new Date(), new Date()]
        );
        const [message] = await query(
            'SELECT id, content, user_id, room_id FROM messages WHERE content = ? AND user_id = ? AND room_id = ? ORDER BY created_at DESC LIMIT 1',
            [value.content, value.user_id, value.room_id]
        );
        return message;
    }

    static async update(id, params) {
        const schema = Joi.object({
            content: Joi.string().min(3).max(200).required(),
        });

        const { value, error } = schema.validate(params);
        if (error) throw error;

        await query(
            'UPDATE messages SET content = ?, updated_at = ? WHERE id = ?',
            [value.content, new Date(), id]
        );
        const [message] = await query('SELECT id, content, user_id, room_id FROM messages WHERE id = ?', id);
        if (!message) throw new Error("Message not found");
        return message;
    }

    static async _delete(id) {
        const existing = await query('SELECT * FROM messages WHERE id = ?', id);
        if (existing.length <= 0) {
            throw new Error("Message doesn't exist");
        }
        await query('DELETE FROM messages WHERE id = ?', id);
        return { success: true };
    }
}

module.exports = MessageService;