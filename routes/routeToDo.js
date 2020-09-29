const router = require('express').Router()
const Controller = require('../controllers/controllerToDo')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', Controller.addToDos)
router.get('/', Controller.toDos)
router.get('/:id', authorization, Controller.toDosById)
router.put('/:id', authorization, Controller.editAllToDos)
router.patch('/:id', authorization, Controller.editStatusToDos)
router.delete('/:id', authorization, Controller.deleteToDos)

module.exports = router