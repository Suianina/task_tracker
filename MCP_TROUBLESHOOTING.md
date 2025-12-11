# MCP Servers Troubleshooting Guide

## Common MCP Server Errors and Solutions

### Error 1: MCP Server Not Found / Cannot Start

**Symptoms:**
- Cursor shows "MCP Server not found" error
- Server fails to start

**Solutions:**

1. **Check if MCP server is built:**
   ```bash
   cd mcp-server
   npm run build
   ```

2. **Verify file exists:**
   - Check that `mcp-server/dist/index.js` exists
   - Verify the path in `.mcp/task-tracker.json` is correct

3. **Check Node.js is installed:**
   ```bash
   node --version
   ```
   Should be Node.js 18.0 or higher

### Error 2: Invalid Configuration / JSON Parse Error

**Symptoms:**
- "Invalid JSON" or "Configuration error"
- MCP Server configuration not loading

**Solutions:**

1. **Validate JSON files:**
   ```powershell
   # Check github.json
   Get-Content .mcp\github.json | ConvertFrom-Json
   
   # Check task-tracker.json
   Get-Content .mcp\task-tracker.json | ConvertFrom-Json
   ```

2. **Fix common JSON issues:**
   - Ensure no trailing commas
   - Check all quotes are properly closed
   - Verify no comments in JSON (JSON doesn't support comments)

3. **Check file encoding:**
   - Files should be UTF-8 encoded
   - No BOM (Byte Order Mark)

### Error 3: Path Issues / File Not Found

**Symptoms:**
- "File not found" errors
- Path resolution issues on Windows

**Solutions:**

1. **For Windows paths in task-tracker.json:**
   - Use forward slashes: `C:/Projects/task_tracker/...`
   - Or use double backslashes: `C:\\Projects\\task_tracker\\...`
   - Avoid single backslashes: `C:\Projects\task_tracker\...` (may cause issues)

2. **Use absolute paths:**
   ```json
   {
     "mcpServers": {
       "task-tracker": {
         "command": "node",
         "args": ["C:/Projects/task_tracker/mcp-server/dist/index.js"],
         "env": {
           "TASK_TRACKER_STORAGE_PATH": "C:/Projects/task_tracker/task-tracker-data.json"
         }
       }
     }
   }
   ```

3. **Verify paths exist:**
   ```powershell
   Test-Path "C:/Projects/task_tracker/mcp-server/dist/index.js"
   ```

## Step-by-Step Fix for All 3 Errors

### Step 1: Rebuild MCP Server

```bash
cd mcp-server
npm install
npm run build
```

### Step 2: Verify Configuration Files

**Check `.mcp/github.json`:**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

**Check `.mcp/task-tracker.json`:**
```json
{
  "mcpServers": {
    "task-tracker": {
      "command": "node",
      "args": ["C:/Projects/task_tracker/mcp-server/dist/index.js"],
      "env": {
        "TASK_TRACKER_STORAGE_PATH": "C:/Projects/task_tracker/task-tracker-data.json"
      }
    }
  }
}
```

### Step 3: Add Configuration to Cursor

1. Open Cursor Settings (`Ctrl+,`)
2. Search for "MCP" or "Model Context Protocol"
3. Find "MCP Servers" section
4. Add both configurations from `.mcp/github.json` and `.mcp/task-tracker.json`

**OR** merge them into one configuration:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_TOKEN_HERE"
      }
    },
    "task-tracker": {
      "command": "node",
      "args": ["C:/Projects/task_tracker/mcp-server/dist/index.js"],
      "env": {
        "TASK_TRACKER_STORAGE_PATH": "C:/Projects/task_tracker/task-tracker-data.json"
      }
    }
  }
}
```

### Step 4: Restart Cursor

**Important:** After making changes, completely close and reopen Cursor.

### Step 5: Check Cursor Logs

1. Open Cursor
2. Go to **Help** → **Toggle Developer Tools**
3. Check Console for MCP-related errors
4. Look for specific error messages

## Verification

After fixing, test both MCP Servers:

### Test GitHub MCP Server:
```
Create a GitHub issue with title "MCP Test"
```

### Test Task Tracker MCP Server:
```
Create a task "Test MCP" with status "To Do"
```

## Additional Resources

- See `GITHUB_MCP_INSTRUCTIONS.md` for GitHub MCP Server usage
- See `MCP_SERVER_DOCUMENTATION.md` for Task Tracker MCP Server details
- See `HOW_TO_RUN_SCRIPT.md` for automatic setup

## Still Having Issues?

1. Check Cursor version (should be latest)
2. Verify Node.js version (18.0+)
3. Check if npx is available: `npx --version`
4. Review Cursor's MCP Server documentation
5. Check GitHub issues in Cursor repository

