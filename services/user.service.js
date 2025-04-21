const bcrypt = require('bcryptjs');
const connection = require('../config/db')
const Joi = require('joi')

class UserService {

    static create(params, callback) {

        const schema = Joi.object({
            nickname: Joi.string().min(3).max(100).required(),
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().required(),
            password_confirmation: Joi.ref('password'),
            avatar: Joi.string(),
        })

        const { value, error } = schema.validate(params)
        if (error) {
            callback(error, undefined)
            return
        }

        connection.query('SELECT id FROM users WHERE email = ?', value.email, (error, row) => {
            if (row.length > 0) {
                let err = { message: "Email already in use" }
                callback(err, row)
                return
            }

            var salt = bcrypt.genSaltSync(10)

            connection.query('INSERT INTO users SET nickname = ? ,email = ?, password = ?, created_at = ?, updated_at = ?, avatar = ?', [value.nickname, value.email, bcrypt.hashSync(value.password, salt), new Date, new Date(), value.avatar], function (error, results, fields) {
                callback(error, results)
                return
            });
        })

    }

    static update(id, params, callback) {

        const schema = Joi.object({
            nickname: Joi.string().min(3).max(200).required(),
            avatar: Joi.string().required(),
        })

        const { value, error } = schema.validate(params)
        if (error) {
            callback(error, undefined)
            return
        }

        connection.query('SELECT id FROM users WHERE id = ?', id, (error, row) => {
            if (row.length <= 0) {
                let err = { message: "User doesn't exist" }
                callback(err, row)
                return
            }
            connection.query('UPDATE users SET nickname = ?, updated_at = ?, avatar = ? WHERE id = ?', [value.nickname, new Date(), value.avatar, id], (error, results, fields) => {
                callback(error, results)
                return
            })
        })

    }

    static _delete(id, callback) {

        connection.query('SELECT * FROM users WHERE id = ?', id, (error, row) => {
            if (row.length <= 0) {
                let err = { message: "User doesn't exist" }
                callback(err, undefined)
                return
            }
        })

        connection.query('DELETE FROM users WHERE id = ?', id, (error, row) => {
            callback(error, row)
        })
    }

    static getAll(callback) {
        connection.query('SELECT id, nickname, avatar FROM users', function (error, rows) {
            if (error) throw error
            callback(rows)
        });
    }

    static getById(id, callback) {
        connection.query('SELECT id, nickname, avatar FROM users WHERE id = ?', id, (error, row) => {
            if (error) throw error
            callback(row[0])
        })
    }

    static login(params, callback) {

        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().required(),
        })

        const { value, error } = schema.validate(params)
        if (error) {
            callback(error, undefined)
            return
        }

        connection.query('SELECT id, nickname, avatar, email, password FROM users WHERE email = ? ', value.email, (error, row) => {
            if (error) {
                callback(error, row)
                return
            }
            if (row.length <= 0) {
                callback(new Error("Email doesn't exist"), row)
                return
            }
            if (bcrypt.compareSync(value.password, row[0].password)) {
                delete row[0].password
                callback(error, row[0])
                return
            } else {
                callback(new Error("Wrong credentials"), undefined)
                return
            }
        })
    }

    static getUsersByIds(params, callback) {
        connection.query('SELECT id, nickname, avatar FROM users WHERE id IN ?', params, function (error, rows) {
            callback(error, rows)
        });
    }

}

module.exports = UserService
