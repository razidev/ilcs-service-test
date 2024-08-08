const Joi = require('joi');
const todoRepository = require('../repositories/todo');

exports.createTodo = async (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required().error(new Error("title not valid")),
            description: Joi.string().required().error(new Error("description not valid")),
            status: Joi.string().valid('pending', 'completed').required().error(new Error("status not valid"))
        });
        
        let input = req.body;
        try {
            input = await schema.validateAsync(input);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }

        const addTodo = await todoRepository.create(input);
        const task = {
            unique_id: addTodo.unique_id,
            title: addTodo.title,
            description: addTodo.description,
            status: addTodo.status,
            createdAt: addTodo.createdAt,
            updatedAt: addTodo.updatedAt
        };
        return res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        return next(error);
    }
};

exports.listTodo = async (req, res, next) => {
    try {
        const list = await todoRepository.findAll({ exclude: ['ID']}, [['ID', 'desc']]);
        return res.status(200).json({ list });
    } catch (error) {
        return next(error);
    }
};

exports.detailTodo = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required().error(new Error("id not valid"))
        });

        let input = req.params;
        try {
            input = await schema.validateAsync(input);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }

        const findTodo = await todoRepository.findOne({ unique_id: input.id }, { exclude: ['ID'] });
        if (!findTodo) {
            return  res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({ task: findTodo });
    } catch (error) {
        return next(error);
    }
};

exports.updateTodo = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required().error(new Error("id not valid")),
            title: Joi.string().required().error(new Error("title not valid")),
            description: Joi.string().required().error(new Error("description not valid")),
            status: Joi.string().valid('pending', 'completed').required().error(new Error("status not valid"))
        });

        let input = req.body;
        input.id = req.params.id;
        try {
            input = await schema.validateAsync(input);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }

        const findTodo = await todoRepository.findOne({ unique_id: input.id }, { exclude: ['ID'] });
        if (!findTodo) {
            return  res.status(404).json({ message: 'Task not found' });
        }

        const payload = {
            title: input.title,
            description: input.description,
            status: input.status
        };
        await todoRepository.update({ unique_id: findTodo.unique_id }, payload);
        const task = {
            unique_id: findTodo.unique_id,
            title: input.title,
            description: input.description,
            status: input.status,
            createdAt: findTodo.createdAt,
            updatedAt: findTodo.updatedAt
        };
        return res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        return next(error);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required().error(new Error("id not valid"))
        });

        let input = req.params;
        try {
            input = await schema.validateAsync(input);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }

        const findTodo = await todoRepository.findOne({ unique_id: input.id });
        if (!findTodo) {
            return  res.status(404).json({ message: 'Task not found' });
        }

        await findTodo.destroy();
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return next(error);
    }
};
