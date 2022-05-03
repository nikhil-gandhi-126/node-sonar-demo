/**
 * @name user model
 * @author Growexx
 */
'use strict';
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        email: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        password: DataTypes.STRING,
        otp: DataTypes.INTEGER,
        is_active: {
            type: DataTypes.INTEGER,
            enum: [0, 1, 2],
            default: 0
        },
        role: {
            type: DataTypes.INTEGER,
            enum: [1, 2, 3, 4],
            default: 1
        },
        refresh_token: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        reset_token: {
            allowNull: true,
            type: DataTypes.STRING
        },
        reset_expiry_time: {
            allowNull: true,
            type: DataTypes.DATE
        },
        createdAt: {
            type: DataTypes.DATE,
            default: Date.now
        },
        updatedAt: {
            type: DataTypes.DATE,
            default: Date.now
        }
    });
};
