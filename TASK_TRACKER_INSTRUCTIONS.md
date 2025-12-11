# Task Tracker - Team Instructions

## 1. Brief Description

### What is this application?

**Task Tracker** is a simple web application for task management, built with React and TypeScript. The application allows you to create, edit, delete, and track the status of your tasks.

### What is it for?

- Organization of personal or team tasks
- Tracking task completion progress
- Simple and intuitive task management without complex setup
- Visual display of tasks by status (To Do / In Progress / Done)

## 2. How to Install and Run

### Requirements

Before installation, make sure you have installed:

- **Node.js** version 18.0 or higher
- **npm** (installed with Node.js) or **yarn**

You can check the version with commands:

```bash
node --version
npm --version
```

### Step-by-Step Instructions

1. **Clone the repository** (if working with Git):

   ```bash
   git clone <repository-url>
   cd task_tracker
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:
   - After starting, a URL will appear in the terminal (usually `http://localhost:5173`)
   - Open this URL in your browser

### Commands to Run

```bash
# Start development server
npm run dev

# Create production build
npm run build

# Preview production build
npm run preview

# Code check (linting)
npm run lint
```

## 3. How to Use

### How to Add a Task

1. Click the **"+ Add New Task"** button at the top of the page
2. Fill out the form:
   - **Task Title** (required field) - enter a short task name
   - **Description** (optional) - add a detailed task description
   - **Status** - select the initial status (To Do / In Progress / Done)
3. Click the **"Add Task"** button

### How to Change Status

There are two ways to change a task's status:

**Method 1: Using the dropdown list**

- Find the task in the list
- Select a new status from the dropdown list at the bottom of the task card
- The status will change automatically

**Method 2: During editing**

- Open the task editing form
- Change the status in the corresponding field
- Save the changes

### How to Edit a Task

1. Find the task you want to edit
2. Click the **"Edit"** button on the task card
3. The form will open with the task data filled in
4. Make the necessary changes
5. Click the **"Update Task"** button
6. Or click **"Cancel"** to cancel the changes

### How to Delete a Task

1. Find the task you want to delete
2. Click the **"Delete"** button on the task card
3. Confirm deletion in the dialog window
4. The task will be permanently deleted

### Task Search

- Use the search field at the top of the page
- Enter text to search by task title or description
- Results are filtered automatically as you type

### Task Organization

Tasks are automatically organized by status into three columns:

- **To Do** - tasks that need to be completed
- **In Progress** - tasks currently in progress
- **Done** - completed tasks

Each column shows the number of tasks in parentheses.

## 4. FAQ (Frequently Asked Questions)

### Where is data stored?

All tasks are stored locally in your browser's **localStorage**. This means:

- Data is stored only on your computer
- Data is not synchronized between devices
- Data is not sent to a server
- Data is saved automatically with every change

### How to reset all tasks?

Currently, there is no built-in function to reset all tasks. You can:

1. Delete data through browser developer tools:
   - Open DevTools (F12)
   - Go to the "Application" tab (Chrome) or "Storage" tab (Firefox)
   - Find "Local Storage" → your domain
   - Delete the `task_tracker_tasks` key
2. Or delete tasks manually one by one

### Can I export tasks?

Currently, the export function is not implemented. All data is available through localStorage in JSON format.

### Does the application work offline?

Yes! Since data is stored locally, the application works completely offline after the first load.

### Can I use it on mobile devices?

Yes, the application has a responsive design and works on mobile devices. Simply open the URL in a mobile browser.

## 5. Contacts for Help

If you encounter problems or have questions:

1. **Check the documentation**: Read this instruction and other documents in the repository (README.md, DEVELOPMENT_PROCESS.md)
2. **Check Issues**: See if your problem has been discussed before on GitHub
3. **Create an Issue**: If the problem is not resolved, create a new issue with a description of the problem
4. **Contact the team**: Write to the development team through the appropriate communication channels

### When creating an Issue, please specify:

- Node.js version (`node --version`)
- npm version (`npm --version`)
- Operating system
- Problem description and steps to reproduce
- Screenshots (if applicable)
- Browser console errors (if any)

---

**Enjoy using Task Tracker!** 🚀
