const Joi = require('joi');
const connection = require('../config/db')

class MessageService {

    static getAll(callback) {
        connection.query('SELECT id, content, user_id, room_id FROM messages', function (error, rows) {
            if (error) throw error
            callback(rows)
        });
    }

    static getById(id, callback) {
        connection.query('SELECT id, content, user_id, room_id FROM messages WHERE id = ?', id, (error, row) => {
            if (error) throw error
            callback(row[0])
        })
    }

    static create(params, callback) {

        const schema = Joi.object({
            content: Joi.string().required(),
            user_id: Joi.number().required(),
            room_id: Joi.number().required(),
        })

        const { value, error } = schema.validate(params)
        if (error) {
            callback(error, undefined)
            return
        }

        connection.query('INSERT INTO messages SET content = ?, user_id = ?, room_id = ?, created_at = ?, updated_at = ?', [params.content, params.user_id, params.room_id, new Date(), new Date()], function (error, results, fields) {
            callback(error, results)
            return
        });
    }

    static update(id, params, callback) {

        const schema = Joi.object({
            content: Joi.string().min(3).max(200).required(),
        })

        const { value, error } = schema.validate(params)
        if (error) {
            callback(error, undefined)
            return
        }
        connection.query('UPDATE messages SET content = ?, updated_at = ? WHERE id = ?', [value.content, new Date(), id], (error, results, fields) => {
            callback(error, results)
            return
        })
    }

    static _delete(id, callback) {

        connection.query('SELECT * FROM messages WHERE id = ?', id, (error, row) => {
            if (row.length <= 0) {
                let err = { message: "Message doesn't exist" }
                callback(err, undefined)
                return
            }
        })

        connection.query('DELETE FROM messages WHERE id = ?', id, (error, row) => {
            callback(error, row)
            return
        })
    }

}

module.exports = MessageService