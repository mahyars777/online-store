import Link from "next/link";
import { ShoppingBag, Search, UserRound } from "lucide-react";
import { CartLink } from "@/components/cart-link";
export function Header() {
  return <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
    <div className="container-page flex h-[76px] items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white"><ShoppingBag size={21}/></span> سبزینه</Link>
      <nav className="hidden items-center gap-8 text-sm font-semibold text-ink md:flex"><Link href="/">خانه</Link><Link href="/products">همه محصولات</Link><a href="/#about">درباره ما</a></nav>
      <div className="flex items-center gap-2"><Link href="/products" className="grid h-10 w-10 place-items-center rounded-xl bg-soft text-ink"><Search size={19}/></Link><CartLink/><Link href="/admin/login" aria-label="ورود مدیر" className="hidden h-10 w-10 place-items-center rounded-xl bg-soft text-ink sm:grid"><UserRound size={19}/></Link></div>
    </div>
  </header>;
}
