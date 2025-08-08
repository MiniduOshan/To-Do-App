// BLOCK 1: Importing Mongoose
const mongoose = require("mongoose");

// BLOCK 2: Defining Task Schema
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

// BLOCK 3: Creating and Exporting the Model
module.exports = mongoose.model("Task", TaskSchema);


/*BLOCK 1: Importing Mongoose

mongoose: Used to define the schema and interact with MongoDB.
BLOCK 2: Defining the task schema

title: A required string field for the task title.

completed: A boolean field indicating task status (default: false).

BLOCK 3: Creating and exporting the model

Creates a Mongoose model named "Task" based on TaskSchema.

Exports the model for use in other parts of the application.*/
