 "use client";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/types";
import { imageSrc } from "@/lib/api";
import { useCart } from "@/store/cart";
export function ProductDetail({ product }: { product: Product }) {
  const add = useCart(s => s.add); const [added,setAdded] = useState(false);
  return <div className="grid gap-8 md:grid-cols-2"><div className="product-image overflow-hidden rounded-3xl">{product.imageUrl ? <img src={imageSrc(product.imageUrl)} alt={product.name} className="aspect-square w-full object-cover"/> : <div className="grid aspect-square place-items-center text-8xl">🌿</div>}</div><div className="py-3"><p className="text-sm font-bold text-brand">محصول منتخب</p><h1 className="mt-3 text-3xl font-extrabold">{product.name}</h1><p className="mt-5 leading-9 text-muted">{product.description || "توضیحات این محصول هنوز ثبت نشده است."}</p><div className="mt-7 rounded-2xl bg-soft p-5"><p className="text-sm text-muted">قیمت محصول</p><p className="mt-2 text-2xl font-extrabold text-brand">{Number(product.price).toLocaleString("fa-IR")} <small className="text-sm font-medium">تومان</small></p><p className="mt-3 text-sm text-muted">موجودی: {Number(product.stock ?? 0).toLocaleString("fa-IR")}</p></div><button disabled={Number(product.stock ?? 1) <= 0} onClick={()=>{add(product);setAdded(true);setTimeout(()=>setAdded(false),1800)}} className="btn btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40">{added ? <><Check size={18}/> به سبد خرید اضافه شد</> : <><ShoppingCart size={18}/> افزودن به سبد خرید</>}</button></div></div>;
}
