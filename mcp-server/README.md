# Task Tracker MCP Server

MCP Server for automating Task Tracker application operations.

## Description

This MCP Server allows AI tools (such as Claude in Cursor) to automatically manage tasks in Task Tracker through the standardized MCP protocol.

## Features

The MCP Server provides the following tools:

1. **create_task** - Create a new task
2. **list_tasks** - Get a list of tasks (with optional filtering)
3. **update_task_status** - Update task status
4. **delete_task** - Delete a task
5. **get_task_statistics** - Get task statistics

## Installation

```bash
cd mcp-server
npm install
npm run build
```

## Configuration in Cursor

Add the following configuration to Cursor settings:

```json
{
  "mcpServers": {
    "task-tracker": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"],
      "env": {
        "TASK_TRACKER_STORAGE_PATH": "/path/to/data/file.json"
      }
    }
  }
}
```

**Note**: If `TASK_TRACKER_STORAGE_PATH` is not specified, data will be stored in `task-tracker-data.json` in the current working directory.

## Usage

After configuration, you can use the MCP Server through AI tools:

### Example 1: Creating a Task

```
Create a task "Implement drag-and-drop" with description "Add ability to drag tasks between columns"
```

### Example 2: Getting Statistics

```
Show task statistics
```

### Example 3: Updating Status

```
Update task with ID "1234567890" to status "In Progress"
```

## Data Format

Data is stored in JSON format:

```json
[
  {
    "id": "1234567890",
    "title": "Task title",
    "description": "Task description",
    "status": "To Do",
    "createdAt": 1234567890,
    "updatedAt": 1234567890
  }
]
```

## Development

```bash
# Build
npm run build

# Development with auto-reload
npm run dev

# Run
npm start
```

## License

MIT
