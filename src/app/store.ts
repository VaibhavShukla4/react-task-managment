import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import localStorageMiddleware from "./localStorageMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

export type AppDispatch = typeof store.dispatch;

// ✅ This is the missing line
export type RootState = ReturnType<typeof store.getState>;

export default store;
