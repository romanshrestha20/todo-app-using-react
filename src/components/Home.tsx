import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "../App.css";

const url = "http://localhost:3001";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState<string>("");

  const getTasks = async (token: string) => {
    try {
      const response = await axios.get(`${url}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTasks(response.data);
    } catch (error: any) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text: string) => {
    const token = localStorage.getItem("token");
    if (!token) return setError("User not authenticated");

    try {
      await axios.post(
        `${url}/create`,
        { text, completed: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await getTasks(token); // Refresh tasks after adding
    } catch (error: any) {
      setError(error.response?.data?.error || error.message);
    }
  };

  const deleteTask = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return setError("User not authenticated");

    try {
      await axios.delete(`${url}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTasks(tasks.filter((task) => task.id !== id)); // Optimistically update UI
    } catch (error: any) {
      setError(error.response?.data?.error || error.message);
    }
  };

  const updateTask = async (id: number, text: string, completed: boolean, token: string) => {
    if (!token) return setError("User not authenticated");
  
    try {
      const response = await axios.put(
        `${url}/tasks/${id}`,
        { text, completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error: any) {
      setError(error.response?.data?.error || error.message);
    }
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getTasks(token);
    } else {
      setError("User not authenticated");
      setLoading(false);
    }
  }, []);

  const toggleComplete = async (id: number, completed: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) return setError("User not authenticated");

    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) {
      setError("Task not found");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/tasks/${id}`,
        { text: taskToUpdate.text, completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error: any) {
      setError(error.response?.data?.error || error.message);
    }
  };

  const startEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
  };

  const cancelEditTask = () => {
    setEditTaskId(null);
    setEditTaskText("");
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        startEditTask={startEditTask}
        deleteTask={deleteTask}
        editTaskId={editTaskId}
        editTaskText={editTaskText}
        setEditTaskText={setEditTaskText}
        updateTask={updateTask}
        cancelEditTask={cancelEditTask}
      />
    </div>
  );
}

export default Home;
