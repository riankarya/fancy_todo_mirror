const router = require('express').Router()
const Controller = require('../controllers/controllerToDo')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', Controller.addToDos)
router.get('/', Controller.toDos)
router.use(authorization)
router.get('/:id', Controller.toDosById)
router.put('/:id', Controller.editAllToDos)
router.patch('/:id', Controller.editStatusToDos)
router.delete('/:id', Controller.deleteToDos)

module.exports = router