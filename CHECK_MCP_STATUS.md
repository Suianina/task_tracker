# How to Check if GitHub MCP Server is Working

## ⚠️ Important Note

The file `.mcp/github.json` contains the configuration, but **Cursor needs this configuration to be added in its settings**.

## ✅ Step-by-Step Verification

### Step 1: Add Configuration to Cursor Settings

1. Open Cursor
2. Go to **Settings** (Ctrl+, or Cmd+,)
3. Search for **"MCP"** or **"Model Context Protocol"**
4. Find the **MCP Servers** section
5. Add the configuration from `.mcp/github.json`:

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

### Step 2: Restart Cursor

**Important:** After adding the configuration, you **must restart Cursor** completely.

### Step 3: Test the Connection

After restarting, try asking the AI:

```
Create a test GitHub issue with title "MCP Server Test" 
and description "Testing GitHub MCP Server connection"
```

Or:

```
Check the status of the Suianina/task_tracker repository
```

### Step 4: Check MCP Server Status

1. Open Cursor
2. Look for MCP Server status indicators (usually in the status bar or settings)
3. Check if there are any error messages related to MCP

## 🔍 Alternative Verification Methods

### Method 1: Check Cursor Logs

1. Open Cursor
2. Go to **Help** → **Toggle Developer Tools**
3. Check the Console for MCP-related messages
4. Look for errors or connection status

### Method 2: Test Token Validity

The GitHub token in the configuration should have:
- `repo` scope - for repository access
- `workflow` scope - for GitHub Actions

You can verify the token at: https://github.com/settings/tokens

## ❌ Common Issues

### Issue 1: MCP Server Not Found
**Solution:** Make sure `npx` is available and can run `@modelcontextprotocol/server-github`

### Issue 2: Token Invalid
**Solution:** Generate a new GitHub Personal Access Token with required permissions

### Issue 3: Configuration Not Applied
**Solution:** 
- Make sure you added it to Cursor settings (not just the file)
- Restart Cursor completely
- Check for typos in the configuration

## 📝 Current Configuration Status

✅ Configuration file exists: `.mcp/github.json`
✅ Token is present in the file
✅ Format is correct
⚠️ **Needs to be added to Cursor settings**
⚠️ **Cursor needs to be restarted**

## 🎯 Next Steps

1. Add the configuration to Cursor settings
2. Restart Cursor
3. Test with a simple request like creating a GitHub issue
4. If it works, you'll see the AI can interact with GitHub!

