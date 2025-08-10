# بناء APK عبر الإنترنت - دليل سريع

## الطريقة الأولى: استخدام Expo (الأسهل)

### 1. إنشاء حساب Expo
- اذهب إلى [expo.dev](https://expo.dev)
- أنشئ حساب جديد

### 2. تحويل المشروع إلى Expo
```bash
# تثبيت Expo CLI
npm install -g @expo/cli

# إنشاء مشروع Expo جديد
npx create-expo-app@latest labobo-expo --template blank-typescript

# نقل الكود من المشروع الحالي
```

### 3. بناء APK عبر الإنترنت
```bash
# تسجيل الدخول إلى Expo
expo login

# بناء APK
eas build --platform android
```

## الطريقة الثانية: استخدام App Center

### 1. إنشاء حساب App Center
- اذهب إلى [appcenter.ms](https://appcenter.ms)
- أنشئ حساب جديد

### 2. رفع المشروع
- ارفع المشروع إلى GitHub
- اربط المشروع بـ App Center

### 3. بناء APK
- اختر "Build" من القائمة
- اختر "Android" كمنصة
- اضغط "Build"

## الطريقة الثالثة: استخدام GitHub Actions

### 1. إنشاء ملف workflow
أنشئ ملف `.github/workflows/build.yml`:

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

### 2. رفع المشروع إلى GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/labobo-coloring-app.git
git push -u origin main
```

## الطريقة الرابعة: استخدام Bitrise

### 1. إنشاء حساب Bitrise
- اذهب إلى [bitrise.io](https://bitrise.io)
- أنشئ حساب جديد

### 2. ربط المشروع
- اربط حساب GitHub
- اختر المشروع
- اختر "Android" كمنصة

### 3. بناء APK
- اضغط "Start a Build"
- انتظر حتى ينتهي البناء
- حمل ملف APK

## التوصية السريعة

**للحصول على APK بسرعة، استخدم Expo:**

1. **انسخ هذا الأمر:**
   ```bash
   npx create-expo-app@latest labobo-expo --template blank-typescript
   ```

2. **انتقل إلى المجلد الجديد:**
   ```bash
   cd labobo-expo
   ```

3. **انسخ الملفات من المشروع الحالي:**
   - انسخ مجلد `src/`
   - انسخ `package.json` (عدّل التبعيات)
   - انسخ `App.tsx`

4. **ثبت التبعيات:**
   ```bash
   npm install
   ```

5. **ابنِ APK:**
   ```bash
   npx expo build:android
   ```

## ملاحظات مهمة

- **Expo** هو الأسرع والأسهل
- **App Center** مجاني للمشاريع الصغيرة
- **GitHub Actions** مجاني للمشاريع العامة
- **Bitrise** يحتاج إلى حساب مدفوع للمشاريع الكبيرة

## الدعم

إذا واجهت أي مشاكل:
- [Expo Documentation](https://docs.expo.dev/)
- [App Center Documentation](https://docs.microsoft.com/en-us/appcenter/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions) 