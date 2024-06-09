const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Adjust to match your frontend URL
    credentials: true,
}));
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

app.use("/api/users", require("./routes/userRoutes"))

connectToMongo();