// src/components/TaskColumn.tsx
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { Task } from "../types/task";
import SortableTaskCard from "./SortableTaskCard";

interface TaskColumnProps {
  status: Task["status"];
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  tasks,
  onEdit,
  onDelete
}) => {
  const { setNodeRef } = useDroppable({
    id: status,
    data: {
      status
    }
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 p-4 rounded-lg shadow min-h-[300px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{status}</h2>
        <span className="text-sm bg-gray-500 px-[12px] py-[5px] rounded-full">
          {tasks.length}
        </span>
      </div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {tasks.map((task) => (
            <SortableTaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center py-4">No tasks</p>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default TaskColumn;
