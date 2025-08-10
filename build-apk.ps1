Write-Host "Building Labobo Coloring App APK..." -ForegroundColor Green

# Create assets directory if it doesn't exist
if (!(Test-Path "android\app\src\main\assets")) {
    New-Item -ItemType Directory -Path "android\app\src\main\assets" -Force
}

# Bundle JavaScript
Write-Host "Creating JavaScript bundle..." -ForegroundColor Yellow
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Build APK using Gradle
Write-Host "Building APK..." -ForegroundColor Yellow
Set-Location android
./gradlew.bat assembleRelease

# Check if build was successful
if (Test-Path "app\build\outputs\apk\release\app-release.apk") {
    Write-Host ""
    Write-Host "SUCCESS! APK created successfully!" -ForegroundColor Green
    Write-Host "Location: android\app\build\outputs\apk\release\app-release.apk" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "You can now install this APK on your Android device." -ForegroundColor White
}
else {
    Write-Host ""
    Write-Host "ERROR: Failed to create APK" -ForegroundColor Red
    Write-Host "Please check the build logs above for errors." -ForegroundColor Red
}

Set-Location ..
Read-Host "Press Enter to continue" 