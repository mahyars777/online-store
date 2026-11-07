import Link from "next/link";
import { ArrowLeft, Leaf, ShieldCheck, Truck } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/api";
export const dynamic = "force-dynamic";
export default async function HomePage() {
  let products = [];
  let error = false;
  try { products = await getProducts(); } catch { error = true; }
  return <><Header/><main>
    <section className="container-page py-8 md:py-12">
      <div className="relative overflow-hidden rounded-[28px] bg-[#eaf2eb] px-7 py-12 md:px-14 md:py-20">
        <div className="relative z-10 max-w-xl"><span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold text-brand"><Leaf size={15}/> خریدی ساده، انتخابی هوشمندانه</span><h1 className="text-3xl font-extrabold leading-[1.7] md:text-5xl">چیزهای خوب،<br/><span className="text-brand">برای زندگی بهتر.</span></h1><p className="mt-4 max-w-md leading-8 text-muted">محصولات منتخب با تجربه خریدی آسان و دلنشین؛ هر آنچه نیاز دارید، در یک جا.</p><Link href="/products" className="btn btn-primary mt-7">مشاهده محصولات <ArrowLeft size={17}/></Link></div>
        <div className="pointer-events-none absolute -left-10 -top-14 h-72 w-72 rounded-full border-[42px] border-white/40 md:left-20 md:top-8 md:h-96 md:w-96"/><div className="pointer-events-none absolute bottom-[-70px] left-[28%] text-[170px] opacity-10 md:text-[250px]">🌱</div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">{[{icon:Truck,title:"ارسال مطمئن",desc:"تحویل سفارش در کوتاه‌ترین زمان"},{icon:ShieldCheck,title:"خرید امن",desc:"تجربه خرید آسان و شفاف"},{icon:Leaf,title:"انتخاب هوشمند",desc:"محصولات منتخب برای شما"}].map(x=><div key={x.title} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-soft text-brand"><x.icon size={20}/></span><div><p className="font-bold">{x.title}</p><p className="mt-1 text-xs text-muted">{x.desc}</p></div></div>)}</div>
    </section>
    <section className="container-page py-8"><div className="mb-6 flex items-end justify-between"><div><p className="text-sm font-bold text-brand">ویترین فروشگاه</p><h2 className="mt-2 text-2xl font-extrabold">محصولات منتخب</h2></div><Link href="/products" className="flex items-center gap-2 text-sm font-bold text-brand">همه محصولات <ArrowLeft size={16}/></Link></div>
      {error ? <div className="surface p-8 text-center"><p className="font-bold">اتصال به سرور برقرار نشد</p><p className="mt-2 text-sm text-muted">بک‌اند را اجرا و مقدار BACKEND_API_URL را بررسی کنید.</p></div> : products.length ? <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{products.slice(0,8).map((p:any)=><ProductCard key={p.id} product={p}/>)}</div> : <div className="surface p-10 text-center text-muted">هنوز محصولی برای نمایش وجود ندارد.</div>}
    </section>
  </main><Footer/></>;
}
