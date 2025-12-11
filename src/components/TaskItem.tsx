import type { Task, TaskStatus } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export const TaskItem = ({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) => {
  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case 'To Do':
        return 'status-todo';
      case 'In Progress':
        return 'status-in-progress';
      case 'Done':
        return 'status-done';
      default:
        return '';
    }
  };

  return (
    <div className={`task-item ${getStatusColor(task.status)}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-status ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="status-select"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          onClick={() => onEdit(task)}
          className="btn btn-edit"
          aria-label="Edit task"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="btn btn-delete"
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

