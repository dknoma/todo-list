const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const User = require('../models').User;
const jwt = require('jsonwebtoken');


module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));


	/* Todo related requests */
	app.post('/api/todos', todosController.create);
	// app.post('/api/:user/todos', todosController.create);
	app.post('/api/todos/:id/', todosController.createWithId);
	app.get('/api/todos', todosController.list);
	app.get('/api/todos/:todoId', todosController.retrieve);
	app.put('/api/todos/:todoId', todosController.update);
	app.delete('/api/todos/:todoId', todosController.destroy);

	/* TodoItem related requests */
	app.post('/api/todos/:todoId/items', todoItemsController.create);
	app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
	app.delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);

	/* Users */
	app.post('/api/user', usersController.create);
	app.get('/api/users', usersController.list);
	app.get('/api/user/:username', usersController.retrieve);
	app.delete('/api/user/:username', usersController.destroy);

	app.get('/api/:user/todos/:todoId', usersController.retrieve);
	// app.post('/api/login', usersController.authenticate);
	
	app.post('/api/login', (req, res) => {
		return User
			.find({where: {username: req.body.username}})
			.then(user => {
				if(!user) {
					return res.status(404).send({
						//message: Authentication failed. Username or password is wrong'
						message: 'User Not Found'
					});
				} else {
					if(user.username !== req.body.username) {
						return res.status(404).send({
							message: 'Authentication failed. Username or password is wrong.'
							// message: 'User Not Found'
						});
					}
					if (user.password !== req.body.password) {
						return res.status(404).send({
							message: 'Authentication failed. Username or password is wrong.'
							// message: 'Authentication failed. Password is wrong'
						});
					}
					const payload = {username: user.username};

					try {
						var token = jwt.sign(payload, app.get('superSecret'), {
							expiresIn: "24h" //expires after 24 hours
						});
					} catch (Error) {
						return res.status(400).send({
							message: 'Unable to get token.'
						});
					}

					return res.status(201).send({
						success: true,
						message: 'Stuff',
						token: token
					});
				}
			})
			.catch(error => res.status(400).send(error));
		},
	);

	app.all('/api/todos/:todoId/items', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};