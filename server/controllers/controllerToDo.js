const { ToDo } = require('../models')

class Controller {
    static addToDos(req, res) {
        const { title, description, status, dueDate } = req.body
        const obj = { title, description, status, dueDate }
        ToDo.create(obj)
            .then(data => {
                res.status(201).json({ msg: 'sukses nambah list', data })
            })
            .catch(err => {
                if (err.name != "SequelizeValidationError") {
                    res.status(500)
                } else {
                    res.status(400).json({ msg: 'gagal nambah list', err })
                }
            })
    }
    static toDos(req, res) {
        console.log(req.loggedUser);
        ToDo.findAll()
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                res.status(500)
            })
    }
    static toDosById(req, res) {
        const id = +req.params.id
        ToDo.findOne({ where: { id } })
            .then(data => {
                if(!data) throw { error: "not found" }
                res.status(200).json({ data })
            })
            .catch(err => {
                res.status(404).json({err})
            })
    }
    static editAllToDos(req, res) {
        const id = +req.params.id
        const { title, description, status, dueDate } = req.body
        const obj = { title, description, status, dueDate }
        ToDo.update(obj, { where: { id } })
            .then(_=> {
                return ToDo.findOne({where: {id}})
            })
            .then(data => {
                console.log(data);
                if (!data) throw {error: "not found"}
                res.status(200).json({ data })
            })
            .catch(err => {
                console.log(err);
                if (err.name != "SequelizeValidationError") {
                    res.status(500)
                } else {
                    res.status(400).json({ err })
                }
                res.status(404).json({err})
            })
    }
    static editStatusToDos(req, res) {
        const id = +req.params.id
        const { status } = req.body
        const obj = { status }
        ToDo.update(obj, { where: { id } })
            .then(_=> {
                return ToDo.findOne({where: {id}})
            })
            .then(data => {
                if (!data) throw {error: "not found"}
                res.status(200).json({ data })
            })
            .catch(err => {
                if (err.name != "SequelizeValidationError") {
                    res.status(500)
                } else {
                    res.status(400).json({ err })
                }
                res.status(404).json({err})
            })
    }
    static deleteToDos(req, res) {
        const id = +req.params.id
        ToDo.findOne({where: {id}})
        .then(data => {
            if(!data) throw {error: "not found", status: 404}
            ToDo.destroy({where: {id}})
            res.status(200).json({data})
        })
        .catch(err => {
            if(err.status == 404) {
                res.status(404).json({err})
            } else {
                res.status(500)
            }
        })
    }
}

module.exports = Controller