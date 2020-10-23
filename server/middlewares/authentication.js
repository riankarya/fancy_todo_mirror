const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

async function authentication(req, res, next) {
    console.log('ASUP TI AUTH')
    try {
        req.loggedUser = verifyToken(req.headers.token)
        let user = await User.findOne({where: {email: req.loggedUser.email}})
        if (!user) throw { name: 'AuthenticationError', msg: 'Not Authenticated'}
        next()
    }
    catch {
        next({ name: 'AuthenticationError', msg: 'Not Authenticated'})
    }
}

module.exports = authentication