// BOCK 1: Import dependencies
const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// BLOCK 2: GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// BLOCK 3: POST a new task
router.post("/", async (req, res) => {
  const { title } = req.body;
  console.log("Received title:", title); // Debugging log

  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  try {
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// BLOCK 4: DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// BLOCK 5: UPDATE a task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Return the updated task
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

// BLOCK 6: Export the router
module.exports = router;

/*BLOCK 1: Import dependencies

express: Handles routing.

Task: Imports the Task model.

express.Router(): Creates a router for task-related routes.

BLOCK 2: GET all tasks

Fetches all tasks from the database.

Sends the tasks as a JSON response.

Handles errors with a 500 status.

BLOCK 3: POST a new task

Extracts title from the request body.

Logs the received title for debugging.

Validates the title (returns 400 if missing).

Saves the task to the database and returns it.

BLOCK 4: DELETE a task

Extracts id from the request params.

Deletes the task from the database.

Returns a success message.

BLOCK 5: UPDATE a task

Extracts id from the request params.

Updates the task using request body data.

Returns the updated task.

BLOCK 6: Export the router

Exports router for use in other parts of the app.
This Express.js router handles CRUD operations for a Task model using MongoDB. It defines routes to get all tasks, add a new task, delete a task by ID, and update a task's title by ID. Error handling ensures proper responses for missing data or server issues.*/