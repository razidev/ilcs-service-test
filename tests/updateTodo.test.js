const { updateTodo } = require('../controllers/todo');
const todoModel = require('../models/todo');

jest.mock('../models/todo');

describe('updateTodo', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: {
                title: 'Updated Title',
                description: 'Updated Description',
                status: 'completed'
            }
        };
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
        req.body.title = '';

        await updateTodo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'title not valid' });
    });

    it('should return 404 if todo is not found', async () => {
        todoModel.findOne.mockResolvedValue(null);

        await updateTodo(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should return 200 and update the todo', async () => {
        const mockTodo = {
            unique_id: '1',
            title: 'Original Title',
            description: 'Original Description',
            status: 'pending'
        };
        todoModel.findOne.mockResolvedValue(mockTodo);
        todoModel.update.mockResolvedValue([1]);

        await updateTodo(req, res, next);

        const expectedPayload = {
            unique_id: '1',
            title: 'Updated Title',
            description: 'Updated Description',
            status: 'completed'
        };

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Task updated successfully',
            task: expectedPayload
        });
    });

    it('should call next with an error', async () => {
        const error = new Error('Database error');
        todoModel.findOne.mockRejectedValue(error);

        await updateTodo(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
