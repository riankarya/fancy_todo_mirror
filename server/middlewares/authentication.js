const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authentication = (req, res, next) => {
    try {
        req.loggedUser = verifyToken(req.headers.token)
        next()
    }
    catch {
        next({ name: 'AuthenticationError', msg: 'Not Authenticated'})
    }
}

module.exports = authentication