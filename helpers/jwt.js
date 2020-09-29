const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET)
}
function verifyToken(token) {
    console.log(jwt.verify(token, process.env.SECRET))
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {generateToken, verifyToken}