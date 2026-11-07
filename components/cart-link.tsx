 "use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/store/cart";
export function CartLink() {
  const count = useCart(s => s.items.reduce((n, i) => n + i.quantity, 0));
  return <Link href="/cart" className="relative grid h-10 w-10 place-items-center rounded-xl bg-soft text-ink"><ShoppingCart size={19}/>{count > 0 && <span className="absolute -left-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">{count}</span>}</Link>;
}
