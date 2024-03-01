const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { dbConnect } = require("./config/dbConfig");
const { userRoutes } = require("./routes/userRoutes");
const dotenv = require("dotenv").config();


const app = express();
dbConnect()

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const port = process.env.PORT || 5000;


app.use('/api/user', userRoutes)
app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})