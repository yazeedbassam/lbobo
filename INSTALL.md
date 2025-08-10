# تعليمات تثبيت وتشغيل تطبيق تلوين لابوبو 🚀

## المتطلبات الأساسية

### 1. Node.js
- تثبيت Node.js الإصدار 16 أو أحدث
- تحميل من: https://nodejs.org/

### 2. Java Development Kit (JDK)
- تثبيت JDK 11 أو أحدث
- تحميل من: https://adoptium.net/

### 3. Android Studio
- تثبيت Android Studio
- تحميل من: https://developer.android.com/studio
- تثبيت Android SDK
- إعداد متغيرات البيئة

### 4. React Native CLI
```bash
npm install -g @react-native-community/cli
```

## خطوات التثبيت

### 1. تثبيت التبعيات
```bash
cd LaboboColoringApp
npm install
```

### 2. تثبيت التبعيات للأندرويد
```bash
cd android
./gradlew clean
cd ..
```

### 3. تشغيل التطبيق

#### تشغيل Metro Bundler
```bash
npm start
```

#### تشغيل على الأندرويد
```bash
npm run android
```

## بناء ملف APK

### 1. بناء APK للإنتاج
```bash
npm run build:apk
```

### 2. موقع ملف APK
```
android/app/build/outputs/apk/release/app-release.apk
```

## إعداد Google Sign-In

### 1. إنشاء مشروع في Google Cloud Console
- اذهب إلى: https://console.cloud.google.com/
- أنشئ مشروع جديد
- فعّل Google Sign-In API

### 2. إنشاء OAuth 2.0 credentials
- اذهب إلى Credentials
- أنشئ OAuth 2.0 Client ID
- اختر Android كمنصة
- أدخل package name: `com.labobocoloringapp`

### 3. تحديث الكود
- افتح `src/App.tsx`
- ابحث عن `YOUR_WEB_CLIENT_ID`
- استبدله بـ Client ID الذي حصلت عليه

## استكشاف الأخطاء

### مشاكل شائعة

#### 1. خطأ في Metro Bundler
```bash
npx react-native start --reset-cache
```

#### 2. خطأ في Gradle
```bash
cd android
./gradlew clean
cd ..
```

#### 3. خطأ في Node Modules
```bash
rm -rf node_modules
npm install
```

#### 4. خطأ في Android Build
- تأكد من تثبيت Android SDK
- تأكد من إعداد متغيرات البيئة
- تأكد من تثبيت JDK

## معلومات إضافية

### هيكل المشروع
```
LaboboColoringApp/
├── src/
│   ├── App.tsx              # الملف الرئيسي
│   ├── screens/             # شاشات التطبيق
│   ├── components/          # المكونات
│   └── assets/              # الصور والموارد
├── android/                 # ملفات الأندرويد
├── package.json            # تبعيات المشروع
└── README.md              # وثائق المشروع
```

### الأوامر المفيدة

```bash
# تشغيل التطبيق
npm run android

# بناء APK
npm run build:apk

# تشغيل Metro مع إعادة تعيين الكاش
npx react-native start --reset-cache

# تنظيف مشروع الأندرويد
cd android && ./gradlew clean && cd ..

# تثبيت التبعيات من جديد
rm -rf node_modules && npm install
```

## الدعم

للحصول على المساعدة:
- واتساب: `00962776619258`
- البريد الإلكتروني: support@labobo.com

---

**تم التطوير بـ ❤️ للأطفال العرب** 