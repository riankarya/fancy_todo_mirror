const router = require('express').Router()
const ToDo = require('./routeToDo')
const User = require('./routeUser')

router.use('/todos', ToDo)
router.use('/users', User)

module.exports = router