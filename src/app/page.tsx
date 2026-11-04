import CategoryList from "@/components/home/CategoryList";
import ProductsPreview from "@/components/home/ProductsPreview";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-indigo-600 px-6 py-12 text-center text-white">
        <h1 className="text-3xl font-bold">به فروشگاه من خوش آمدید</h1>
        <p className="mt-3 text-indigo-100">بهترین محصولات با بهترین قیمت</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">دسته‌بندی‌ها</h2>
        <CategoryList />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">محصولات</h2>
        <ProductsPreview />
      </section>
    </div>
  );
}
