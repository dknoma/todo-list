'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUnique: function(value, next) {
					User.find({
						where: {username: value}
					})
					.done(function(error, user) {
						if(error) {
							return next(error);
						}
						if(user) {
							return next('Username already taken.');
						}
						next();
					})
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				len: [6, 24],
			},
			allowNull: false,
		},
		// admin: {
		// 	type: DataTypes.INTEGER,
		// 	defaultValue: false
		// }
	});
	User.associate = (models) => {
		User.hasMany(models.Todo, {
			foreignKey: 'userId',
			as: 'todos',
		});
	};
	return User;
};