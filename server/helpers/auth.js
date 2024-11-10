const jwt = require('jsonwebtoken');
const { verify } = jwt;
const { getUserByEmail } = require('../models/accountModel');


const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Authorization header is required' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verify(token, process.env.JWT_SECRET_KEY);
        const user = await getUserByEmail(decoded.user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}
    

module.exports = auth;