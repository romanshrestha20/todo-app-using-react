const express = require("express");
const {getTask, getAllTasks, createTask, deleteTask, updateTask } = require("../models");

const router = express.Router();


router.get("/tasks/:id", async (req, res, next) => {
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
});
router.get("/", async (req, res, next) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
    res.status(500).json({ error: error.message });
  }
});

router.post("/create", async (req, res, next) => {  // Changed endpoint to /create
  const { text } = req.body;
  try {
    const newTask = await createTask(text, false); // defaulting 'completed' to false
    res.status(201).json(newTask);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
    res.status(500).json({ error: error.message });
  }
});
router.put('/tasks/:id', async (req, res,next) => {
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
});


router.delete("/delete/:id", async (req, res, next) => {  // Changed endpoint to /delete/:id
  const { id } = req.params;
  try {
    const result = await deleteTask(id);
    if (result === 0) {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
    res.status(500).json({ error: "Failed to delete task" });
  }
});


module.exports = router;
