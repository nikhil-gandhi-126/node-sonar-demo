'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING,
                defaultValue: null
            },
            otp: {
                type: Sequelize.INTEGER
            },
            password: {
                type: Sequelize.STRING
            },
            is_active: {
                type: Sequelize.INTEGER
            },
            role: {
                type: Sequelize.INTEGER
            },
            refresh_token: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            reset_token: {
                allowNull: true,
                type: Sequelize.STRING
            },
            reset_expiry_time: {
                allowNull: true,
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('admin_user');
    }
};
