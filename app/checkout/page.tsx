 "use client";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/store/cart";
export default function CheckoutPage() {
 const items=useCart(s=>s.items); const total=items.reduce((n,i)=>n+Number(i.product.price)*i.quantity,0);
 return <><Header/><main className="container-page min-h-[55vh] py-10"><h1 className="mb-6 text-3xl font-extrabold">تکمیل سفارش</h1><div className="surface max-w-2xl p-6"><p className="font-bold">پیش‌نمایش مرحله ثبت سفارش</p><p className="mt-3 leading-8 text-muted">سبد خرید و رابط کاربری آماده است؛ اما نسخه فعلی بک‌اند Admin Edition endpoint ثبت سفارش و پرداخت ندارد. برای جلوگیری از ثبت سفارش ساختگی، این صفحه فعلاً سفارش را ارسال نمی‌کند.</p><div className="my-5 rounded-xl bg-soft p-4">مبلغ سبد خرید: <b className="text-brand">{total.toLocaleString("fa-IR")} تومان</b></div><Link href="/cart" className="btn btn-primary">بازگشت به سبد خرید</Link></div></main><Footer/></>;
}
