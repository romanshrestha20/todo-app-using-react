const {getTask, getAllTasks, createTask, deleteTask, updateTask } = require("../models/models");
const auth = require("../helpers/auth");

const getTaskController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await getTask(id);
        if (!task) {
        res.status(404).json({ error: "Task not found" });
        } else {
        res.json(task);
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
        res.status(500).json({ error: error.message });
    }
};
    
const getAllTasksController = async (req, res, next) => {
    try {
        const tasks = await getAllTasks();
        res.json(tasks);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
        res.status(500).json({ error: error.message });
    }
}


const createTaskController = async (req, res, next) => {
    const { text } = req.body;
    try {
        const newTask = await createTask(text, false); // defaulting 'completed' to false
        res.status(201).json(newTask);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
        res.status(500).json({ error: error.message });
    }
}

const updateTaskController = async (req, res,next) => {
    const { id } = req.params;
    const { text, completed } = req.body;

    if (typeof text !== 'string' || typeof completed !== 'boolean') {
        return res.status(400).json({ error: "Invalid request" });
    }

    try {
        
        const updatedTask = await updateTask(id, text, completed);
        if (!updatedTask) {
        res.status(404).json({ error: "Task not found" });
        } else {
        res.json(updatedTask);
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
        res.status(500).json({ error: error.message });
    }
}

const deleteTaskController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedTask = await deleteTask(id);
        if (!deletedTask) {
        res.status(404).json({ error: "Task not found" });
        } else {
        res.json({ message: "Task deleted" });
        }
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTaskController,
    getAllTasksController,
    createTaskController,
    updateTaskController,
    deleteTaskController
}
