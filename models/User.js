const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [8], // password must consist of a minimum of 8 characters
            },
        },
        first_name: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User