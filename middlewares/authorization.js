const { ToDo } = require('../models')

function authorization (req, res, next) {
    const id = +req.params.id
    ToDo.findOne({where: {id}})
    .then(data => {
        if(!data) throw {msg: 'ToDo not found'}
        else if(data.UserId == req.loggedUser.id) next()
        else throw {msg: 'You are not authorized'}
    })
    .catch(err => {
        res.status(500).json({error: err.msg || 'Internal server error'})
    })
}

module.exports = authorization