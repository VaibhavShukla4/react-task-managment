// src/app/rootReducer.ts
import { combineReducers } from "redux";
import tasksReducer from "./../features/tasks/tasksSlice";

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
