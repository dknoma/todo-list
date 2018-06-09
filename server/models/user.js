'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUnique: function(value, next) {
					User.find({
						where: {username: value},
						attributes: ['id']
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
			allowNull: false,
		},
	});
	// User.associate = (models) => {
	// 	// User.hasOne(models.Password, {
	// 	// 	foreignKey: 'pw',
	// 	// 	as: 'password',
	// 	// });
	// };
	return User;
};