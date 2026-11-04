import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
    >
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="space-y-1 p-3">
        <span className="text-xs text-gray-500">{product.categoryName}</span>
        <h3 className="line-clamp-1 font-medium">{product.name}</h3>
        <p className="font-bold text-indigo-600">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
