# 🎯 دليل سريع لبناء APK - تطبيق تلوين لابوبو

## ⚡ الطريقة الأسرع (5 دقائق)

### 1. رفع المشروع إلى GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/labobo-coloring-app.git
git push -u origin main
```

### 2. تفعيل GitHub Actions
- اذهب إلى GitHub repository
- اذهب إلى تبويب "Actions"
- اضغط "Run workflow"
- اختر "Build Android APK"
- اضغط "Run workflow"

### 3. انتظار البناء (5-10 دقائق)
- ستجد ملف APK في تبويب "Actions" > "Artifacts"

## 🐳 الطريقة البديلة (Docker)

### 1. تثبيت Docker Desktop
- تحميل من: https://www.docker.com/products/docker-desktop

### 2. بناء APK
```bash
# في PowerShell
.\build-with-docker.ps1

# أو في Command Prompt
build-with-docker.bat
```

### 3. النتيجة
- ملف APK في مجلد `output/`

## 📱 تثبيت APK

1. **تفعيل "مصادر غير معروفة"** في إعدادات Android
2. **نقل ملف APK** إلى الجهاز
3. **فتح ملف APK** وتثبيته

## 🎉 النتيجة

ستحصل على تطبيق تلوين لابوبو كامل الميزات:
- 🎨 30 لون مختلف مع أسماء عربية
- 👶 5 شخصيات لابوبو قابلة للتلوين
- 🔊 أصوات وتأثيرات اهتزازية
- 💾 نظام حفظ واسترجاع
- 🔓 نظام فك قفل الشخصيات

## 📞 الدعم

إذا واجهت أي مشاكل:
- راجع ملف `APK-BUILD-COMPLETE-GUIDE.md` للتفاصيل الكاملة
- أو استخدم GitHub Issues

**🎨 استمتع بتطبيق التلوين!** 