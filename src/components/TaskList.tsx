// src/components/TaskList.tsx
import React from "react";
import { Task } from "./../types/task";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">No tasks available.</p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
