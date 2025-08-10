# حل بديل لبناء APK

بما أن هناك مشاكل في إعداد Gradle، إليك حلول بديلة:

## الحل الأول: استخدام Expo

1. **تحويل المشروع إلى Expo:**
   ```bash
   npx create-expo-app@latest labobo-expo --template blank-typescript
   ```

2. **نقل الكود إلى مشروع Expo الجديد**

3. **بناء APK باستخدام Expo:**
   ```bash
   npx expo build:android
   ```

## الحل الثاني: استخدام React Native CLI مع إعدادات مبسطة

1. **تثبيت Android Studio**
2. **تثبيت Android SDK**
3. **تعيين متغيرات البيئة:**
   ```bash
   ANDROID_HOME=C:\Users\USERNAME\AppData\Local\Android\Sdk
   JAVA_HOME=C:\Program Files\Java\jdk-11
   ```

## الحل الثالث: استخدام خدمة بناء عبر الإنترنت

يمكنك استخدام خدمات مثل:
- **Expo Application Services (EAS)**
- **App Center Build**
- **Bitrise**

## الحل الرابع: استخدام Docker

```dockerfile
FROM openjdk:11-jdk

RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Android SDK
ENV ANDROID_HOME /opt/android-sdk
RUN mkdir -p ${ANDROID_HOME} && cd ${ANDROID_HOME}
RUN curl -o sdk.zip https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip
RUN unzip sdk.zip && rm sdk.zip

# Build APK
WORKDIR /app
COPY . .
RUN ./gradlew assembleRelease
```

## الحل الخامس: استخدام GitHub Actions

إنشاء ملف `.github/workflows/build.yml`:

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up JDK 11
      uses: actions/setup-java@v2
      with:
        java-version: '11'
        distribution: 'adopt'
    
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build APK
      run: |
        npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
        cd android
        ./gradlew assembleRelease
    
    - name: Upload APK
      uses: actions/upload-artifact@v2
      with:
        name: app-release
        path: android/app/build/outputs/apk/release/app-release.apk
```

## الحل السادس: استخدام خدمة بناء محلية

إذا كان لديك جهاز آخر مع إعدادات Android كاملة، يمكنك:

1. **نقل المشروع** إلى الجهاز الآخر
2. **بناء APK** هناك
3. **نقل ملف APK** إلى جهازك

## التوصية

**الحل الأفضل هو استخدام Expo** لأنه:
- أسهل في الإعداد
- لا يحتاج إلى إعدادات Android معقدة
- يدعم جميع الميزات التي نحتاجها
- يمكن بناء APK عبر الإنترنت

هل تريد أن أساعدك في تحويل المشروع إلى Expo؟ 