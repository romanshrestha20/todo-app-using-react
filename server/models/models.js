const pool = require("../helpers/db");

const getAllTasks = async () => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    return result.rows;
  } catch (error) {
    console.error("Error getting all tasks:", error);
    throw error;
  }
};

const getTask = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error getting task with id ${id}:`, error);
    throw error;
  }
};

const createTask = async (text, completed) => {
  try {
    const result = await pool.query(
      "INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING * ",
      [text, completed]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const updateTask = async (id, text, completed) => {
  try {
    const result = await pool.query(
      "UPDATE todos SET text = $1, completed = $2 WHERE id = $3 RETURNING *",
      [text, completed, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating task with id ${id}:`, error);
    throw error;
  }
};

const deleteTask = async (index) => {
  try {
    const result = await pool.query("DELETE FROM todos WHERE id = $1", [index]);
    return result.rowCount;
  } catch (error) {
    console.error(`Error deleting task with id ${index}:`, error);
    throw error;
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
};
