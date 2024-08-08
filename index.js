require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const todoRoutes = require('./routes/todo');
const database = require('./database/oracle');

app.use(bodyParser.json());
app.use(todoRoutes);

database.authenticate().then(() => {
    console.log('Connection to the database successfully.');
    app.listen(process.env.PORT, () =>
        console.log(`server is available on port ${process.env.PORT}!`));
}).catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
});
