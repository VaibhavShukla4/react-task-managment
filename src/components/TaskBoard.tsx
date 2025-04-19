// src/components/TaskBoard.tsx
import React from "react";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { Task, TaskStatus } from "../types/task";
import TaskColumn from "./TaskColumn";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMoveTask: (id: string, newStatus: TaskStatus) => void;
  statusFilter: TaskStatus | "All";
}

const statuses: TaskStatus[] = ["To Do", "In Progress", "Done"];

const TaskBoard: React.FC<Props> = ({
  tasks,
  onEdit,
  onDelete,
  onMoveTask,
  statusFilter
}) => {
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);

  const handleDragStart = (event: any) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const overColumn = over.data.current?.status;
    if (overColumn) {
      onMoveTask(active.id, overColumn);
    }
  };

  const tasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  // If a specific status filter is selected, show only that column
  if (statusFilter !== "All") {
    return (
      <div className="grid grid-cols-1 gap-4">
        <TaskColumn
          status={statusFilter}
          tasks={tasksByStatus(statusFilter)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    );
  }

  // Show all columns when "All" is selected
  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <SortableContext
            key={status}
            items={tasksByStatus(status)}
            strategy={verticalListSortingStrategy}
          >
            <TaskColumn
              status={status}
              tasks={tasksByStatus(status)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </SortableContext>
        ))}
      </div>

      <DragOverlay>
        {activeTask ? (
          <TaskCard
            task={activeTask}
            onEdit={onEdit}
            onDelete={onDelete}
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
