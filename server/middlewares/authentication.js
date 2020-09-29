const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

function authentication(req, res, next) {
    let {token} = req.headers
    let decoded = verifyToken(token)
    User.findOne({where: {email: decoded.email}})
    .then(data => {
        if(!data) throw {msg: 'Authentication Failed'}
        req.loggedUser = data.dataValues
        next()
    })
    .catch(err => {
        console.log(err, 'asup auth err')
        res.status(500).json({error: err.msg || "Internal server error"})
    })
}

module.exports = authentication