// Load environment variables from .env file
require('dotenv').config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const studentRoute = require("./controller/studentRoute");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an Express application
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Debugging: Log MongoDB password
console.log("MongoDB Password:", process.env.MONGODB_PASSWORD);

// Set mongoose strict query option
mongoose.set("strictQuery", true);

// Construct MongoDB connection string
const mongoURI = `mongodb+srv://projectCRUD:${process.env.MONGODB_PASSWORD}@cluster0.e2s33vu.mongodb.net/Schooll_db?retryWrites=true&w=majority&ssl=true&appName=Cluster0`;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Handle MongoDB connection events
const db = mongoose.connection;
db.on("open", () => console.log("Connected to MongoDB"));
db.on("error", (err) => console.error("Failed to connect to MongoDB", err));

// Use the student route
app.use("/studentRoute", studentRoute);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Student API');
});

// Start the server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
