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
  updateTask: (id: number) => void;
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
    <li>
      <span className={task.completed ? "completed" : ""}>
        <FontAwesomeIcon
          icon={faCheck}
          className="icon"
          onClick={() => toggleComplete(task.id, task.completed)}
        />
        {editTaskId === task.id ? (
          <input
            type="text"
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
            onBlur={() => updateTask(task.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
          updateTask(task.id);
              }
            }}
            autoFocus
          />
        ) : (
          <span style={{ marginLeft: "8px" }}>{task.text}</span>
        )}
      </span>
      {editTaskId === task.id ? (
        <div>
          <button onClick={() => updateTask(task.id)}>Update</button>
          <button onClick={cancelEditTask} >Cancel</button>
        </div>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faEdit}
            className="icon"
            onClick={() => startEditTask(task)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="icon"
            onClick={() => deleteTask(task.id)}
          />
        </>
      )}
    </li>
  );
};

export default TaskItem;
