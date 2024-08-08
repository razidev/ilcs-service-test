const todoModel = require('../models/todo');

exports.create = (data = {}) => {
    return todoModel.create(data);
};

exports.findAll = (attributes = {}, order = []) => {
    return todoModel.findAll({
        attributes,
        order
    });
};

exports.findOne = (where = {}, attributes = {}) => {
    return todoModel.findOne({
        where,
        attributes
    });
};

exports.update = (where = {}, data = {}) => {
    return todoModel.update(data, { where });
};