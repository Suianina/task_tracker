#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";

// Removed unused __dirname

interface Task {
  id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  createdAt: number;
  updatedAt: number;
}

const DEFAULT_STORAGE_PATH = path.join(process.cwd(), "task-tracker-data.json");

function getStoragePath(): string {
  const customPath = process.env.TASK_TRACKER_STORAGE_PATH;
  return customPath || DEFAULT_STORAGE_PATH;
}

function loadTasks(): Task[] {
  try {
    const storagePath = getStoragePath();
    if (fs.existsSync(storagePath)) {
      const data = fs.readFileSync(storagePath, "utf-8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
}

function saveTasks(tasks: Task[]): void {
  try {
    const storagePath = getStoragePath();
    fs.writeFileSync(storagePath, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving tasks:", error);
    throw error;
  }
}

const server = new Server(
  {
    name: "task-tracker-mcp-server",
    version: "1.0.0",
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
        name: "create_task",
        description: "Creates a new task in Task Tracker",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Task title",
            },
            description: {
              type: "string",
              description: "Task description (optional)",
            },
            status: {
              type: "string",
              enum: ["To Do", "In Progress", "Done"],
              description: "Task status",
              default: "To Do",
            },
          },
          required: ["title"],
        },
      },
      {
        name: "list_tasks",
        description:
          "Retrieves a list of all tasks with optional status filtering",
        inputSchema: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["To Do", "In Progress", "Done"],
              description: "Filter by status (optional)",
            },
          },
        },
      },
      {
        name: "update_task_status",
        description: "Updates task status by ID",
        inputSchema: {
          type: "object",
          properties: {
            taskId: {
              type: "string",
              description: "Task ID",
            },
            status: {
              type: "string",
              enum: ["To Do", "In Progress", "Done"],
              description: "New status",
            },
          },
          required: ["taskId", "status"],
        },
      },
      {
        name: "delete_task",
        description: "Deletes a task by ID",
        inputSchema: {
          type: "object",
          properties: {
            taskId: {
              type: "string",
              description: "Task ID to delete",
            },
          },
          required: ["taskId"],
        },
      },
      {
        name: "get_task_statistics",
        description: "Retrieves task statistics (count by status)",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args) {
    return {
      content: [
        {
          type: "text",
          text: "Error: Missing arguments",
        },
      ],
      isError: true,
    };
  }

  try {
    switch (name) {
      case "create_task": {
        const tasks = loadTasks();
        const newTask: Task = {
          id: Date.now().toString(),
          title: args.title as string,
          description: (args.description as string) || "",
          status: (args.status as Task["status"]) || "To Do",
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        tasks.push(newTask);
        saveTasks(tasks);
        return {
          content: [
            {
              type: "text",
              text: `Task "${newTask.title}" successfully created with ID: ${newTask.id}`,
            },
          ],
        };
      }

      case "list_tasks": {
        let tasks = loadTasks();
        if (args.status) {
          tasks = tasks.filter((t) => t.status === args.status);
        }
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(tasks, null, 2),
            },
          ],
        };
      }

      case "update_task_status": {
        const tasks = loadTasks();
        const taskIndex = tasks.findIndex((t) => t.id === args.taskId);
        if (taskIndex === -1) {
          return {
            content: [
              {
                type: "text",
                text: `Task with ID ${args.taskId} not found`,
              },
            ],
            isError: true,
          };
        }
        tasks[taskIndex].status = args.status as Task["status"];
        tasks[taskIndex].updatedAt = Date.now();
        saveTasks(tasks);
        return {
          content: [
            {
              type: "text",
              text: `Task "${tasks[taskIndex].title}" status updated to "${args.status}"`,
            },
          ],
        };
      }

      case "delete_task": {
        const tasks = loadTasks();
        const taskIndex = tasks.findIndex((t) => t.id === args.taskId);
        if (taskIndex === -1) {
          return {
            content: [
              {
                type: "text",
                text: `Task with ID ${args.taskId} not found`,
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
              type: "text",
              text: `Task "${deletedTask.title}" successfully deleted`,
            },
          ],
        };
      }

      case "get_task_statistics": {
        const tasks = loadTasks();
        const stats = {
          total: tasks.length,
          "To Do": tasks.filter((t) => t.status === "To Do").length,
          "In Progress": tasks.filter((t) => t.status === "In Progress").length,
          Done: tasks.filter((t) => t.status === "Done").length,
        };
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(stats, null, 2),
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: "text",
              text: `Unknown tool: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Task Tracker MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
