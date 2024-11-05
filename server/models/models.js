const pool = require("../db");

const getAllTasks = async () => {
  const result = await pool.query("SELECT * FROM todos");
  return result.rows;
};

const getTask = async (id) => {
  const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
  return result.rows[0];
};

const createTask = async (text, completed) => {
  const result = await pool.query(
    "INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING * ",
    [text, completed]
  );
  return result.rows[0];
};

const updateTask = async (id, text, completed) => {
  const result = await pool.query(
    "UPDATE todos SET text = $1, completed = $2 WHERE id = $3 RETURNING *",
    [text, completed, id]
  );

  return result.rows[0];
};

const deleteTask = async (index) => {
  const result = await pool.query("DELETE FROM todos WHERE id = $1", [index]);
  return result.rowCount;
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
};
