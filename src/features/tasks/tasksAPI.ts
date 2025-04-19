// src/features/tasks/tasksAPI.ts
import { Task } from "./../../types/task";

const STORAGE_KEY = "task_dashboard_tasks";

export const loadTasks = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
