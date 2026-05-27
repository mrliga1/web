"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ref, onValue } from "firebase/database";
import { firebaseDatabase } from "../../../lib/firebase";
import Link from "next/link";

export default function ChiTietSanPham() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !firebaseDatabase) return;

    const productRef = ref(firebaseDatabase, `products/${id}`);
    const unsubscribe = onValue(productRef, (snapshot) => {
      setProduct(snapshot.val());
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Đang tải thông tin sản phẩm...</div>;
  if (!product) return <div className="p-10 text-center">Không tìm thấy sản phẩm này!</div>;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/san-pham" className="text-emerald-700 hover:underline">← Quay lại danh sách</Link>
      
      <div className="mt-6 rounded-[2rem] bg-white p-8 shadow-sm border border-slate-100">
        <div className="mb-8 h-64 w-full rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
          [Ảnh sản phẩm sẽ hiển thị ở đây]
        </div>
        
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase text-emerald-800">
          {product.type === "sell" ? "Bán" : "Cho thuê"}
        </span>
        
        <h1 className="mt-4 text-4xl font-bold text-slate-900">{product.title}</h1>
        <p className="mt-2 text-2xl font-semibold text-emerald-700">{product.price}</p>
        
        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-slate-500">Khu vực</h3>
            <p className="text-lg text-slate-900">{product.location}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Liên hệ</h3>
            <p className="text-lg text-slate-900">0932 966 700</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-900">Mô tả chi tiết</h3>
          <div 
            className="mt-4 prose prose-slate max-w-none text-slate-600"
            dangerouslySetInnerHTML={{ __html: product.description || "Chưa có mô tả cho sản phẩm này." }}
          />
        </div>
      </div>
    </main>
  );
}