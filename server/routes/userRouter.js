const express = require('express');
const router = express.Router();
const {createUser} = require('../models/accountModel')

const {hash, compare }= require('bcrypt');


router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await hash(password, 10);
        console.log(hashedPassword);

        const result = await createUser(email, hashedPassword);
        res.status(201).send('User registered');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    console.log(hashedPassword);
    res.send('User logged in');
}
);


module.exports = router;