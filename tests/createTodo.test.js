jest.mock('../models/todo');
const { createTodo } = require('../controllers/todo');
const todoModel = require('../models/todo');

describe('createTodo', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                title: 'Test Title',
                description: 'Test Description',
                status: 'pending'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('should create a new todo and return 201 status', async () => {
        todoModel.create.mockResolvedValue({
            title: 'Test Title',
            description: 'Test Description',
            status: 'pending'
        });

        await createTodo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Task created successfully',
            task: expect.any(Object)
        }));
    });

    it('should return 400 if validation input fails', async () => {
        req.body.status = 'invalid_status';

        await createTodo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'status not valid'
        }));
    });

    it('should call next with an error', async () => {
        const error = new Error('Database error');
        todoModel.create.mockRejectedValue(error);

        await createTodo(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
