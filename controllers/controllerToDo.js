const { ToDo } = require('../models')

class Controller {
    static addToDos(req, res, next) {
        const UserId = req.loggedUser.id
        const { title, description, status, dueDate } = req.body
        const obj = { title, description, status, dueDate, UserId }
        ToDo.create(obj)
            .then(data => {
                res.status(201).json({ msg: 'sukses nambah list', data })
            })
            .catch(err => {
                next(err)
            })
    }
    static toDos(req, res, next) {
        console.log(req.loggedUser);
        ToDo.findAll()
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(next)
    }
    static toDosById(req, res, next) {
        const id = +req.params.id
        ToDo.findOne({ where: { id } })
            .then(data => {
                if(!data) throw {name: 'ToDoNotFound', error: "not found" }
                res.status(200).json({ data })
            })
            .catch(next)
    }
    static editAllToDos(req, res, next) {
        const id = +req.params.id
        const { title, description, status, dueDate } = req.body
        const obj = { title, description, status, dueDate }
        ToDo.update(obj, { where: { id } })
            .then(_=> {
                return ToDo.findOne({where: {id}})
            })
            .then(data => {
                if (!data) throw {name:'ToDoNotFound', error: "not found"}
                res.status(200).json({ data })
            })
            .catch(next)
    }
    static editStatusToDos(req, res, next) {
        const id = +req.params.id
        const { status } = req.body
        const obj = { status }
        ToDo.update(obj, { where: { id } })
            .then(_=> {
                return ToDo.findOne({where: {id}})
            })
            .then(data => {
                if (!data) throw {name: 'ToDoNotFound', error: "not found"}
                res.status(200).json({ data })
            })
            .catch(next)
    }
    static deleteToDos(req, res, next) {
        const id = +req.params.id
        ToDo.findOne({where: {id}})
        .then(data => {
            if(!data) throw {name: 'ToDoNotFound', error: "not found"}
            ToDo.destroy({where: {id}})
            res.status(200).json({data})
        })
        .catch(next)
    }
}

module.exports = Controller