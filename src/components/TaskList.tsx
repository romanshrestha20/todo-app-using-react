// src/components/TaskList.tsx
import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: number, completed: boolean) => void;
  startEditTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  editTaskId: number | null;
  editTaskText: string;
  setEditTaskText: (text: string) => void;
  updateTask: (id: number) => void;
  cancelEditTask: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
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
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          startEditTask={startEditTask}
          deleteTask={deleteTask}
          editTaskId={editTaskId}
          editTaskText={editTaskText}
          setEditTaskText={setEditTaskText}
          updateTask={updateTask}
          cancelEditTask={cancelEditTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
