const { User } = require('../models')
const hashPassword = require('../helpers/hashPassword')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')


class Controller {
    static registerUser(req, res, next) {
        const { email, password } = req.body
        const obj = { email, password }
        User.create(obj)
            .then(data => {
                data = {
                    id: data.id,
                    email: data.email
                }
                res.status(201).json({ msg: 'berhasil register', data })
            })
            .catch(next)
    }
    static loginUser(req, res, next) {
        const { email, password } = req.body
        const obj = { email, password }
        User.findOne({ where: { email } })
            .then(data => {
                if (!data || hashPassword(password) != data.password) throw { name: 'UnAuthorized', msg: 'invalid email or password' }
                let payload = {
                    id: data.id,
                    email: data.email
                }
                let token = generateToken(payload)
                res.status(200).json({ msg: 'berhasil login', token })
            })
            .catch(next)
    }

    static googleLoginUser(req, res, next) {
        console.log('google login')
        let tokenGoogle = req.body.tokenGoogle
        let googlepayload = null
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        client.verifyIdToken({
            idToken: tokenGoogle,
            audience: process.env.GOOGLE_CLIENT_ID
        })
            .then(ticket => {
                console.log('googlesign in 11111111111111');
                googlepayload = ticket.getPayload()
                return User.findOne({
                    where: {
                        email: googlepayload.email
                    }
                })
            })
            .then((user) => {
                console.log('googlesign in 2222222222222222222');
                if (user) {
                    console.log(user, 'googlesing in 222222222AAAAAAAAAAAA');
                    let payload = {
                        id: user.id,
                        email: user.email,
                    }
                    let token = generateToken(payload)
                    res.status(200).json({ msg: 'berhasil login', token })
                    return user
                } else {
                    console.log(user, 'googlesing in 222222222AAAAAAAAAAAA');
                    return User.create({
                        email: googlepayload.email,
                        password: 'google'
                    })
                }
            })
            .then(user => {
                console.log('googlesing in 333333333333333333333');
                let payload = {
                    id: user.id,
                    email: user.email
                }
                let token = generateToken(payload)
                res.status(200).json({ msg: 'berhasil login', token })
            })
            .catch(next)
    }
}

module.exports = Controller