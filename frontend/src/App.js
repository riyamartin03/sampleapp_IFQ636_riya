import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const API_BASE = "http://localhost:5001/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_BASE, authHeaders);
      setTasks(res.data);
      setMessage("");
    } catch (error) {
      setMessage("Please login first to manage tasks.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    } else {
      setMessage("Please login first to manage tasks.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("Task title is required.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `${API_BASE}/${editingId}`,
          { title, description },
          authHeaders
        );
        setMessage("Task updated successfully.");
      } else {
        await axios.post(
          API_BASE,
          { title, description },
          authHeaders
        );
        setMessage("Task added successfully.");
      }

      setTitle("");
      setDescription("");
      setEditingId(null);
      fetchTasks();
    } catch (error) {
      setMessage("Something went wrong while saving the task.");
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description || "");
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`, authHeaders);
      setMessage("Task deleted successfully.");
      fetchTasks();
    } catch (error) {
      setMessage("Something went wrong while deleting the task.");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>
        <p className="subtitle">IFN636 CRUD Application</p>

        {message && <p className="message">{message}</p>}

        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task._id}>
                <h3>{task.title}</h3>
                <p>{task.description || "No description"}</p>
                <div className="task-actions">
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
