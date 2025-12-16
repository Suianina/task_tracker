# Instructions: How to Use GitHub MCP Server

## ✅ Setup Status

GitHub MCP Server is **configured** in your project! The configuration file is located at `.mcp/github.json`.

## 🔧 What Does GitHub MCP Server Do?

GitHub MCP Server allows the AI assistant (Claude in Cursor) to directly work with your GitHub repository:

- 📂 Read repository structure
- 🔍 Search code in the repository
- 📝 Create and manage GitHub Issues
- 🔄 View and create Pull Requests
- 📊 Check GitHub Actions status
- 📄 Analyze code in the repository

## 🚀 How to Use?

### Option 1: Through AI Chat in Cursor

Simply write requests in Ukrainian or English, and the AI will be able to use GitHub MCP Server:

**Example Requests:**

1. **Create GitHub Issue:**

   ```
   Create a GitHub issue with title "Add drag-and-drop for tasks"
   and description "Implement ability to drag tasks between status columns"
   ```

2. **Check Repository Status:**

   ```
   Check the status of the task_tracker repository on GitHub
   ```

3. **Find Code:**

   ```
   Find all files where the handleAddTask function is used
   ```

4. **Create Pull Request:**
   ```
   Create a pull request for changes in the dev branch
   ```

### Option 2: Through Commands in Cursor

1. Open AI chat (Ctrl+L or Cmd+L)
2. Write a request that requires working with GitHub
3. AI will automatically use GitHub MCP Server if needed

## ⚙️ Configuration (if you need to change)

Configuration file: `.mcp/github.json`

**Important:** After changing the configuration, you need to **restart Cursor**.

## 🔐 Security

- ✅ File `.mcp/github.json` is added to `.gitignore` - the token will not be committed
- ⚠️ The token is stored locally on your computer
- 🔒 Use the token only for your repository

## ❓ How to Check if It Works?

Try asking the AI:

```
Create a GitHub issue with title "MCP Server Test"
```

If the AI can create the issue, it means GitHub MCP Server is working correctly!

## 📚 Additional Information

For more details about using GitHub MCP Server, see the `MCP_INTEGRATION.md` file.
