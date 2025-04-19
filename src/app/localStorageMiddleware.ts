// src/app/localStorageMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";

const localStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    // List of actions that modify tasks
    const taskActions = [
      "tasks/addTask",
      "tasks/updateTask",
      "tasks/deleteTask",
      "tasks/moveTask",
      "tasks/setTasks"
    ];

    // TypeScript now knows action has a type property
    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      typeof action.type === "string" &&
      taskActions.includes(action.type)
    ) {
      const state = store.getState();
      localStorage.setItem("tasks", JSON.stringify(state.tasks.tasks));
    }

    return result;
  };

export default localStorageMiddleware;
