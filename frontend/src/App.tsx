// BLOCK 1: Importing Dependencies
import React, { useState, useEffect } from "react";//Manages component state and side effects.
import axios from "axios"; //Handles API requests.
import TodoList from "./components/TodoList.tsx"; //A child component to display and manage tasks.
import "./App.css"; // Styles the app.

// BLOCK 2: Defining Task Interface(structure of task)
interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

// BLOCK 3: Setting Up State Variables
const App: React.FC = () => {
  // State for tasks, new task text, and editing controls
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
/*tasks: Stores the list of tasks.
task: Holds input for new tasks.
editingTaskId: Tracks the task being edited.
editingTitle: Stores the updated title while editing. */


  // BLOCK 4: Fetch tasks from the backend on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(`http://localhost:5000/api/tasks`);
        console.log("Fetched tasks:", response.data); // Debugging log
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
  /*Runs once when the app loads.
Calls the API (GET /api/tasks) to get tasks and updates tasks.
Error handling**:** Logs an error message if the fetching request fails*/



  // BLOCK 5: Adding a Task
  const addTask = async () => {
    if (!task) return;

    try {
      console.log("Adding task:", task); // Debugging log
      const response = await axios.post<Task>(
        `http://localhost:5000/api/tasks`,
        { title: task },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Task added response:", response.data);
      setTasks([...tasks, response.data]);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  /*Sends a POST request to add a new task.
Updates tasks with the new task.
Error handling**:** Logs an error message if the adding task request fails */



  // BLOCK 6: Delete a task
  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
/*Sends a DELETE request to remove a task.
Updates tasks by filtering out the deleted task.
Error handling**:** Logs an error message if the deleting task request fails */


  // BLOCK 7: Updating a Task
  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        updatedTask,
        { headers: { "Content-Type": "application/json" } }
      );

      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, ...response.data } : task
        )
      );
      setEditingTaskId(null);
      setEditingTitle("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
/*Sends a PUT request to update a task’s title.
Updates tasks with the new title.
Error handling**:** Logs an error message if the update request fails */



  // BLOCK 8: Handling Edits
  const startEditing = (id: string) => {
    setEditingTaskId(id);
  };
  

  // Handle title change during editing
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };
/*startEditing(id): Sets a task into edit mode.
handleEditChange(e): Updates the editing input.*/




  // BLOCK 9: Render the app
  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <TodoList
        tasks={tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
        editingTitle={editingTitle}
        setEditingTitle={setEditingTitle}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        startEditing={startEditing}
        handleEditChange={handleEditChange}
      />
    </div>
  );
};
/*Displays an input field and button to add tasks.
Passes task data and functions (deleteTask, updateTask, etc.) to TodoList.tsx.*/



// BLOCK 10: Exporting the Component
export default App;