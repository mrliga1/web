"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Article = {
  id: number;
  title: string;
  category: string;
  date: string;
  summary: string;
  views: number;
};

type Product = {
  id: number;
  title: string;
  price: string;
  area: string;
  location: string;
};

const categories = ["Tất cả", "Thị trường", "Cẩm nang", "Đầu tư", "Tiện ích"];

const articles: Article[] = [
  { id: 1, title: "Bất động sản TP.HCM tăng giá mạnh", category: "Thị trường", date: "15/05/2026", summary: "Thị trường nhà ở đang có chuyển biến tăng giá ở nhiều phân khúc.", views: 1248 },
  { id: 2, title: "Chọn căn hộ thông minh cùng Greenia Homes", category: "Cẩm nang", date: "12/05/2026", summary: "Hướng dẫn chọn căn hộ thông minh phù hợp gia đình hiện đại.", views: 980 },
  { id: 3, title: "Xu hướng đầu tư đất nền ven đô", category: "Đầu tư", date: "10/05/2026", summary: "Những điểm cần lưu ý khi đầu tư đất nền vùng ven thành phố.", views: 860 },
  { id: 4, title: "Thiết kế tiện ích chuẩn 5 sao", category: "Tiện ích", date: "08/05/2026", summary: "Tiện ích nội khu tạo giá trị bền vững cho dự án.", views: 740 },
  { id: 5, title: "Kinh nghiệm vay ngân hàng mua nhà", category: "Tài chính", date: "05/05/2026", summary: "Hướng dẫn hồ sơ vay và lựa chọn ngân hàng tốt nhất.", views: 1120 },
  { id: 6, title: "Mua nhà trả góp thế nào cho hợp lý", category: "Tài chính", date: "03/05/2026", summary: "Lập kế hoạch tài chính khi mua nhà trả góp.", views: 650 },
  { id: 7, title: "Lựa chọn vị trí nhà ở theo phong thủy", category: "Cẩm nang", date: "01/05/2026", summary: "Phong thủy trong chọn vị trí và hướng nhà.", views: 930 },
  { id: 8, title: "Dự án mới mở bán đáng chú ý", category: "Thị trường", date: "28/04/2026", summary: "Những dự án mới có tiềm năng đầu tư cao trong năm.", views: 1150 },
  { id: 9, title: "Quy trình nghiệm thu bàn giao căn hộ", category: "Tiện ích", date: "25/04/2026", summary: "Checklist quan trọng khi nhận bàn giao nhà.", views: 520 },
  { id: 10, title: "Cách chọn sản phẩm phù hợp gia đình trẻ", category: "Cẩm nang", date: "22/04/2026", summary: "Tiêu chí chọn căn hộ cho gia đình trẻ hiện đại.", views: 980 },
  { id: 11, title: "Mua nhà 2026: Thị trường đang thay đổi", category: "Thị trường", date: "18/04/2026", summary: "Những thay đổi chính sách và xu hướng thị trường mới.", views: 1330 },
  { id: 12, title: "Tiện ích xanh mang lại lợi ích gì", category: "Tiện ích", date: "15/04/2026", summary: "Lợi ích sức khỏe và đầu tư khi chọn tiện ích xanh.", views: 610 },
];

const featuredProducts: Product[] = [
  { id: 1, title: "Greenia River View", price: "4.2 tỷ", area: "95 m², 2PN", location: "Quận 7" },
  { id: 2, title: "Greenia Sky Apartment", price: "18tr/tháng", area: "65 m², 1PN", location: "Thủ Đức" },
  { id: 3, title: "Greenia Lakehouse", price: "6.8 tỷ", area: "120 m², 3PN", location: "Nhà Bè" },
  { id: 4, title: "Greenia Central Park", price: "22tr/tháng", area: "80 m², 2PN", location: "Bình Thạnh" },
  { id: 5, title: "Greenia Garden Home", price: "16tr/tháng", area: "75 m², 2PN", location: "Quận 12" },
  { id: 6, title: "Greenia Hill", price: "8.5 tỷ", area: "110 m², 3PN", location: "An Phú" },
];

