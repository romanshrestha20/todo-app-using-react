// src/components/TaskForm.tsx
import React, { useState } from "react";

interface TaskFormProps {
  addTask: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [taskText, setTaskText] = useState<string>("");

  const handleAddTask = () => {
    if (!taskText.trim()) return alert("Task cannot be empty!");
    addTask(taskText);
    setTaskText("");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Add new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
      addTask(taskText);
          }
        }}
      />
      <button type="button" onClick={handleAddTask}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
