const pool = require("../helpers/db");

const createUser = async (email, hashedPassword) => {
  const result = await pool.query(
    `INSERT INTO account (email, password) VALUES ($1, $2) RETURNING *`,
    [email, hashedPassword]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  // Removed `password` parameter here
  const result = await pool.query("SELECT * FROM account WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const updateUser = async (id, hashedPassword) => {
  const result = await pool.query(
    "UPDATE account SET password = $1 WHERE id = $2 RETURNING *",
    [hashedPassword, id]
  );
  return result.rows[0]; // This will now return the updated user
};

const deleteUser = async (id) => {
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    
  const result = await pool.query("DELETE FROM account WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM account");
  return result.rows;
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
  deleteUser,
};
