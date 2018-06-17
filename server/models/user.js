'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				len: [6, 24],
			},
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		}
	});
	User.associate = (models) => {
		User.hasMany(models.Todo, {
			foreignKey: 'userId',
			as: 'todos',
		});
	};
	return User;
};