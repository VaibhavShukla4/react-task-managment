// src/utils/taskUtils.ts
import { v4 as uuidv4 } from "uuid";
import { Task } from "@/types/task";

export function createTask(title: string): Task {
  return {
    id: uuidv4(),
    title,
    description: "",
    status: "To Do",
    dueDate: new Date().toISOString().split("T")[0]
  };
}
