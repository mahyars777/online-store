import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types";
import { imageSrc } from "@/lib/api";
export function ProductCard({ product }: { product: Product }) {
  const price = Number(product.price || 0);
  return <article className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-soft">
    <Link href={`/products/${product.id}`} className="block">
      <div className="product-image relative aspect-[4/3] overflow-hidden">
        {product.imageUrl ? <img src={imageSrc(product.imageUrl)} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/> : <div className="grid h-full place-items-center text-5xl">🌿</div>}
        {Number(product.stock ?? 1) <= 0 && <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs">ناموجود</span>}
      </div>
      <div className="p-4"><p className="mb-2 text-xs text-muted">{typeof product.category === "object" ? product.category?.name : product.category || "محصول فروشگاه"}</p><h3 className="line-clamp-1 font-bold">{product.name}</h3><div className="mt-4 flex items-center justify-between"><span className="font-extrabold text-brand">{price.toLocaleString("fa-IR")} <small className="font-normal">تومان</small></span><span className="grid h-9 w-9 place-items-center rounded-xl bg-soft text-brand"><ShoppingCart size={17}/></span></div></div>
    </Link>
  </article>;
}
