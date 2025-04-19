// src/App.tsx
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import Home from "./pages/Home";
import { setTasks } from "./features/tasks/tasksSlice";

const App: React.FC = () => {
  // Initialize tasks from localStorage on app load
  useEffect(() => {
    try {
      const serializedState = localStorage.getItem("tasks");
      if (serializedState) {
        const tasks = JSON.parse(serializedState);
        store.dispatch(setTasks(tasks));
      }
    } catch (e) {
      console.warn("Failed to initialize tasks from localStorage", e);
    }
  }, []);

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
