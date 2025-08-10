# دليل بناء ملف APK لتطبيق تلوين لابوبو

## المتطلبات الأساسية

1. **Node.js** (الإصدار 16 أو أحدث)
2. **npm** أو **yarn**
3. **Java Development Kit (JDK)** الإصدار 11 أو أحدث
4. **Android Studio** (اختياري، للتحكم في الإعدادات)

## خطوات البناء

### الطريقة الأولى: استخدام Scripts الجاهزة

#### في Windows (PowerShell):
```powershell
.\build-apk.ps1
```

#### في Windows (Command Prompt):
```cmd
build-apk.bat
```

### الطريقة الثانية: البناء اليدوي

1. **تثبيت التبعيات:**
   ```bash
   npm install
   ```

2. **إنشاء مجلد assets:**
   ```bash
   mkdir -p android/app/src/main/assets
   ```

3. **إنشاء JavaScript bundle:**
   ```bash
   npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
   ```

4. **بناء APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

## موقع ملف APK

بعد البناء الناجح، ستجد ملف APK في:
```
android/app/build/outputs/apk/release/app-release.apk
```

## تثبيت APK على الجهاز

1. **تفعيل "مصادر غير معروفة"** في إعدادات Android
2. **نقل ملف APK** إلى الجهاز
3. **فتح ملف APK** وتثبيته

## استكشاف الأخطاء

### مشكلة Gradle:
إذا واجهت مشاكل مع Gradle، تأكد من:
- تثبيت JDK بشكل صحيح
- تعيين متغير JAVA_HOME
- وجود ملف gradle-wrapper.jar

### مشكلة Android SDK:
إذا واجهت مشاكل مع Android SDK:
- تثبيت Android Studio
- تثبيت Android SDK
- تعيين متغير ANDROID_HOME

### مشكلة الذاكرة:
إذا واجهت مشاكل في الذاكرة:
```bash
export GRADLE_OPTS="-Xmx2048m -XX:MaxPermSize=512m"
```

## ملاحظات مهمة

- ملف APK المُنشأ مُوقع بـ debug keystore
- للاستخدام التجاري، تحتاج إلى keystore خاص
- حجم APK يعتمد على التبعيات المستخدمة
- تأكد من اختبار التطبيق قبل النشر

## الدعم

إذا واجهت أي مشاكل، راجع:
- [React Native Documentation](https://reactnative.dev/docs/signed-apk-android)
- [Android Developer Documentation](https://developer.android.com/guide/app-bundle) 