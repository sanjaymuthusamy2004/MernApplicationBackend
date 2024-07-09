require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const studentRoute = require("./controller/studentRoute");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
const mongoURI = `mongodb+srv://projectCRUD:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.e2s33vu.mongodb.net/Schooll_db?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Optional but recommended
    useCreateIndex: true // Optional but recommended
}).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

// Routes
app.use("/students", studentRoute); // Use plural endpoint for RESTful convention

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Student API');
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
