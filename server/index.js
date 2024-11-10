const express = require("express");
const cors = require("cors");
const router = require("./routes/route");
const userRouter = require('./routes/userRouter')
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use('/user', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

const SERVER_PORT = process.env.NODE_ENV === "test" ? 3002 : 3001;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port http://localhost:${SERVER_PORT}`);
});
