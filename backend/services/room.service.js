const connection = require('../config/db')
const Joi = require('joi')

class RoomService {

    static getAll(callback) {
        connection.query('SELECT id, name, description, user_id FROM rooms', function (error, rows) {
            callback(error, rows)
        })
    }

    static getById(id, callback) {
        connection.query('SELECT id, name, description, user_id FROM rooms WHERE id = ?', id, (error, row) => {
            callback(error, row[0])
        })
    }

    static getRoomAdmin(id, callback) {
        connection.query('SELECT id, name, description FROM rooms WHERE user_id = ?', id, (error, row) => {
            callback(error, row)
        })
    }

    static create(params, callback) {

        const schema = Joi.object({
            name: Joi.string().min(3).max(200).required(),
            description: Joi.string(),
            user_id: Joi.number().required(),
            avatar: Joi.string()
        })

        const { value, error } = schema.validate(params)
        if (error) {
            callback(error, undefined)
            return
        }

        connection.query('SELECT id FROM rooms WHERE name = ?', value.name, (error, row) => {
            if (row.length > 0) {
                let err = { message: "Duplicate name of the room" }
                callback(err, row)
                return
            }
            connection.query('INSERT INTO rooms SET name = ? ,description = ?,user_id = ?, avatar = ?, created_at = ?, updated_at = ?', [value.name, value.description, value.user_id, value.avatar, new Date(), new Date()], function (error, results, fields) {
                callback(error, results)
                return
            })
        })

    }

    static update(id, params, callback) {

        const schema = Joi.object({
            name: Joi.string().min(3).max(200),
            description: Joi.string(),
            avatar: Joi.string()
        })

        const { value, error } = schema.validate(params)
        if (error) {
            callback(error, undefined)
            return
        }

        connection.query('SELECT * FROM rooms WHERE id = ?', id, (error, row) => {
            if (row.length <= 0) {
                let err = { message: "Room not found" }
                callback(err, undefined)
                return
            }
        })

        connection.query('UPDATE rooms SET name = ?, description = ?, avatar = ?, updated_at = ? WHERE id = ?', [value.name, value.description, value.avatar, new Date(), id], (error, results, fields) => {
            callback(error, results)
            return
        })
    }

    static _delete(id, callback) {

        connection.query('SELECT * FROM rooms WHERE id = ?', id, (error, row) => {
            if (row.length <= 0) {
                let err = { message: "Room not found" }
                callback(err, undefined)
                return
            }
        })

        connection.query('DELETE FROM rooms WHERE id = ?', id, (error, row) => {
            callback(error, row)
            return
        })
    }

}

module.exports = RoomService
