@echo off
echo Building Labobo Coloring App APK using Docker...

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not installed or not running
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Create output directory
if not exist "output" mkdir output

REM Build APK using Docker
echo Starting Docker build...
docker-compose up --build

REM Check if APK was created
if exist "output\app-release.apk" (
    echo.
    echo SUCCESS! APK created successfully!
    echo Location: output\app-release.apk
    echo.
    echo You can now install this APK on your Android device.
) else (
    echo.
    echo ERROR: Failed to create APK
    echo Please check the Docker logs above for errors.
)

REM Clean up Docker containers
docker-compose down

pause 