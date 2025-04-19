// src/components/StatusSummary.tsx
import React from "react";
import { Task, TaskStatus } from "../types/task";

interface Props {
  tasks: Task[];
}

const statuses: TaskStatus[] = ["To Do", "In Progress", "Done"];

const StatusSummary: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-black">
      {statuses.map((status) => (
        <div key={status} className="bg-white p-3 rounded-lg shadow flex-1">
          <h3 className="font-medium w-[120px]">{status}</h3>
          <p className="text-2xl font-bold">
            {tasks.filter((t) => t.status === status).length}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatusSummary;
