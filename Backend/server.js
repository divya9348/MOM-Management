const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors');
const connectDB = require('./Config/connection');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(cors());
connectDB();

app.get('/', (req, res) => {
    res.send('Hello login user');
});

app.use('/', require('./Routes/allRoutes'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
