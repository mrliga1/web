import Link from "next/link";

export default function SanPhamBanPage() {
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
            {[1, 2, 3, 4, 5].map((item) => (
              <article key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="mb-4 h-36 rounded-3xl bg-slate-200" />
                <h2 className="text-lg font-semibold text-slate-900">Sản phẩm bán {item}</h2>
                <p className="mt-2 text-sm text-slate-600">Giá bán, vị trí và thông tin cơ bản.</p>
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
