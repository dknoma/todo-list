const User = require('../models').User;
const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
	create(req, res) {
		return User
			.create({
				username: req.body.username,
				password: req.body.password,
				// admin: req.body.admin,
			})
			.then(user => res.status(201).send(user))
			.catch(error => res.status(400).send(error));
	},
	// todo(req, res) {
    //     return User
    //         .findById(req.params.todoId, {
    //             include: [{
    //                 model: Todo,
    //                 as: 'todo',
    //             }],
    //         })
    //         .then(user => {
    //             if(!user) {
    //                 return res.status(404).send({
    //                     message: 'User Not Found',
    //                 });
    //             }
    //             return user
    //                 .update({
    //                     title: req.body.title || todo.title,
    //                 })
    //                 .then(() => res.status(200).send(user))
    //                 .catch((error) => res.status(400).send(error));
    //         })
    //         .catch((error) => res.status(400).send(error));
    // },
	// authenticate(req, res) {
	// 	return User
	// 		.find({username: req.body.username})
	// 		.then(user => {
	// 			if(!user) {
	// 				return res.status(404).send({
	// 					//message: Authentication failed. Username or password is wrong'
	// 					message: 'User Not Found'
	// 				});
	// 			} else {
	// 				if(user.username !== req.body.username) {
	// 					return res.status(404).send({
	// 						//message: Authentication failed. Username or password is wrong'
	// 						message: 'User Not Found'
	// 					});
	// 				}
	// 				if (user.password !== req.body.password) {
	// 					return res.status(404).send({
	// 						//message: Authentication failed. Username or password is wrong'
	// 						message: 'Authentication failed. Password is wrong'
	// 					});
	// 				}
	// 				const payload = {username: user.username};

	// 				// return res.status(201).send({
	// 				// 	message: payload
	// 				// });
					
	// 				var token = jwt.sign(payload, app.get('superSecret'), {
	// 					expiresIn: "24h" //expires after 24 hours
	// 				});

	// 				return res.status(201).send({
	// 					success: true,
	// 					message: 'Stuff',
	// 					// token: token
	// 				});
					
	// 				// return res.json({
	// 				// 	success: true,
	// 				// 	message: 'Token get!',
	// 				// 	token: token
	// 				// });
					
	// 			}
	// 		})
	// 		.catch(error => res.status(400).send(error));
	// },
	list(req, res) {
		return User
			.findAll({
				// include: [{
				// 	model: Todo,
				// 	as: 'todos',
				// 	include: [{
				// 		model: TodoItem, 
				// 		as: 'todoItems'
				// 	}],
				// }]
			})
			.then(users => res.status(200).send(users))
			.catch(error => res.status(400).send(error));
	},
	retrieve(req, res) {
		return User
			//find the given username from the table
			// .find({ where: {username: req.params.username}}, {
			.findById(req.params.userId, {
				include: [{
					model: Todo,
					as: 'todos',
					// include: [{
					// 	model: TodoItem, 
					// 	as: 'todoItems'
					// }],
				}]
			})
			.then(user => {
				if(!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				return res.status(200).send(user);
			})
			.catch(error => res.status(400).send(error));
	},
	update(req, res) {
		return User
			// .findById(req.params.username, {
			.findById(req.params.userId, {
				include: [{
					model: User,
					as: 'users',
				}],
			})
			.then(user => {
				if(!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				return user
					.update({
						password: req.body.password || user.password,
					})
					.then(() => res.status(200).send(user))
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	},
	destroy(req, res) {
		return User
			//find the given username from the table
			// .find({ where: {username: req.params.username}})
			.findById(req.params.userId)
			.then(user => {
				if(!user) {
					return res.status(400).send({
						message: 'User Not Found',
					});
				}
				return user
					.destroy()
					//status(204).send()) : 204 No Content
					.then(() => res.status(200).send({ message: 'User successfully deleted'}))
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	}
};