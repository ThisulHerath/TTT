import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const API_URL = "http://localhost:5000/api/tasks";

  // Get all tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const addTask = async (task) => {
    try {
      await axios.post(API_URL, task);
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Update task
  const updateTask = async (id, task) => {
    try {
      await axios.put(`${API_URL}/${id}`, task);

      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container">
      <h1>Mini Task Manager</h1>

      <TaskForm
        addTask={addTask}
        editingTask={editingTask}
        updateTask={updateTask}
        cancelEdit={() => setEditingTask(null)}
      />

      <TaskList
        tasks={tasks}
        setEditingTask={setEditingTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default Tasks;