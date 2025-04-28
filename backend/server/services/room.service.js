const db = require('../db');
const Joi = require('joi');

// Promisify sqlite3 (callback → Promise)
function runAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) return reject(err);
            resolve({ lastID: this.lastID, changes: this.changes });
        });
    });
}
function getAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}
function allAsync(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

class RoomService {
    // Récupérer toutes les rooms
    static async getAll() {
        return await allAsync('SELECT id, name, description, user_id, avatar, created_at, updated_at FROM rooms');
    }

    // Récupérer une room par ID
    static async getById(id) {
        const row = await getAsync('SELECT id, name, description, user_id, avatar, created_at, updated_at FROM rooms WHERE id = ?', [id]);
        if (!row) throw new Error("Room not found");
        return row;
    }

    // Récupérer toutes les rooms d'un admin
    static async getRoomAdmin(user_id) {
        return await allAsync('SELECT id, name, description, avatar FROM rooms WHERE user_id = ?', [user_id]);
    }

    // Créer une nouvelle room
    static async create(params) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(200).required(),
            description: Joi.string().allow('', null),
            user_id: Joi.number().required(),
            avatar: Joi.string().allow('', null)
        });

        const { value, error } = schema.validate(params);
        if (error) throw new Error(error.details[0].message);

        const existing = await getAsync('SELECT id FROM rooms WHERE name = ?', [value.name]);
        if (existing) throw new Error("Duplicate name of the room");

        await runAsync(
            'INSERT INTO rooms (name, description, user_id, avatar, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
            [value.name, value.description, value.user_id, value.avatar, new Date().toISOString(), new Date().toISOString()]
        );
        return await getAsync('SELECT id, name, description, user_id, avatar, created_at, updated_at FROM rooms WHERE name = ?', [value.name]);
    }

    // Mettre à jour une room
    static async update(id, params) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(200),
            description: Joi.string().allow('', null),
            avatar: Joi.string().allow('', null)
        });

        const { value, error } = schema.validate(params);
        if (error) throw new Error(error.details[0].message);

        const existing = await getAsync('SELECT * FROM rooms WHERE id = ?', [id]);
        if (!existing) throw new Error("Room not found");

        await runAsync(
            'UPDATE rooms SET name = ?, description = ?, avatar = ?, updated_at = ? WHERE id = ?',
            [
                value.name || existing.name,
                value.description ?? existing.description,
                value.avatar ?? existing.avatar,
                new Date().toISOString(),
                id
            ]
        );
        return await getAsync('SELECT id, name, description, user_id, avatar, created_at, updated_at FROM rooms WHERE id = ?', [id]);
    }

    // Supprimer une room
    static async _delete(id) {
        const existing = await getAsync('SELECT * FROM rooms WHERE id = ?', [id]);
        if (!existing) throw new Error("Room not found");
        await runAsync('DELETE FROM rooms WHERE id = ?', [id]);
        return { success: true };
    }
}

module.exports = RoomService;