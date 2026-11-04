import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsView from "@/components/product/ProductsView";
import { ProductGridSkeleton } from "@/components/product/ProductGrid";

export const metadata: Metadata = {
  title: "محصولات",
  description: "لیست کامل محصولات فروشگاه با امکان جستجو و فیلتر",
};

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">محصولات</h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductsView />
      </Suspense>
    </div>
  );
}
