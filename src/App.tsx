import { useState, useEffect, useMemo } from "react";
import type { Task, TaskStatus } from "./types/Task";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { SearchBar } from "./components/SearchBar";
import { loadTasks, saveTasks } from "./utils/storage";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    const newTask: Task = {
      ...taskData,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      return updatedTasks;
    });
    setEditingTask(null);
    setShowForm(false);
    setSearchQuery("");
  };

  const handleUpdateTask = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...taskData, updatedAt: Date.now() }
            : task
        )
      );
      setEditingTask(null);
      setShowForm(false);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status, updatedAt: Date.now() } : task
      )
    );
  };

  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
    setSearchQuery("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim());
  };

  const filteredTasks = useMemo(() => {
    if (!searchQuery) {
      return tasks;
    }
    const lowerQuery = searchQuery.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery)
    );
  }, [tasks, searchQuery]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p>Manage your tasks</p>
      </header>
      <main className="app-main">
        <div className="controls">
          {!showForm ? (
            <>
              <SearchBar value={searchQuery} onSearch={handleSearch} />
              <button
                onClick={() => setShowForm(true)}
                className="btn btn-primary btn-add"
              >
                + Add New Task
              </button>
            </>
          ) : (
            <div className="form-container">
              <h2>{editingTask ? "Edit Task" : "New Task"}</h2>
              <TaskForm
                task={editingTask || undefined}
                onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
}

export default App;
