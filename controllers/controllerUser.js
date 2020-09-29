const { User } = require('../models')
const hashPassword = require('../helpers/hashPassword')
const {generateToken} = require('../helpers/jwt')

class Controller {
    static registerUser(req, res) {
        const { email, password } = req.body
        const obj = { email, password }
        User.create(obj)
        .then(data => {
            res.status(201).json({msg: 'berhasil register', data})
        })
        .catch(err => {
            res.status(500).json({error: 'internal server error'})
        })
    }
    static loginUser(req, res) {
        const { email, password } = req.body
        const obj = { email, password }
        User.findOne({where: {email}})
        .then(data => {
            if (!data || hashPassword(password) != data.password) throw {msg: 'invalid email or password'}
            let payload = {
                id: data.id,
                email: data.email
            }
            let token = generateToken(payload)
            console.log(token, 'asup33333333');
            res.status(200).json({msg: 'berhasil login', token})
        })
        .catch(err => {
            res.status(400).json({err})
        })
    }
}

module.exports = Controller