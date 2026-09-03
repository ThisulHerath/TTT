const mongoose = require('mongoose');
const Task = require('../models/Task');

const isValidTaskId = (id) => mongoose.Types.ObjectId.isValid(id);

const getErrorMessage = (error) => {
  if (error.name === 'ValidationError') {
    return Object.values(error.errors)
      .map((validationError) => validationError.message)
      .join(', ');
  }

  return 'Internal server error';
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

const getTaskById = async (req, res) => {
  try {
    if (!isValidTaskId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    return res.status(statusCode).json({ message: getErrorMessage(error) });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!isValidTaskId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    return res.status(statusCode).json({ message: getErrorMessage(error) });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!isValidTaskId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: getErrorMessage(error) });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
