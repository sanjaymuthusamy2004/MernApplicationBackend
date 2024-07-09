if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require("express");
const mongoose = require("mongoose");
const studentRoute = require("./controller/studentRoute");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.set("strictQuery", true);
mongoose.connect(`mongodb+srv://projectCRUD:${process.env.MONGODB_PASSWORD}@cluster0.e2s33vu.mongodb.net/Schooll_db?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("open", () => console.log("Connected"));
db.on("error", (err) => console.log("Not Connected", err));

app.use("/studentRoute", studentRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Student API');
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
console.log("MongoDB Password:", process.env.MONGODB_PASSWORD);
