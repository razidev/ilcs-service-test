const { detailTodo } = require('../controllers/todo');
const todoModel = require('../models/todo');

jest.mock('../models/todo');

describe('detailTodo', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: { id: '1' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if validation input fails', async () => {
        req.params.id = '';  // Invalid ID

        await detailTodo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'id not valid' });
    });

    it('should return 404 if todo is not found', async () => {
        todoModel.findOne.mockResolvedValue(null);

        await detailTodo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should return 200 and the todos', async () => {
        const mockTodo = { unique_id: '1' };

        todoModel.findOne.mockResolvedValue(mockTodo);

        await detailTodo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ task: mockTodo });
    });

    it('should call next with an error', async () => {
        const error = new Error('Database error');
        todoModel.findOne.mockRejectedValue(error);

        await detailTodo(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
