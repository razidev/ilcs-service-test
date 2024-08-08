const Sequlize = require('sequelize');

const database = new Sequlize({
    dialect: 'oracle',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    logging: console.log,
    dialectOptions: {
        connectString: 'localhost:1521/FREEPDB1',
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = database;
