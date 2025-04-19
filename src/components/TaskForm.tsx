// src/components/TaskForm.tsx
import React, { useState, useEffect } from "react";
import { Task } from "./../types/task";
import { v4 as uuidv4 } from "uuid";

interface Props {
  onSubmit: (task: Task) => void;
  editingTask?: Task | null;
  onCancel?: () => void;
}

const TaskForm: React.FC<Props> = ({ onSubmit, editingTask, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("To Do");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !dueDate) return;

    const newTask: Task = {
      id: editingTask?.id || uuidv4(),
      title,
      description,
      status,
      dueDate
    };

    onSubmit(newTask);
    setTitle("");
    setDescription("");
    setStatus("To Do");
    setDueDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {editingTask ? "Edit Task" : "New Task"}
      </h2>
      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Title
        </label>
        <input
          type="text"
          className="w-full border rounded p-2 outline-0 border-[1px] text-black border-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-black">
          Description
        </label>
        <textarea
          className="w-full border rounded p-2 outline-0 border-[1px] text-black border-blac"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">
            Status
          </label>
          <select
            className="w-full border rounded p-2 outline-0 border-[1px] text-black border-blac"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-black">
            Due Date
          </label>
          <input
            type="date"
            className="w-full border rounded p-2 outline-0 border-[1px] text-black border-blac"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {editingTask && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
