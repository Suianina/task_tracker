# Task Tracker MCP Server Documentation

## Overview

The Task Tracker MCP Server is a custom Model Context Protocol (MCP) server that enables AI tools to interact with the Task Tracker application programmatically. This server provides automation capabilities for managing tasks through a standardized protocol.

## Architecture

### Technology Stack

- **Language**: TypeScript
- **Framework**: Model Context Protocol SDK
- **Runtime**: Node.js
- **Storage**: JSON file-based storage (configurable via environment variable)

### Server Structure

```
mcp-server/
├── src/
│   └── index.ts          # Main server implementation
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Quick start guide
```

## Features

The MCP Server provides the following tools:

### 1. create_task

Creates a new task in the Task Tracker.

**Parameters:**
- `title` (required): Task title
- `description` (optional): Task description
- `status` (optional): Task status - "To Do", "In Progress", or "Done" (default: "To Do")

**Example:**
```json
{
  "title": "Implement user authentication",
  "description": "Add login and registration functionality",
  "status": "To Do"
}
```

### 2. list_tasks

Retrieves a list of all tasks, optionally filtered by status.

**Parameters:**
- `status` (optional): Filter by status - "To Do", "In Progress", or "Done"

**Example:**
```json
{
  "status": "In Progress"
}
```

### 3. update_task_status

Updates the status of an existing task.

**Parameters:**
- `taskId` (required): ID of the task to update
- `status` (required): New status - "To Do", "In Progress", or "Done"

**Example:**
```json
{
  "taskId": "1234567890",
  "status": "Done"
}
```

### 4. delete_task

Deletes a task by ID.

**Parameters:**
- `taskId` (required): ID of the task to delete

**Example:**
```json
{
  "taskId": "1234567890"
}
```

### 5. get_task_statistics

Retrieves statistics about tasks (count by status).

**Parameters:** None

**Response:**
```json
{
  "total": 10,
  "To Do": 3,
  "In Progress": 5,
  "Done": 2
}
```

## Installation

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Setup

1. Navigate to the MCP server directory:
```bash
cd mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the server:
```bash
npm run build
```

## Configuration

### Environment Variables

- `TASK_TRACKER_STORAGE_PATH`: Custom path for task storage file (optional)
  - Default: `task-tracker-data.json` in the current working directory

### Cursor Configuration

Add the following to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "task-tracker": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"],
      "env": {
        "TASK_TRACKER_STORAGE_PATH": "/path/to/your/tasks.json"
      }
    }
  }
}
```

## Usage Examples

### Creating a Task via AI

```
Create a task "Review pull request #42" with status "In Progress"
```

### Getting Statistics

```
Show me task statistics
```

### Updating Task Status

```
Mark task with ID 1234567890 as Done
```

## Data Format

Tasks are stored in JSON format:

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

## Error Handling

The server includes comprehensive error handling:

- **Task not found**: Returns error message when task ID doesn't exist
- **Invalid status**: Validates status values
- **Storage errors**: Handles file system errors gracefully
- **JSON parsing errors**: Safely handles corrupted data files

## Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

This runs TypeScript compiler in watch mode for automatic rebuilding.

### Running

```bash
npm start
```

## Integration with Task Tracker App

The MCP Server uses a separate storage mechanism from the web application's localStorage. To synchronize data:

1. Export tasks from the web app (if export feature exists)
2. Import into the MCP Server storage file
3. Or configure both to use the same storage path (requires custom implementation)

## Troubleshooting

### Server Not Starting

- Check Node.js version: `node --version` (should be 18+)
- Verify dependencies: `npm install`
- Check build output: `npm run build`

### Tasks Not Appearing

- Verify storage path configuration
- Check file permissions
- Ensure JSON file is valid

### Connection Issues

- Verify Cursor MCP configuration
- Check server logs for errors
- Ensure absolute path is used in configuration

## Future Enhancements

Potential improvements for the MCP Server:

1. **Synchronization**: Real-time sync with web app localStorage
2. **Advanced Filtering**: Filter by date, description keywords
3. **Bulk Operations**: Create/update/delete multiple tasks at once
4. **Export/Import**: Support for CSV, JSON export formats
5. **Webhooks**: Integration with external services
6. **Authentication**: Secure access control

## License

MIT

## Contributing

This MCP Server is part of the Task Tracker project. Contributions are welcome!

