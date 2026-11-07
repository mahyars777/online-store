 "use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Package, Tags, ArrowLeft } from "lucide-react";
import { adminApi } from "@/lib/api";
export default function DashboardPage(){
 const [counts,setCounts]=useState({products:0,categories:0}); const [error,setError]=useState("");
 useEffect(()=>{Promise.all([adminApi.products(),adminApi.categories()]).then(([p,c])=>setCounts({products:p.length,categories:c.length})).catch(e=>setError(e.message));},[]);
 return <><div className="mb-8"><p className="text-sm font-bold text-brand">مدیریت فروشگاه</p><h1 className="mt-2 text-3xl font-extrabold">داشبورد</h1><p className="mt-2 text-sm text-muted">نمای کلی وضعیت فروشگاه شما</p></div>{error&&<div className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}<div className="grid gap-4 sm:grid-cols-2"><div className="surface p-6"><div className="flex items-center justify-between"><span className="text-sm text-muted">تعداد محصولات</span><Package className="text-brand"/></div><p className="mt-4 text-3xl font-extrabold">{counts.products.toLocaleString("fa-IR")}</p><Link href="/admin/products" className="mt-4 flex items-center gap-2 text-sm font-bold text-brand">مدیریت محصولات <ArrowLeft size={15}/></Link></div><div className="surface p-6"><div className="flex items-center justify-between"><span className="text-sm text-muted">دسته‌بندی‌ها</span><Tags className="text-brand"/></div><p className="mt-4 text-3xl font-extrabold">{counts.categories.toLocaleString("fa-IR")}</p><Link href="/admin/categories" className="mt-4 flex items-center gap-2 text-sm font-bold text-brand">مدیریت دسته‌بندی‌ها <ArrowLeft size={15}/></Link></div></div><div className="surface mt-6 p-6"><h2 className="font-bold">راهنمای شروع</h2><p className="mt-2 text-sm leading-8 text-muted">ابتدا دسته‌بندی‌های فروشگاه را ایجاد کنید، سپس محصولات را همراه تصویر ثبت کنید. تصویرها در Volume بک‌اند ذخیره می‌شوند.</p></div></>;
}
