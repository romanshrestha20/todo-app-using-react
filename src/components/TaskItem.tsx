// src/components/TaskItem.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  toggleComplete: (id: number, completed: boolean) => void;
  startEditTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  editTaskId: number | null;
  editTaskText: string;
  setEditTaskText: (text: string) => void;
  updateTask: (id: number, text: string, completed: boolean, token: string) => void; // Update type here
  cancelEditTask: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleComplete,
  startEditTask,
  deleteTask,
  editTaskId,
  editTaskText,
  setEditTaskText,
  updateTask,
  cancelEditTask,
}) => {
  return (
    <li className="flex items-center justify-between p-4 border-b border-gray-200">
      <span className={`flex items-center ${task.completed ? "line-through text-gray-500" : ""}`}>
        <FontAwesomeIcon
          icon={faCheck}
          className="icon cursor-pointer text-green-500 mr-2"
          onClick={() => toggleComplete(task.id, task.completed)}
        />
        {editTaskId === task.id ? (
          <input
            type="text"
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
            onBlur={() => updateTask(task.id, editTaskText, task.completed, "your-token")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTask(task.id, editTaskText, task.completed, "your-token");
              }
            }}
            autoFocus
            className="border border-gray-300 rounded px-2 py-1"
          />
        ) : (
          <span className="ml-2">{task.text}</span>
        )}
      </span>
      {editTaskId === task.id ? (
        <div className="flex items-center">
          <button
            onClick={() => updateTask(task.id, editTaskText, task.completed, "your-token")}
            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
          >
            Update
          </button>
          <button
            onClick={cancelEditTask}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faEdit}
            className="icon cursor-pointer text-blue-500 mr-2"
            onClick={() => startEditTask(task)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="icon cursor-pointer text-red-500"
            onClick={() => deleteTask(task.id)}
          />
        </div>
      )}
    </li>
  );
};

export default TaskItem;
