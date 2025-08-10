@echo off
echo Building Labobo Coloring App APK...

REM Create assets directory if it doesn't exist
if not exist "android\app\src\main\assets" mkdir "android\app\src\main\assets"

REM Bundle JavaScript
echo Creating JavaScript bundle...
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

REM Build APK using Gradle
echo Building APK...
cd android
gradlew.bat assembleRelease

REM Check if build was successful
if exist "app\build\outputs\apk\release\app-release.apk" (
    echo.
    echo SUCCESS! APK created successfully!
    echo Location: android\app\build\outputs\apk\release\app-release.apk
    echo.
    echo You can now install this APK on your Android device.
) else (
    echo.
    echo ERROR: Failed to create APK
    echo Please check the build logs above for errors.
)

pause 