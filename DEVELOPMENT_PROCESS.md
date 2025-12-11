# Development Process: Task Tracker

## 1. Starting Point and Planning

The development began with setting up a React + TypeScript project structure using Vite. The first step was to define the core data model - the `Task` interface with properties: `id`, `title`, `description`, `status`, `createdAt`, and `updatedAt`.

Planning followed a component-based approach: breaking the application into reusable components (`TaskForm`, `TaskList`, `TaskItem`, `SearchBar`) and organizing utilities separately. The initial plan focused on implementing CRUD operations with localStorage for data persistence, ensuring a simple yet functional solution without backend complexity.

## 2. Code Organization

The project structure follows React best practices:

```
src/
├── components/     # Reusable UI components
├── types/          # TypeScript type definitions
├── utils/          # Helper functions (storage)
├── App.tsx         # Main application logic
└── App.css         # Global styles
```

This structure was chosen for clarity and maintainability. Components are separated by responsibility, types are centralized, and utilities are isolated for easy testing and reuse. The main `App.tsx` manages state and coordinates between components, following React's unidirectional data flow pattern.

## 3. Challenges and Solutions

**Challenge 1: Task Persistence Issues**
Tasks were disappearing when creating new ones. The problem was caused by incorrect React `key` props that changed when tasks moved between statuses, causing React to re-render incorrectly. **Solution**: Changed keys to use stable `task.id` and implemented functional state updates (`setTasks((prevTasks) => ...)`).

**Challenge 2: UI State Management**
The search bar state wasn't resetting after adding tasks, making new tasks invisible. **Solution**: Added `setSearchQuery("")` to `handleAddTask` and `handleUpdateTask` to ensure all tasks are visible after operations.

**Challenge 3: TypeScript Import Errors**
Vite was reporting import errors for the `Task` type. **Solution**: Changed to `import type` for type-only imports, ensuring proper TypeScript compilation.

## 4. Future Improvements

With more time, I would add:

- **Drag-and-drop functionality** for moving tasks between columns
- **Task filtering** by status, date, or custom tags
- **Export/Import** functionality to save tasks as JSON
- **Dark/Light theme toggle** for better user experience
- **Task priorities** and due dates
- **Backend integration** for multi-user support and cloud sync

## 5. MCP Server Experience

I used two MCP Servers during development:

**GitHub MCP Server**: Configured for repository management and automation, helping with version control and project organization.

**Custom Task Tracker MCP Server**: Created a custom MCP Server using TypeScript and the MCP SDK. The server provides 5 tools: `create_task`, `list_tasks`, `update_task_status`, `delete_task`, and `get_task_statistics`.

**Integration Process:**

1. Set up Node.js project with TypeScript
2. Implemented MCP protocol handlers using the SDK
3. Created JSON file-based storage system
4. Configured the server in `.mcp/task-tracker.json`
5. Tested tools through MCP client

**Challenges:**

- Understanding the MCP protocol structure and request/response schemas
- Configuring the server path correctly for Windows paths
- Ensuring proper error handling for file operations

The MCP Server enables AI tools to programmatically manage tasks, opening possibilities for automation, batch operations, and integration with other tools.
