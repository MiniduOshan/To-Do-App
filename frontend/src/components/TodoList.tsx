// BLOCK 1: Importing Dependencies(React: Enables functional component creation.)
import React from "react";

// BLOCK 2: Defining Interfaces
interface Task {
  _id: string; // Unique ID for the task
  title: string; // Task name
  completed: boolean; // True if done, False if not
}


interface TodoListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  editingTitle: string;
  setEditingTitle: (title: string) => void;
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;
  startEditing: (id: string) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/*Task interface: Defines _id, title, and completed properties.
TodoListProps interface: Defines props passed to the TodoList component*/


// BLOCK 3: Declares the TodoList Component
const TodoList: React.FC<TodoListProps> = ({
  tasks,
  deleteTask,
  updateTask,
  editingTitle,
  setEditingTitle,
  editingTaskId,
  setEditingTaskId,
  startEditing,
  handleEditChange,
}) => {
/*BLOCK 3: Declares the TodoList component
Defines a functional React component (TodoList) using TypeScript (React.FC<TodoListProps>).
Extracts the listed props from TodoListProps and prepares the component for rendering.*/



  // BLOCK 4: Rendering the Task List and handling task actions
return (
  <div className="todo-list">
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              updateTask(task._id, { completed: !task.completed })
            }
          />
          {editingTaskId === task._id ? (
            <>
              <input
                type="text"
                value={editingTitle}
                onChange={handleEditChange}
              />
              <button
                onClick={() => {
                  updateTask(task._id, { title: editingTitle });
                  setEditingTaskId(null);
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>

              <div>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
                <button
                  onClick={() => {
                    startEditing(task._id);
                    setEditingTitle(task.title);
                  }}
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
);

/*Maps through tasks to display each task inside a <ul>.
Checkbox toggles completed status using updateTask().
Conditional rendering:
If a task is being edited, an input field appears for editing.
Otherwise, the task title is displayed with a strikethrough if completed
Save button: Updates the task title using updateTask(), then exits edit mode.
Delete button: Calls deleteTask() to remove a task.
Edit button: Enables edit mode, setting editingTaskId and editingTitle.*/

}
// BLOCK 5: Exporting the Component
export default TodoList;