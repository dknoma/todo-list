const User = require('../models').User;

module.exports = {
	create(req, res) {
		// User.find(req.body.username, function(err, user){
		// 	if() {

		// 	}
		// })
		// if(User.find(req.body.username)) {
		// 	return (error => res.status(400).send(error))
		// } else {
		return User
			.create({
				username: req.body.username,
				password: req.body.password,
				// admin: req.body.admin,
			})
			.then(user => res.status(201).send(user))
			.catch(error => res.status(400).send(error));
	},
	authenticate(req, res) {
		return User
			.find({username: req.body.username})
			.then(user => {
				if(!user) {
					return res.status(404).send({
						//message: Authentication failed. Username or password is wrong'
						message: 'User Not Found'
					});
				} else {
					if (user.password != req.body.password) {
						return res.status(404).send({
							//message: Authentication failed. Username or password is wrong'
							message: 'Authentication failed. Password is wrong'
						});
					} else {
						const payload = {username: user.username};
						
						
						var token = jwt.sign(payload, app.get('superSecret'), {
							expiresInMinutes: 1440 //expires after 24 hours
						});

						return res.status(201).send({
							message: 'Stuff'
						});
						// return res.json({
						// 	success: true,
						// 	message: 'Token get!',
						// 	token: token
						// });
					}
				}
			})
			.catch(error => res.status(400).send(error));
				// function(err, user) {
				// 	if(err) throw err;
				// 	if(!user) {
				// 		// res.json({success: false, message: 'Authentication failed. Username or password is wrong'});
				// 		res.json({success: false, message: 'Authentication failed. User not found'});
				// 	} else {
				// 		if (user.password != req.body.password) {
				// 			// res.json({success: false, message: 'Authentication failed. Username or password is wrong'});
				// 			res.json({success: false, message: 'Authentication failed. Password is wrong'});
				// 		} else {
				// 			// if user is found and password is right
        		// 			// create a token with only our given payload
    			// 		// we don't want to pass in the entire user since that has the password
				// 			const payload = { admin: user.admin};
				// 			var token = jwt.sign(payload, app.get('superSecret'), {
				// 				expiresInMinutes: 1440 //expires after 24 hours
				// 			});
				// 			res.json({
				// 				success: true,
				// 				message: 'Token get!',
				// 				token: token
				// 			});
					
				// 		}
				// 	}
			// 	// }
			// .then(user => res.status(201).send({
			// 	message: 'Successfully authenticated!'
			// }))
			// .catch(error => res.status(400).send(error));
	},
	list(req, res) {
		return User
			.findAll()
			.then(users => res.status(200).send(users))
			.catch(error => res.status(400).send(error));
	},
	retrieve(req, res) {
		return User
			//find the given username from the table
			.find({ where: {username: req.params.username}})
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
			.findById(req.params.username, {
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
			.find({ where: {username: req.params.username}})
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