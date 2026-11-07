# فروشگاه اینترنتی — Next.js + فارسی RTL

فرانت‌اند فروشگاه و پنل مدیریت، آماده اتصال به بک‌اند Node.js / Express / PostgreSQL نسخه Admin Edition.

## امکانات

### فروشگاه
- صفحه اصلی فارسی و راست‌چین با طراحی مینیمال
- فهرست محصولات، جست‌وجو و فیلتر دسته‌بندی
- صفحه جزئیات محصول
- سبد خرید با Zustand و نگهداری در مرورگر
- صفحه ثبت سفارش نمایشی (ثبت واقعی سفارش نیازمند endpoint سفارش در بک‌اند است)

### پنل مدیریت
- ورود مدیر با رمز جداگانه
- داشبورد خلاصه
- افزودن، ویرایش و حذف محصول
- افزودن و حذف دسته‌بندی
- آپلود تصویر محصول در بک‌اند و ذخیره imageUrl
- کلید Admin API فقط در سمت سرور Next.js نگهداری می‌شود

## پیش‌نیازها
- Node.js 20.9 یا بالاتر (پیشنهاد: Node.js 22)
- بک‌اند Admin Edition در حال اجرا روی پورت 4000

## نصب در ویندوز (PowerShell)

1. فایل ZIP را Extract کنید.
2. ترمینال VS Code را در پوشه `store-frontend` باز کنید.
3. فایل `.env.example` را به `.env.local` کپی کنید:
   ```powershell
   Copy-Item .env.example .env.local
   ```
4. مقادیر `BACKEND_ADMIN_API_KEY` را دقیقاً برابر `ADMIN_API_KEY` بک‌اند قرار دهید. برای `ADMIN_PANEL_PASSWORD` و `SESSION_SECRET` مقادیر قوی و جداگانه تعیین کنید.
5. نصب و اجرا:
   ```powershell
   npm install
   npm run dev
   ```
6. فروشگاه: http://localhost:3000
7. پنل مدیریت: http://localhost:3000/admin/login

## اتصال به بک‌اند
- اگر بک‌اند روی ویندوز/سیستم میزبان اجرا می‌شود: `BACKEND_API_URL=http://localhost:4000`
- اگر Next.js و بک‌اند هر دو داخل یک Docker network هستند، نام سرویس API را استفاده کنید؛ برای مثال `http://api:4000`.
- مسیرهای عمومی که فرانت‌اند انتظار دارد:
  - `GET /api/products`
  - `GET /api/categories`
  - `GET /api/products/:id`
- مسیرهای مدیریتی Admin Edition:
  - `GET/POST /api/admin/products`
  - `PUT/DELETE /api/admin/products/:id`
  - `GET/POST /api/admin/categories`
  - `PUT/DELETE /api/admin/categories/:id`
  - `POST /api/admin/upload` (multipart field: `image`)

اگر مسیر عمومی بک‌اند شما متفاوت است، آن را در `lib/api.ts` تغییر دهید. پنل مدیریت از مسیرهای `/api/admin/...` فعلی استفاده می‌کند.

## امنیت
- `BACKEND_ADMIN_API_KEY` و `SESSION_SECRET` را هرگز با پیشوند `NEXT_PUBLIC_` تعریف نکنید.
- رمز پنل (`ADMIN_PANEL_PASSWORD`) از کلید بک‌اند جداست.
- این احراز هویت ساده برای پروژه آموزشی/محیط توسعه است. برای انتشار واقعی باید کاربران مدیر در دیتابیس، هش رمز، محدودیت تلاش ورود، HTTPS و مدیریت نقش‌ها پیاده‌سازی شود.
- در نسخه فعلی ثبت سفارش فقط رابط کاربری و سبد خرید آماده است؛ چون بک‌اند فعلی endpoint سفارش/پرداخت ندارد، checkout سفارش واقعی ثبت نمی‌کند.

## Build
```powershell
npm run build
npm start
```
