// server/routes/route.js
const express = require("express");
const auth = require("../helpers/auth"); 
const { getTaskController, getAllTasksController, createTaskController, updateTaskController, deleteTaskController } = require("../controllers/TaskController");
const router = express.Router();


router.get("/tasks/:id", getTaskController); 
router.get("/", getAllTasksController);
router.post("/create", auth, createTaskController);
router.put('/tasks/:id', updateTaskController); 
router.delete("/delete/:id",auth, deleteTaskController);




module.exports = router;
