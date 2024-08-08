const Sequlize = require('sequelize');
const sequelize = new Sequlize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
