const express = require('express');
const router = express.Router();
const errorHandlingMiddleware = require('../middlewares/error-handling');
const todoController = require('../controllers/todo');

router.post('/tasks', todoController.createTodo);
router.get('/tasks', todoController.listTodo);
router.get('/tasks/:id', todoController.detailTodo);
router.put('/tasks/:id', todoController.updateTodo);
router.delete('/tasks/:id', todoController.deleteTodo);

router.use(errorHandlingMiddleware);

module.exports = router;
