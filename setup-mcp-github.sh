#!/bin/bash
# Bash script to setup GitHub MCP Server in Cursor (for Git Bash on Windows)

echo "Setting up GitHub MCP Server for Cursor..."

# Get Cursor settings directory (Windows path in Git Bash)
CURSOR_SETTINGS_PATH="$APPDATA/Cursor/User/settings.json"
CURSOR_DIR=$(dirname "$CURSOR_SETTINGS_PATH")

# Create directory if it doesn't exist
if [ ! -d "$CURSOR_DIR" ]; then
    mkdir -p "$CURSOR_DIR"
    echo "Created Cursor settings directory: $CURSOR_DIR"
fi

# Read GitHub MCP configuration
MCP_CONFIG_PATH=".mcp/github.json"

if [ -f "$MCP_CONFIG_PATH" ]; then
    echo "Found GitHub MCP configuration"
    
    # Read the MCP config
    MCP_CONFIG=$(cat "$MCP_CONFIG_PATH")
    
    # Check if settings.json exists
    if [ -f "$CURSOR_SETTINGS_PATH" ]; then
        echo "Found existing Cursor settings"
        # Merge configurations (this is a simple merge, may need jq for complex cases)
        # For now, we'll create a backup and add the MCP config
        cp "$CURSOR_SETTINGS_PATH" "$CURSOR_SETTINGS_PATH.backup"
        echo "Backup created: $CURSOR_SETTINGS_PATH.backup"
    fi
    
    # Create or update settings.json with MCP configuration
    # Note: This is a simplified version. For production, use jq for proper JSON merging
    echo "$MCP_CONFIG" > "$CURSOR_SETTINGS_PATH"
    
    echo "GitHub MCP Server configuration added to Cursor settings!"
    echo "Please restart Cursor for changes to take effect."
else
    echo "Error: GitHub MCP configuration file not found at $MCP_CONFIG_PATH"
    exit 1
fi

echo ""
echo "Setup complete!"
echo "Next steps:"
echo "1. Restart Cursor completely"
echo "2. Test by asking AI: 'Create a GitHub issue with title Test'"

