import fs from 'fs';
import path from 'path';
import { pool } from '../helpers/db';
import { hash } from 'bcrypt';

const __dirname = import.meta.dirname;

const initializeTestDB = async () => {
    const sql = fs.readFileSync(path.resolve(__dirname, 'test.sql')).toString();
    await pool.query(sql);
}

const insertTestUser = async (email, password) => {
    hash(password, 10, async (err, hashedPassword) => {
        pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword], (err, res) => {
            if (err) {
                console.error(err);
            }
        });
    })
}

const getToken = async (email, password) => {
    return sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

export { initializeTestDB, insertTestUser };