const { DataTypes } = require('sequelize');
const database = require('../database/oracle');

const Todo = database.define('TODO', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    unique_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.UUIDV1,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'pending'
    }
}, {
    tableName: 'TODO',
    timestamps: true
});

module.exports = Todo;
