# Automatic GitHub MCP Server Setup

I've created scripts to automatically configure GitHub MCP Server in Cursor.

## 🚀 Quick Setup

### Option 1: PowerShell (Recommended for Windows)

1. Open PowerShell as Administrator (optional, but recommended)
2. Navigate to your project directory:
   ```powershell
   cd C:\Projects\task_tracker
   ```
3. Run the setup script:
   ```powershell
   .\setup-mcp-github.ps1
   ```

### Option 2: Git Bash

1. Open Git Bash
2. Navigate to your project directory:
   ```bash
   cd /c/Projects/task_tracker
   ```
3. Make the script executable and run it:
   ```bash
   chmod +x setup-mcp-github.sh
   ./setup-mcp-github.sh
   ```

## ✅ What the Script Does

1. **Finds Cursor settings directory** (`%APPDATA%\Cursor\User\`)
2. **Reads GitHub MCP configuration** from `.mcp/github.json`
3. **Adds MCP Server configuration** to Cursor settings
4. **Creates backup** of existing settings (if any)

## 🔄 After Running the Script

1. **Restart Cursor completely** (close and reopen)
2. **Test the connection** by asking AI:
   ```
   Create a GitHub issue with title "MCP Server Test"
   ```

## ⚠️ Manual Setup (if scripts don't work)

If the scripts don't work, you can manually add the configuration:

1. Open Cursor
2. Press `Ctrl+,` (or `Cmd+,` on Mac) to open Settings
3. Search for "MCP" or "Model Context Protocol"
4. Find "MCP Servers" section
5. Add this configuration:

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
    }
  }
}
```

6. Restart Cursor

## 🔍 Verification

After setup, you can verify it works by:

1. Asking AI to create a GitHub issue
2. Checking Cursor's MCP Server status (if available in UI)
3. Looking for MCP-related messages in Cursor's developer console

## 📝 Notes

- The token in the configuration is already set up
- The configuration file `.mcp/github.json` is in `.gitignore` (safe)
- You may need to run PowerShell as Administrator for file access

