// src/App.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const url = "http://localhost:3001";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${url}/`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.error || error.message);
        setLoading(false);
      });
  }, []);

  const addTask = (text: string) => {
    axios
      .post(`${url}/create`, { text, completed: false })
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        setError(error.response?.data?.error || error.message);
      });
  };

  const deleteTask = (id: number) => {
    axios
      .delete(`${url}/delete/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        setError(error.response?.data?.error || error.message);
      });
  };

 const toggleComplete = (id: number, completed: boolean) => {
  const taskToUpdate = tasks.find(task => task.id === id); // find task by id
  
  if (!taskToUpdate) {
    setError("Task not found");
    return;
  }

  axios
    .put(`${url}/tasks/${id}`, { text: taskToUpdate.text, completed: !completed })
    .then((response) => {
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    })
    .catch((error) => {
      console.log(error);
      setError(error.response?.data?.error || error.message);
    });
};


  const updateTask = (id: number) => {
    if (!editTaskText.trim()) return alert("Task cannot be empty!");

    axios
      .put(`${url}/tasks/${id}`, { text: editTaskText, completed: false })
      .then((response) => {
        setTasks(tasks.map((task) =>
          task.id === id ? { ...task, text: editTaskText } : task
        ));
        setEditTaskId(null);
        setEditTaskText("");
      })
      .catch((error) => {
        setError(error.response?.data?.error || error.message);
      });
  };

  const startEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
  };

  const cancelEditTask = () => {
    setEditTaskId(null);
    setEditTaskText("");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <h2>Todo List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

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

export default App;
