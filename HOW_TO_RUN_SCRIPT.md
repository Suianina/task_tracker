# How to Run PowerShell Script

## 🚀 Quick Method (via PowerShell)

### Step 1: Open PowerShell

1. Press `Win + X`
2. Select **"Windows PowerShell"** or **"Terminal"**
3. Or press `Win + R`, type `powershell` and press Enter

### Step 2: Navigate to Project Folder

```powershell
cd C:\Projects\task_tracker
```

### Step 3: Run the Script

```powershell
.\setup-mcp-github.ps1
```

If you get an Execution Policy error, run:

```powershell
powershell -ExecutionPolicy Bypass -File setup-mcp-github.ps1
```

## ✅ What Should Happen

After running the script, you should see:

```
Setting up GitHub MCP Server for Cursor...
Found GitHub MCP configuration
GitHub MCP Server configuration added to Cursor settings!
Please restart Cursor for changes to take effect.

Setup complete!
```

## 📝 Alternative Method (Manual)

If the script doesn't work, you can add the configuration manually:

### Step 1: Open Cursor Settings

1. Open Cursor
2. Press `Ctrl + ,` (comma) to open settings
3. In the search box, type: `MCP` or `Model Context Protocol`

### Step 2: Find MCP Servers Section

Find the **"MCP Servers"** section in settings

### Step 3: Add Configuration

Open the `cursor-settings-mcp.json` file in your project and copy its content into Cursor settings.

Or add manually:

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

### Step 4: Restart Cursor

**Important:** After adding the configuration, completely close and reopen Cursor.

## 🧪 Testing

After restarting Cursor, try asking the AI:

```
Create a GitHub issue with title "MCP Server Test"
```

If the AI can create the issue, everything is working! ✅

## ❓ Troubleshooting

### "Execution Policy" Error

If you see an Execution Policy error, run PowerShell as Administrator and execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run the script again.

### File Not Found

Make sure you're in the correct folder:

```powershell
cd C:\Projects\task_tracker
ls setup-mcp-github.ps1
```

If the file is not found, check that you're in the correct directory.
