'use strict';
module.exports = {
	//what content is present when creating a todo
	up: (queryInterface, Sequelize) => queryInterface.createTable('Todos', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		userId: {
			type: Sequelize.INTEGER,
			onDelete: 'CASCADE',
			references: {
				model: 'Users',
				key: 'id',
				as: 'userId',
			},
		},
	}),
	down: (queryInterface/*, Sequelize*/) => queryInterface.dropTable('Todos'),
};