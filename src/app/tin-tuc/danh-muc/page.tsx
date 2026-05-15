import Link from "next/link";

export default function TinTucDanhMucPage() {
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
              <Link href="/tin-tuc" className="hover:text-slate-900">
                Tin tức
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-900">Danh mục</li>
          </ol>
        </nav>

        <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Danh mục tin tức</p>
              <h1 className="text-4xl font-semibold text-slate-900">Tin tức theo danh mục</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Tất cả', 'Thị trường', 'Cẩm nang', 'Đầu tư'].map((item) => (
                <button key={item} type="button" className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <article key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="mb-4 h-36 rounded-3xl bg-slate-200" />
                <h2 className="text-lg font-semibold text-slate-900">Bài viết danh mục {item}</h2>
                <p className="mt-2 text-sm text-slate-600">Tóm tắt nội dung bài viết và link đến chi tiết.</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700">
              Xem thêm bài viết danh mục
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
