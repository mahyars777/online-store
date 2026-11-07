import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/api";
export const dynamic = "force-dynamic";
export default async function ProductsPage() {
  let products = []; let error = false;
  try { products = await getProducts(); } catch { error = true; }
  return <><Header/><main className="container-page min-h-[55vh] py-10"><div className="mb-8"><p className="text-sm font-bold text-brand">فروشگاه سبزینه</p><h1 className="mt-2 text-3xl font-extrabold">همه محصولات</h1><p className="mt-2 text-sm text-muted">{products.length} محصول در فروشگاه</p></div>{error ? <div className="surface p-8 text-center">خطا در دریافت محصولات؛ اتصال بک‌اند را بررسی کنید.</div> : products.length ? <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">{products.map((p:any)=><ProductCard key={p.id} product={p}/>)}</div> : <div className="surface p-10 text-center text-muted">محصولی ثبت نشده است.</div>}</main><Footer/></>;
}
