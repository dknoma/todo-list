const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        return Todo
            .create({
                title: req.body.title,
                userId: req.params.userId,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },
    createWithId(req, res) {
        return Todo
            .create({
                title: req.body.title,
                userId: req.params.userId,
                id: req.params.id,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Todo
            .findAll({
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }]
            })
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },
    /* Only if have todo and no items */
    // list(req, res) {
    //     return Todo
    //         .all()
    //         .then(todos => res.status(200).send(todos))
    //         .catch(error => res.status(400).send(error));
    // },
    retrieve(req, res) {
        return Todo
            .findById(req.params.todoId, {
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }],
            })
            .then(todo => {
                if(!todo) {
                    return res.status(404).send({
                        message: 'Todo Not Found',
                    });
                }
                return res.status(200).send(todo);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Todo
            .findById(req.params.todoId, {
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }],
            })
            .then(todo => {
                if(!todo) {
                    return res.status(404).send({
                        message: 'Todo Not Found',
                    });
                }
                return todo
                    .update({
                        title: req.body.title || todo.title,
                    })
                    .then(() => res.status(200).send(todo))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return Todo
            .findById(req.params.todoId)
            .then(todo => {
                if(!todo) {
                    return res.status(400).send({
                        message: 'Todo Not Found',
                    });
                }
                return todo
                    .destroy()
                    //status(204).send()) : 204 No Content
                    .then(() => res.status(200).send({ message: 'Todo successfully deleted'}))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};