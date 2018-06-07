'use strict';
/* ES6 */
// export default function (sequelize, DataTypes) {
// CommonJS: 
module.exports = (sequelize, DataTypes) => {
	const Todo = sequelize.define('Todo', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	Todo.associate = (models) => {
		Todo.hasMany(models.TodoItem, {
			foreignKey: 'todoId',
			as: 'todoItems',
		});
	};
	return Todo;
}