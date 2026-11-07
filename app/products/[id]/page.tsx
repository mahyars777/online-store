import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductDetail } from "@/components/product-detail";
import { getProduct } from "@/lib/api";
export const dynamic = "force-dynamic";
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try { const product = await getProduct(id); if (!product?.id) notFound(); return <><Header/><main className="container-page min-h-[55vh] py-10"><Link href="/products" className="text-sm text-brand">← بازگشت به محصولات</Link><div className="mt-6"><ProductDetail product={product}/></div></main><Footer/></>; }
  catch { notFound(); }
}
