// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import localStorageMiddleware from "./localStorageMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export default store;
