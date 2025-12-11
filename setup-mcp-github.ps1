# PowerShell script to setup GitHub MCP Server in Cursor
# Run this script as Administrator if needed

Write-Host "Setting up GitHub MCP Server for Cursor..." -ForegroundColor Green

# Get Cursor settings directory
$cursorSettingsPath = "$env:APPDATA\Cursor\User\settings.json"
$cursorDir = Split-Path $cursorSettingsPath -Parent

# Create directory if it doesn't exist
if (-not (Test-Path $cursorDir)) {
    New-Item -ItemType Directory -Path $cursorDir -Force | Out-Null
    Write-Host "Created Cursor settings directory: $cursorDir" -ForegroundColor Yellow
}

# Read current settings or create new
$settings = @{}
if (Test-Path $cursorSettingsPath) {
    try {
        $settings = Get-Content $cursorSettingsPath -Raw | ConvertFrom-Json -AsHashtable
        Write-Host "Found existing Cursor settings" -ForegroundColor Green
    } catch {
        Write-Host "Could not parse existing settings, creating new" -ForegroundColor Yellow
        $settings = @{}
    }
} else {
    Write-Host "Creating new Cursor settings file" -ForegroundColor Yellow
}

# Read GitHub MCP configuration
$mcpConfigPath = ".\.mcp\github.json"
if (Test-Path $mcpConfigPath) {
    $mcpConfig = Get-Content $mcpConfigPath -Raw | ConvertFrom-Json
    Write-Host "Found GitHub MCP configuration" -ForegroundColor Green
    
    # Add MCP servers configuration
    if (-not $settings.ContainsKey("mcpServers")) {
        $settings["mcpServers"] = @{}
    }
    
    # Merge GitHub MCP server configuration
    $settings["mcpServers"]["github"] = $mcpConfig.mcpServers.github
    
    # Save settings
    $settings | ConvertTo-Json -Depth 10 | Set-Content $cursorSettingsPath -Encoding UTF8
    
    Write-Host "GitHub MCP Server configuration added to Cursor settings!" -ForegroundColor Green
    Write-Host "Please restart Cursor for changes to take effect." -ForegroundColor Yellow
} else {
    Write-Host "Error: GitHub MCP configuration file not found at $mcpConfigPath" -ForegroundColor Red
    exit 1
}

Write-Host "`nSetup complete!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Restart Cursor completely" -ForegroundColor White
Write-Host "2. Test by asking AI: 'Create a GitHub issue with title Test'" -ForegroundColor White

