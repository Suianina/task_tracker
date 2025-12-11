import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type { Task, TaskStatus } from "../types/Task";

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  onCancel?: () => void;
}

export const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<TaskStatus>(task?.status || "To Do");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("To Do");
    }
  }, [task]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
      });
      setTitle("");
      setDescription("");
      setStatus("To Do");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows={3}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {task ? "Update" : "Add"} Task
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
