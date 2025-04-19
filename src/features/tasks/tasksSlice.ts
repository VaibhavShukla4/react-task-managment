// src/features/tasks/tasksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/task";

// Helper functions for localStorage
const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const serializedState = localStorage.getItem("tasks");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load tasks from localStorage", e);
    return [];
  }
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  try {
    const serializedState = JSON.stringify(tasks);
    localStorage.setItem("tasks", serializedState);
  } catch (e) {
    console.warn("Failed to save tasks to localStorage", e);
  }
};

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: loadTasksFromLocalStorage()
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
    moveTask: (
      state,
      action: PayloadAction<{ id: string; newStatus: Task["status"] }>
    ) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = newStatus;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    // Add this if you need to replace all tasks at once
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      saveTasksToLocalStorage(state.tasks);
    }
  }
});

export const { addTask, updateTask, deleteTask, moveTask, setTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