export default function TinTucPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [hoveredArticleId, setHoveredArticleId] = useState(articles[0].id);
  const [visibleMore, setVisibleMore] = useState(6);

  const filteredArticles = useMemo(() => {
    return activeCategory === "Tất cả"
      ? articles
      : articles.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  const hoveredArticle = articles.find((article) => article.id === hoveredArticleId) ?? articles[0];

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
            <li className="font-semibold text-slate-900">Tin tức</li>
          </ol>
        </nav>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Tin tức</p>
            <h1 className="text-4xl font-semibold text-slate-900">Cập nhật thông tin thị trường bất động sản</h1>
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? "bg-emerald-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.8fr_1fr_0.9fr]">
          <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
            <div className="rounded-3xl border border-slate-200 p-6">
              <div className="mb-5 h-64 rounded-3xl bg-slate-200" />
              <span className="text-sm uppercase tracking-[0.24em] text-emerald-700">{hoveredArticle.category}</span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">{hoveredArticle.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{hoveredArticle.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span>{hoveredArticle.date}</span>
                <span>{hoveredArticle.views} lượt xem</span>
              </div>
              <Link href={`/tin-tuc/${hoveredArticle.id}`} className="mt-6 inline-flex rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
                Xem chi tiết
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredArticles.slice(0, 10).map((article) => (
              <button
                key={article.id}
                type="button"
                className="w-full rounded-3xl border border-slate-200 bg-white p-5 text-left transition hover:border-emerald-300"
                onMouseEnter={() => setHoveredArticleId(article.id)}
              >
                <h3 className="text-base font-semibold text-slate-900">{article.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{article.date}</p>
              </button>
            ))}
          </div>

          <aside className="space-y-4 rounded-[2rem] bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Xem nhiều nhất</p>
              <div className="mt-4 space-y-3">
                {articles
                  .slice()
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((article) => (
                    <div key={article.id} className="rounded-3xl bg-slate-50 p-4">
                      <h4 className="text-sm font-semibold text-slate-900">{article.title}</h4>
                      <p className="mt-1 text-xs text-slate-500">{article.views} lượt xem</p>
                    </div>
                  ))}
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1.9fr_0.9fr]">
          <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Có thể bạn quan tâm</p>
                <h2 className="text-3xl font-semibold text-slate-900">Bài viết khác bạn nên xem</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                onClick={() => setVisibleMore((prev) => prev + 6)}
              >
                Xem thêm 6 bài viết
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {articles.slice(0, visibleMore).map((article) => (
                <article key={article.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <span className="text-xs uppercase tracking-[0.24em] text-emerald-700">{article.category}</span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{article.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{article.summary}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>{article.date}</span>
                    <Link href={`/tin-tuc/${article.id}`} className="font-semibold text-emerald-700 hover:text-emerald-900">
                      Xem chi tiết
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Sản phẩm nổi bật</p>
              <div className="mt-6 space-y-4">
                {featuredProducts.slice(0, 6).map((product) => (
                  <div key={product.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <h4 className="text-sm font-semibold text-slate-900">{product.title}</h4>
                    <p className="mt-2 text-sm text-slate-600">{product.price}</p>
                    <p className="text-xs text-slate-500">{product.area} • {product.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-12 space-y-8 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Sản phẩm bán mới nhất</p>
              <h2 className="text-3xl font-semibold text-slate-900">Sản phẩm bán mới nhất</h2>
            </div>
            <Link href="/san-pham/ban" className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
              Xem danh mục bán
            </Link>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {featuredProducts.filter((product) => product.price.includes("tỷ")).slice(0, 5).map((product) => (
              <article key={product.id} className="min-w-[18rem] rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="mb-4 h-40 rounded-3xl bg-slate-200" />
                <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{product.location}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 space-y-8 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Sản phẩm cho thuê mới nhất</p>
              <h2 className="text-3xl font-semibold text-slate-900">Sản phẩm cho thuê mới nhất</h2>
            </div>
            <Link href="/san-pham/cho-thue" className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
              Xem danh mục cho thuê
            </Link>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {featuredProducts.filter((product) => product.price.includes("tr/tháng")).slice(0, 5).map((product) => (
              <article key={product.id} className="min-w-[18rem] rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="mb-4 h-40 rounded-3xl bg-slate-200" />
                <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{product.location}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
