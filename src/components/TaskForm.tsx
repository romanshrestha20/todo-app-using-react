// src/components/TaskForm.tsx
import React, { useState } from "react";

interface TaskFormProps {
  addTask: (text: string, token: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [taskText, setTaskText] = useState<string>("");

  const handleAddTask = () => {
    if (!taskText.trim()) return alert("Task cannot be empty!");
  
    const token = localStorage.getItem("token");
    if (!token) return alert("User not authenticated");
  
    addTask(taskText, token); // Pass the token here
    setTaskText("");
  };
  

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center space-y-4">
      <input
        type="text"
        placeholder="Add new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTask();
          }
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={handleAddTask}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
