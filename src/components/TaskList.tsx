import { Task, TaskStatus } from '../types/Task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export const TaskList = ({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>Немає задач. Додайте першу задачу!</p>
      </div>
    );
  }

  const tasksByStatus = {
    'To Do': tasks.filter((t) => t.status === 'To Do'),
    'In Progress': tasks.filter((t) => t.status === 'In Progress'),
    'Done': tasks.filter((t) => t.status === 'Done'),
  };

  return (
    <div className="task-list">
      {(['To Do', 'In Progress', 'Done'] as TaskStatus[]).map((status) => (
        <div key={status} className="task-column">
          <h2 className="column-title">
            {status} ({tasksByStatus[status].length})
          </h2>
          <div className="tasks-container">
            {tasksByStatus[status].map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

