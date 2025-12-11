import { useState, useEffect } from 'react';
import { Task, TaskStatus } from './types/Task';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { loadTasks, saveTasks } from './utils/storage';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
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
    if (confirm('Ви впевнені, що хочете видалити цю задачу?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status, updatedAt: Date.now() } : task
      )
    );
  };

  const handleCancel = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p>Управління вашими задачами</p>
      </header>
      <main className="app-main">
        <div className="controls">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-primary btn-add"
            >
              + Додати нову задачу
            </button>
          ) : (
            <div className="form-container">
              <h2>{editingTask ? 'Редагувати задачу' : 'Нова задача'}</h2>
              <TaskForm
                task={editingTask || undefined}
                onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
}

export default App;
