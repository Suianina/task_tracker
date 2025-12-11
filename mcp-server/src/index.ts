#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs';
import * as path from 'path';

// Removed unused __dirname

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  createdAt: number;
  updatedAt: number;
}

const DEFAULT_STORAGE_PATH = path.join(process.cwd(), 'task-tracker-data.json');

function getStoragePath(): string {
  const customPath = process.env.TASK_TRACKER_STORAGE_PATH;
  return customPath || DEFAULT_STORAGE_PATH;
}

function loadTasks(): Task[] {
  try {
    const storagePath = getStoragePath();
    if (fs.existsSync(storagePath)) {
      const data = fs.readFileSync(storagePath, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}

function saveTasks(tasks: Task[]): void {
  try {
    const storagePath = getStoragePath();
    fs.writeFileSync(storagePath, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving tasks:', error);
    throw error;
  }
}

const server = new Server(
  {
    name: 'task-tracker-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'create_task',
        description: 'Створює нову задачу в Task Tracker',
        inputSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Назва задачі',
            },
            description: {
              type: 'string',
              description: 'Опис задачі (опціонально)',
            },
            status: {
              type: 'string',
              enum: ['To Do', 'In Progress', 'Done'],
              description: 'Статус задачі',
              default: 'To Do',
            },
          },
          required: ['title'],
        },
      },
      {
        name: 'list_tasks',
        description: 'Отримує список всіх задач з можливістю фільтрації за статусом',
        inputSchema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['To Do', 'In Progress', 'Done'],
              description: 'Фільтр за статусом (опціонально)',
            },
          },
        },
      },
      {
        name: 'update_task_status',
        description: 'Оновлює статус задачі за ID',
        inputSchema: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              description: 'ID задачі',
            },
            status: {
              type: 'string',
              enum: ['To Do', 'In Progress', 'Done'],
              description: 'Новий статус',
            },
          },
          required: ['taskId', 'status'],
        },
      },
      {
        name: 'delete_task',
        description: 'Видаляє задачу за ID',
        inputSchema: {
          type: 'object',
          properties: {
            taskId: {
              type: 'string',
              description: 'ID задачі для видалення',
            },
          },
          required: ['taskId'],
        },
      },
      {
        name: 'get_task_statistics',
        description: 'Отримує статистику по задачах (кількість за статусами)',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'create_task': {
        const tasks = loadTasks();
        const newTask: Task = {
          id: Date.now().toString(),
          title: args.title as string,
          description: (args.description as string) || '',
          status: (args.status as Task['status']) || 'To Do',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        tasks.push(newTask);
        saveTasks(tasks);
        return {
          content: [
            {
              type: 'text',
              text: `Задачу "${newTask.title}" успішно створено з ID: ${newTask.id}`,
            },
          ],
        };
      }

      case 'list_tasks': {
        let tasks = loadTasks();
        if (args.status) {
          tasks = tasks.filter((t) => t.status === args.status);
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(tasks, null, 2),
            },
          ],
        };
      }

      case 'update_task_status': {
        const tasks = loadTasks();
        const taskIndex = tasks.findIndex((t) => t.id === args.taskId);
        if (taskIndex === -1) {
          return {
            content: [
              {
                type: 'text',
                text: `Задачу з ID ${args.taskId} не знайдено`,
              },
            ],
            isError: true,
          };
        }
        tasks[taskIndex].status = args.status as Task['status'];
        tasks[taskIndex].updatedAt = Date.now();
        saveTasks(tasks);
        return {
          content: [
            {
              type: 'text',
              text: `Статус задачі "${tasks[taskIndex].title}" оновлено на "${args.status}"`,
            },
          ],
        };
      }

      case 'delete_task': {
        const tasks = loadTasks();
        const taskIndex = tasks.findIndex((t) => t.id === args.taskId);
        if (taskIndex === -1) {
          return {
            content: [
              {
                type: 'text',
                text: `Задачу з ID ${args.taskId} не знайдено`,
              },
            ],
            isError: true,
          };
        }
        const deletedTask = tasks[taskIndex];
        tasks.splice(taskIndex, 1);
        saveTasks(tasks);
        return {
          content: [
            {
              type: 'text',
              text: `Задачу "${deletedTask.title}" успішно видалено`,
            },
          ],
        };
      }

      case 'get_task_statistics': {
        const tasks = loadTasks();
        const stats = {
          total: tasks.length,
          'To Do': tasks.filter((t) => t.status === 'To Do').length,
          'In Progress': tasks.filter((t) => t.status === 'In Progress').length,
          'Done': tasks.filter((t) => t.status === 'Done').length,
        };
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(stats, null, 2),
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: 'text',
              text: `Невідомий інструмент: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Помилка: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Task Tracker MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

