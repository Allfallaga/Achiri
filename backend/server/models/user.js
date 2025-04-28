const db = require('../config/db');
const bcrypt = require('bcryptjs');
const util = require('util');

const run = util.promisify(db.run).bind(db);
const all = util.promisify(db.all).bind(db);
const get = util.promisify(db.get).bind(db);

class User {
    // Crée un nouvel utilisateur
    static async create(params) {
        const {
            nickname,
            email,
            password,
            avatar = '',
            followers = 0,
            musicLinks = '',
            isAssociation = 0,
            username = '',
            role = 'user'
        } = params;
        if (!nickname || !email || !password) {
            throw new Error('Missing parameters');
        }
        const hash = bcrypt.hashSync(password, 10);
        const result = await run(
            `INSERT INTO users (nickname, email, password, avatar, followers, musicLinks, isAssociation, username, role, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nickname,
                email,
                hash,
                avatar,
                followers,
                musicLinks,
                isAssociation,
                username,
                role,
                new Date().toISOString(),
                new Date().toISOString()
            ]
        );
        return { id: result.lastID };
    }

    // Met à jour un utilisateur
    static async update(id, params) {
        const {
            nickname,
            avatar,
            followers,
            musicLinks,
            isAssociation,
            username,
            role
        } = params;
        if (!nickname || !avatar) {
            throw new Error('Missing parameters');
        }
        const result = await run(
            `UPDATE users SET nickname = ?, avatar = ?, followers = ?, musicLinks = ?, isAssociation = ?, username = ?, role = ?, updated_at = ?
             WHERE id = ?`,
            [
                nickname,
                avatar,
                followers || 0,
                musicLinks || '',
                isAssociation || 0,
                username || '',
                role || 'user',
                new Date().toISOString(),
                id
            ]
        );
        return { changes: result.changes };
    }

    // Supprime un utilisateur
    static async _delete(id) {
        const result = await run(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return { changes: result.changes };
    }

    // Liste tous les utilisateurs
    static async all() {
        const rows = await all(
            'SELECT id, nickname, avatar, followers, musicLinks, isAssociation, username, role FROM users'
        );
        return rows;
    }

    // Affiche un utilisateur précis
    static async show(id) {
        const row = await get(
            'SELECT id, nickname, avatar, followers, musicLinks, isAssociation, username, role FROM users WHERE id = ?',
            [id]
        );
        return row;
    }

    // Authentifie un utilisateur (email + password)
    static async authenticate(email, password) {
        const row = await get(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        if (!row) throw new Error('Utilisateur non trouvé');
        const valid = bcrypt.compareSync(password, row.password);
        if (!valid) throw new Error('Mot de passe incorrect');
        // Ne pas retourner le hash du mot de passe
        delete row.password;
        return row;
    }
}

module.exports = User;