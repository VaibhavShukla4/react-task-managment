// src/components/TaskCard.tsx
import React from "react";
import { Task } from "../types/task";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
}

const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete, isDragging }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-all ${
        isDragging ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-black">{task.title}</h2>
        <span className="text-sm text-gray-500">{task.dueDate}</span>
      </div>
      <p className="text-gray-700 my-2">{task.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded 
            ${task.status === "To Do" && "bg-gray-200 text-gray-800"}
            ${task.status === "In Progress" && "bg-yellow-200 text-yellow-800"}
            ${task.status === "Done" && "bg-green-200 text-green-800"}`}
        >
          {task.status}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-500 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
