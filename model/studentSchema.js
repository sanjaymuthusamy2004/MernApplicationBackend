const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    regNo: { type: Number }
}, {
    collection: "students"
});

module.exports = mongoose.model("Student", studentSchema);
