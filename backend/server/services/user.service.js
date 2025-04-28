const bcrypt = require('bcryptjs');
const db = require('../db');
const Joi = require('joi');

class UserService {
    static async create(params) {
        const schema = Joi.object({
            nickname: Joi.string().min(3).max(100).required(),
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().required(),
            password_confirmation: Joi.ref('password'),
            avatar: Joi.string().allow('', null),
        });

        const { value, error } = schema.validate(params);
        if (error) throw error;

        // Vérifier si l'email existe déjà
        const existing = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM users WHERE email = ?', [value.email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        if (existing) throw new Error("Email already in use");

        const salt = bcrypt.genSaltSync(10);
        await new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users (nickname, email, password, created_at, updated_at, avatar)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    value.nickname,
                    value.email,
                    bcrypt.hashSync(value.password, salt),
                    new Date().toISOString(),
                    new Date().toISOString(),
                    value.avatar || null
                ],
                function (err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });

        // Retourne le nouvel utilisateur (sans le mot de passe)
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT id, nickname, email, avatar FROM users WHERE email = ?', [value.email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        return user;
    }

    static async update(id, params) {
        const schema = Joi.object({
            nickname: Joi.string().min(3).max(200).required(),
            avatar: Joi.string().required(),
        });

        const { value, error } = schema.validate(params);
        if (error) throw error;

        const existing = await new Promise((resolve, reject) => {
            db.get('SELECT id FROM users WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        if (!existing) throw new Error("User doesn't exist");

        await new Promise((resolve, reject) => {
            db.run(
                `UPDATE users SET nickname = ?, updated_at = ?, avatar = ? WHERE id = ?`,
                [value.nickname, new Date().toISOString(), value.avatar, id],
                function (err) {
                    if (err) reject(err);
                    else resolve();
                }
            );
        });

        const user = await new Promise((resolve, reject) => {
            db.get('SELECT id, nickname, avatar FROM users WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        return user;
    }

    static async _delete(id) {
        const existing = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        if (!existing) throw new Error("User doesn't exist");

        await new Promise((resolve, reject) => {
            db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
        return { success: true };
    }

    static async getAll() {
        return await new Promise((resolve, reject) => {
            db.all('SELECT id, nickname, avatar FROM users', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    static async getById(id) {
        return await new Promise((resolve, reject) => {
            db.get('SELECT id, nickname, avatar FROM users WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else if (!row) reject(new Error("User not found"));
                else resolve(row);
            });
        });
    }

    static async login(params) {
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().required(),
        });

        const { value, error } = schema.validate(params);
        if (error) throw error;

        const user = await new Promise((resolve, reject) => {
            db.get('SELECT id, nickname, avatar, email, password FROM users WHERE email = ?', [value.email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        if (!user) throw new Error("Email doesn't exist");

        if (!bcrypt.compareSync(value.password, user.password)) {
            throw new Error("Wrong credentials");
        }
        delete user.password;
        return user;
    }

    static async getUsersByIds(ids) {
        if (!Array.isArray(ids) || ids.length === 0) return [];
        const placeholders = ids.map(() => '?').join(',');
        return await new Promise((resolve, reject) => {
            db.all(`SELECT id, nickname, avatar FROM users WHERE id IN (${placeholders})`, ids, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
}

module.exports = UserService;