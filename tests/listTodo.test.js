const { listTodo } = require('../controllers/todo');
const todoModel = require('../models/todo');

jest.mock('../models/todo');

describe('listTodo', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('should return list of todos and status 200', async () => {
        const mockTodoList = [
            { unique_id: '1', title: 'Todo 1', description: 'Description 1', status: 'pending' },
            { unique_id: '2', title: 'Todo 2', description: 'Description 2', status: 'completed' }
        ];

        todoModel.findAll.mockResolvedValue(mockTodoList);

        await listTodo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ list: mockTodoList });
    });

    it('should call next with an error', async () => {
        const error = new Error('Database error');
        todoModel.findAll.mockRejectedValue(error);

        await listTodo(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
