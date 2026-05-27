import Link from "next/link";
import { useEffect, useState } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { firebaseDatabase } from "../../../lib/firebase";

type Product = {
  id: string;
  title: string;
  label: string;
  price: string;
  location: string;
};

const fallbackProducts: Product[] = [
  { id: "1", title: "Greenia River View", label: "Bán", price: "4.2 tỷ", location: "Quận 7" },
  { id: "2", title: "Greenia Lakehouse", label: "Bán", price: "6.8 tỷ", location: "Nhà Bè" },
  { id: "3", title: "Greenia City Villa", label: "Bán", price: "9.1 tỷ", location: "Thủ Đức" },
  { id: "4", title: "Greenia River Park", label: "Bán", price: "5.4 tỷ", location: "Quận 2" },
  { id: "5", title: "Greenia Sunrise", label: "Bán", price: "7.3 tỷ", location: "Hóc Môn" },
];

export default function SanPhamBanPage() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    if (!firebaseDatabase) return;
    const productsRef = dbRef(firebaseDatabase, "/products");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const items: Product[] = Object.entries(data)
        .map(([key, value]: [string, any]) => {
          const rawType = (value.type || value.label || "sell").toString().toLowerCase();
          const isSell = rawType.includes("bán") || rawType.includes("sell");
          return {
            id: key,
            title: value.title || "Chưa có tiêu đề",
            label: isSell ? "Bán" : "Cho thuê",
            price: value.price || "Liên hệ",
            location: value.location || "TP.HCM",
          };
        })
        .filter((item) => item.label === "Bán")
        .reverse();

      if (items.length > 0) setProducts(items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-slate-900">
                Trang chủ
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/san-pham" className="hover:text-slate-900">
                Sản phẩm
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-900">Bán</li>
          </ol>
        </nav>

        <div className="mt-8 space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Danh mục sản phẩm</p>
            <h1 className="text-4xl font-semibold text-slate-900">Sản phẩm bán</h1>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((item) => (
              <article key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="mb-4 h-36 rounded-3xl bg-slate-200" />
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.price}</p>
                <p className="mt-1 text-sm text-slate-500">{item.location}</p>
              </article>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700">
              Xem thêm sản phẩm bán
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
