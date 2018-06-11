'use strict';
module.exports = (sequelize, DataTypes) => {
	const Todo = sequelize.define('Todo', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	Todo.associate = (models) => {
		Todo.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
		// Todo.hasMany(models.TodoItem, {
		// 	foreignKey: 'todoId',
		// 	as: 'todoItems',
		// });
	};
	// Todo.associate = (models) => {
	// 	Todo.hasMany(models.TodoItem, {
	// 		foreignKey: 'todoId',
	// 		as: 'todoItems',
	// 	});
	// };
	return Todo;
};