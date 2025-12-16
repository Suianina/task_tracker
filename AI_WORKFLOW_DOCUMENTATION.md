# AI Workflow Documentation for Task Tracker Development

## 1. Which AI Tools Were Used?

**Primary Tool: Cursor (AI-IDE)**

I used **Cursor** as the main AI tool for development. Cursor is an AI-powered code editor that integrates directly with the IDE.

### Why Cursor Was Chosen:

- **Direct IDE Integration**: Works directly in the code editor, allowing real-time code generation and editing
- **Project Context**: Has access to the entire project, enabling code that matches existing architecture
- **Fast Development**: Quickly generates components, types, and utilities without switching between tools
- **TypeScript Support**: Excellent understanding of TypeScript and generates properly typed code
- **Error Detection**: Automatically identifies and fixes bugs, linting errors, and type issues

**Additional Tools:**

- **ChatGPT**: Used for documentation writing and text improvement
- **Claude Code**: Used for quick technical clarifications

## 2. What Tasks Were Solved with AI?

### Example 1: Code Generation - Creating Project Structure

**Task**: Create a complete React + TypeScript application structure with all necessary components.

**What AI Did**: Cursor generated the entire project structure:

- TypeScript types (`Task`, `TaskStatus`)
- React components (`TaskForm`, `TaskItem`, `TaskList`, `SearchBar`)
- Utility functions for localStorage
- Main App component with CRUD logic
- CSS styling

**Result**: Complete working application structure created.

### Example 2: Bug Fixing - Task Persistence Issue

**Task**: Fix a bug where tasks disappeared when creating new ones.

**What AI Did**: Cursor identified the issue (incorrect React key props and state update logic), fixed the key prop strategy, and implemented functional state updates.

**Result**: Bug fixed successfully.

### Example 3: Error Correction - TypeScript and ESLint Errors

**Task**: Fix TypeScript compilation errors and ESLint warnings.

**What AI Did**: Cursor automatically detected and fixed:

- Type import errors (changed to `import type`)
- ESLint warning about `setState` in `useEffect` (changed to lazy initialization)
- All type safety issues

**Result**: All errors fixed successfully.

## 3. Example Prompts

### Prompt 1: Creating TypeScript Types

**Prompt**:

```
Create TypeScript types for Task Tracker:
- TaskStatus: 'To Do' | 'In Progress' | 'Done'
- Task: id, title, description, status, createdAt, updatedAt
```

**Response**: Cursor created clear TypeScript types using union types for statuses and an interface for the task with proper typing.

**What I Got**: Complete type definitions that ensured type safety throughout the application.

### Prompt 2: Fixing Task Persistence Bug

**Prompt**:

```
When you create a new task, the old one deletes itself, and the new one either saves or doesn't display. This is incorrect. It should be: created a task, wanted to move it, wanted to create another task, all tasks should be saved, moved, and codes should be deleted as needed when pressed
```

**Response**: Cursor fixed the key prop issue in TaskList component (changed from `${status}-${task.id}` to `task.id`) and ensured functional state updates are used correctly.

**What I Got**: Fixed code that properly maintains all tasks and allows them to be moved between status columns without disappearing.

### Prompt 3: Fixing ESLint Warning

**Prompt**:

```
Fix ESLint warning: "Calling setState synchronously within an effect can trigger cascading renders"
```

**Response**: Cursor changed the state initialization from:

```typescript
const [tasks, setTasks] = useState<Task[]>([]);
useEffect(() => {
  setTasks(loadTasks());
}, []);
```

to lazy initialization:

```typescript
const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
```

**What I Got**: Optimized code that avoids unnecessary re-renders and improves performance.

## 4. What did you learn?

### New Approaches and Techniques Learned:

1. **Functional State Updates**: Using `setState((prev) => ...)` ensures state updates always use the most recent state, preventing stale closures and bugs.

2. **React Key Prop Strategy**: Using stable, unique keys (like `task.id`) instead of composite keys (like `${status}-${task.id}`) helps React correctly track components when they move between different parts of the UI.

3. **Controlled Components**: Making components controlled (receiving value from parent) ensures state synchronization and UI consistency.

### How AI Helped Speed Up Development:

- **Bug Fixes**: 10x faster (hours → minutes)
- **Code Generation**: 12x faster (manual creation → AI generation)
- **Error Resolution**: 8-10x faster (research → immediate fix)
- **Code Quality**: 10x faster (manual checks → automatic detection)

**Overall**: Development was approximately **4-5 times faster** compared to traditional methods.

## 5. Difficulties and Solutions

### Problem 1: Task Title Changing on Status Update

**Difficulty**: When moving tasks between status columns, task titles were incorrectly changing.

**How I Identified It**: During testing, I noticed task titles changed when changing status.

**Solution**: I reported the issue to Cursor with a clear description. Cursor fixed it by using functional state updates and changing the key prop strategy to use stable `task.id` instead of `${status}-${task.id}`.

**Prompt Used**: "When checking, I noticed that when you move a task, for example from 'to do' to 'done', the task's title changes, this is incorrect, it needs to be fixed"

### Problem 2: Tasks Not Persisting

**Difficulty**: Tasks were disappearing when adding new ones, requiring page reload to see all tasks.

**How I Identified It**: Through testing, I discovered that after creating a new task, old tasks disappeared.

**Solution**: I described the problem clearly to Cursor. Cursor fixed the key prop usage and ensured functional state updates are used correctly. I tested the solution and adapted the logic.

**Prompt Used**: "When you create a new task, the old one deletes itself, and the new one either saves or doesn't display. This is incorrect. It should be: created a task, wanted to move it, wanted to create another task, all tasks should be saved, moved, and codes should be deleted as needed when pressed"

### Problem 3: TypeScript and ESLint Errors

**Difficulty**: Multiple TypeScript compilation errors and ESLint warnings.

**Solution**: Cursor automatically detected and fixed all errors:

- Changed type imports to use `import type`
- Fixed ESLint warning by using lazy state initialization
- Added proper type checks

**Result**: All errors resolved, code became more type-safe and performant.

## Conclusion

Using Cursor AI significantly accelerated the Task Tracker development while maintaining high code quality. The main benefits were:

- **Speed**: Creating project structure and fixing bugs in minutes instead of hours
- **Quality**: Generating typed, structured code with best practices
- **Learning**: Learning new approaches through AI explanations and examples
- **Efficiency**: Automatic error detection and fixes

The key to effective AI use was:

- Formulating problems clearly
- Testing all AI-generated code
- Understanding what changes were being made
- Maintaining active control over the development process
