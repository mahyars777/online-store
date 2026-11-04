import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";

export const dynamic = "force-dynamic";

export default async function ApiTestPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ limit: 2 }),
  ]);

  return (
    <pre
      dir="ltr"
      className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-green-300"
    >
      {JSON.stringify({ categories, products }, null, 2)}
    </pre>
  );
}
