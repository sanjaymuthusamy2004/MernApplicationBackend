const express = require("express");
const Student = require("../model/studentSchema");
const mongoose = require("mongoose");

const studentRoute = express.Router();

studentRoute.post("/create-student", (req, res) => {
    Student.create(req.body, (err, data) => {
        if (err)
            return res.status(500).send(err);
        else
            res.json(data);
    });
});

studentRoute.get("/", (req, res) => {
    Student.find((err, data) => {
        if (err)
            return res.status(500).send(err);
        else
            res.json(data);
    });
});

studentRoute.route("/update-student/:id")
    .get((req, res) => {
        Student.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err)
                return res.status(500).send(err);
            else
                res.json(data);
        });
    })
    .put((req, res) => {
        Student.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), { $set: req.body }, { new: true }, (err, data) => {
            if (err)
                return res.status(500).send(err);
            else
                res.json(data);
        });
    });

studentRoute.delete("/delete-student/:id", (req, res) => {
    Student.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if (err)
            return res.status(500).send(err);
        else
            res.json(data);
    });
});

module.exports = studentRoute;
