const { ToDo } = require('../models')
const Helper = require('../helpers/tanggalBetul')

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
        ToDo.findAll({where: {UserId: req.loggedUser.id}})
            .then(data => {
                data.forEach(element => {
                    element.dataValues.dueDate = Helper.tanggalBetul(element.dataValues.dueDate)
                });
                res.status(200).json({ data })
            })
            .catch(next)
    }
    static toDosById(req, res, next) {
        const id = +req.params.id
        ToDo.findOne({ where: { id } })
            .then(data => {
                console.log(data);
                if(!data) throw {name: 'ToDoNotFound', error: "not found" }
                data.dataValues.dueDate = Helper.tanggalBetul(data.dataValues.dueDate)
                res.status(200).json({ data })
            })
            .catch(next)
    }
    static editAllToDos(req, res, next) {
        const id = +req.params.id
        const { title, description, status, dueDate } = req.body
        const obj = { title, description, status, dueDate }
        console.log(obj, id, 'ASUP TI EDITALLTODOS')
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
        console.log('asup ti controller edit status todo');
        const id = +req.params.id
        const { status } = req.body
        const obj = { status }
        ToDo.update(obj, { where: { id } })
            .then(_=> {
                return ToDo.findOne({where: {id}})
            })
            .then(data => {
                if (!data) throw {name: 'ToDoNotFound', error: "not found"}
                console.log(data, 'DARI EDIT STATUS CONTROLLER');
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