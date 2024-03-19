const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
// const axios = require('axios')
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port${process.env.PORT}`);
})

app.use(express.json());

async function connectToMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

app.use("/api/users", userRoutes)
// app.use("/api/messages", msgRoutes)

connectToMongo();