// src/pages/Home.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/rootReducer";
import {
  addTask,
  updateTask,
  deleteTask,
  moveTask
} from "../features/tasks/tasksSlice";
import TaskForm from "../components/TaskForm";
import TaskBoard from "../components/TaskBoard";
import Header from "../components/Header";
import { Task, TaskStatus } from "../types/task";
import StatusSummary from "../components/StatusSummary";

const Home: React.FC = () => {
  const allTasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All">("All");

  const filteredTasks =
    statusFilter === "All"
      ? allTasks
      : allTasks.filter((task) => task.status === statusFilter);

  const handleSubmit = (task: Task) => {
    if (editingTask) {
      dispatch(updateTask(task));
      setEditingTask(null);
    } else {
      dispatch(addTask(task));
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleMoveTask = (id: string, newStatus: TaskStatus) => {
    dispatch(moveTask({ id, newStatus }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6 pt-[100px]">
        <div className="flex flex-wrap gap-[16px] justify-between items-center">
          {/* <h1 className="text-2xl font-bold text-black">Task Dashboard</h1> */}
          <div className="flex flex-wrap items-center gap-2 text-black">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as TaskStatus | "All")
              }
              className="border rounded p-2"
            >
              <option value="All">All Tasks</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <StatusSummary tasks={allTasks} />
        </div>

        <TaskForm
          onSubmit={handleSubmit}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        <TaskBoard
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMoveTask={handleMoveTask}
          statusFilter={statusFilter}
        />
      </main>
    </div>
  );
};

export default Home;
