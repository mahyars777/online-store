import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-5xl font-bold text-gray-800">۴۰۴</h1>
      <p className="mt-4 text-gray-600">صفحه‌ای که دنبالش بودید پیدا نشد.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
      >
        بازگشت به خانه
      </Link>
    </section>
  );
}
