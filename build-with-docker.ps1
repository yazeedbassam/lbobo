Write-Host "Building Labobo Coloring App APK using Docker..." -ForegroundColor Green

# Check if Docker is installed
try {
    $dockerVersion = docker --version
    Write-Host "Docker found: $dockerVersion" -ForegroundColor Cyan
}
catch {
    Write-Host "ERROR: Docker is not installed or not running" -ForegroundColor Red
    Write-Host "Please install Docker Desktop from https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    Read-Host "Press Enter to continue"
    exit 1
}

# Create output directory
if (!(Test-Path "output")) {
    New-Item -ItemType Directory -Path "output" -Force
    Write-Host "Created output directory" -ForegroundColor Cyan
}

# Build APK using Docker
Write-Host "Starting Docker build..." -ForegroundColor Yellow
docker-compose up --build

# Check if APK was created
if (Test-Path "output\app-release.apk") {
    Write-Host ""
    Write-Host "SUCCESS! APK created successfully!" -ForegroundColor Green
    Write-Host "Location: output\app-release.apk" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "You can now install this APK on your Android device." -ForegroundColor White
    
    # Show file size
    $fileSize = (Get-Item "output\app-release.apk").Length
    $fileSizeMB = [math]::Round($fileSize / 1MB, 2)
    Write-Host "File size: $fileSizeMB MB" -ForegroundColor Gray
}
else {
    Write-Host ""
    Write-Host "ERROR: Failed to create APK" -ForegroundColor Red
    Write-Host "Please check the Docker logs above for errors." -ForegroundColor Red
}

# Clean up Docker containers
Write-Host "Cleaning up Docker containers..." -ForegroundColor Yellow
docker-compose down

Read-Host "Press Enter to continue" 