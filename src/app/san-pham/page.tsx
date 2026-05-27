"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { firebaseDatabase } from "../../lib/firebase";

type Product = {
  id: number | string; // Cho phép ID là chuỗi của Firebase
  title: string;
  label: string;
  price: string;
  location: string;
  region: string;
  priceRange: string;
};

const products: Product[] = [
  { id: 1, title: "Greenia River View", label: "Bán", price: "4.2 tỷ", location: "Quận 7", region: "Quận 7", priceRange: "3-5 tỷ" },
  { id: 2, title: "Greenia Sky Apartment", label: "Cho thuê", price: "18tr/tháng", location: "Thủ Đức", region: "Thủ Đức", priceRange: "10-20tr" },
  { id: 3, title: "Greenia Lakehouse", label: "Bán", price: "6.8 tỷ", location: "Nhà Bè", region: "Nhà Bè", priceRange: "5-8 tỷ" },
  { id: 4, title: "Greenia Central Park", label: "Cho thuê", price: "22tr/tháng", location: "Bình Thạnh", region: "Bình Thạnh", priceRange: "20-30tr" },
  { id: 5, title: "Greenia City Villa", label: "Bán", price: "9.1 tỷ", location: "Thủ Đức", region: "Thủ Đức", priceRange: "8-10 tỷ" },
  { id: 6, title: "Greenia Studio", label: "Cho thuê", price: "12tr/tháng", location: "Quận 9", region: "Quận 9", priceRange: "10-20tr" },
  { id: 7, title: "Greenia River Park", label: "Bán", price: "5.4 tỷ", location: "Quận 2", region: "Quận 2", priceRange: "3-5 tỷ" },
  { id: 8, title: "Greenia Urban Loft", label: "Cho thuê", price: "20tr/tháng", location: "Quận 1", region: "Quận 1", priceRange: "20-30tr" },
  { id: 9, title: "Greenia Beach Villa", label: "Bán", price: "11.2 tỷ", location: "Vũng Tàu", region: "Vũng Tàu", priceRange: "10-12 tỷ" },
  { id: 10, title: "Greenia Garden Home", label: "Cho thuê", price: "16tr/tháng", location: "Quận 12", region: "Quận 12", priceRange: "10-20tr" },
  { id: 11, title: "Greenia Sunrise", label: "Bán", price: "7.3 tỷ", location: "Hóc Môn", region: "Hóc Môn", priceRange: "5-8 tỷ" },
  { id: 12, title: "Greenia Plaza", label: "Cho thuê", price: "25tr/tháng", location: "Quận 3", region: "Quận 3", priceRange: "20-30tr" },
  { id: 13, title: "Greenia Hill", label: "Bán", price: "8.5 tỷ", location: "An Phú", region: "An Phú", priceRange: "8-10 tỷ" },
  { id: 14, title: "Greenia Lotus", label: "Cho thuê", price: "19tr/tháng", location: "Quận 4", region: "Quận 4", priceRange: "10-20tr" },
  { id: 15, title: "Greenia Prime", label: "Bán", price: "5.9 tỷ", location: "Bình Tân", region: "Bình Tân", priceRange: "5-8 tỷ" },
  { id: 16, title: "Greenia Garden Suite", label: "Cho thuê", price: "27tr/tháng", location: "Quận 2", region: "Quận 2", priceRange: "20-30tr" },
  { id: 17, title: "Greenia Elegant", label: "Bán", price: "6.9 tỷ", location: "Quận 7", region: "Quận 7", priceRange: "5-8 tỷ" },
  { id: 18, title: "Greenia Sky Loft", label: "Cho thuê", price: "24tr/tháng", location: "Quận 1", region: "Quận 1", priceRange: "20-30tr" },
];

const areaOptions = ["Tất cả khu vực", "Quận 1", "Quận 2", "Quận 7", "Thủ Đức", "Bình Thạnh"];
const priceOptions = ["Tất cả mức giá", "3-5 tỷ", "5-8 tỷ", "8-10 tỷ", "10-20tr", "20-30tr"];

export default function SanPhamPage() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [regionFilter, setRegionFilter] = useState("Tất cả khu vực");
  const [priceFilter, setPriceFilter] = useState("Tất cả mức giá");
  const [searchText, setSearchText] = useState("");
  const [limit, setLimit] = useState(10);
  const [recommendLimit, setRecommendLimit] = useState(5);
  const [firebaseProducts, setFirebaseProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!firebaseDatabase) return;
    const productsRef = dbRef(firebaseDatabase, "/products");
    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fbProducts: Product[] = Object.entries(data).map(
            ([key, value]: [string, any]) => {
              // Cải thiện logic lọc Bán/Cho thuê
              const rawType = (value.type || value.label || "Bán").toString().toLowerCase();
              const finalLabel = (rawType.includes("thuê") || rawType === "rent") ? "Cho thuê" : "Bán";
              
              return {
                id: key, // Dùng ID thật của Firebase
                title: value.title || "Chưa có tiêu đề",
                label: finalLabel,
                price: value.price || "Liên hệ",
                location: value.location || "TP.HCM",
                region: value.region || value.location || "TP.HCM",
                priceRange: value.priceRange || value.price || "Liên hệ",
              };
            }
          ).reverse(); // Mới nhất lên đầu
          setFirebaseProducts(fbProducts);
        }
      },
      (error) => console.error("Error fetching products:", error)
    );
    return () => unsubscribe();
  }, []);

  const allProducts = firebaseProducts.length > 0 ? firebaseProducts : products;

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesTab = activeTab === "Tất cả" || product.label === activeTab;
      const matchesRegion = regionFilter === "Tất cả khu vực" || product.region === regionFilter;
      const matchesPrice = priceFilter === "Tất cả mức giá" || product.priceRange === priceFilter;
      const matchesSearch = product.title.toLowerCase().includes(searchText.toLowerCase()) || product.location.toLowerCase().includes(searchText.toLowerCase());
      return matchesTab && matchesRegion && matchesPrice && matchesSearch;
    });
  }, [activeTab, regionFilter, priceFilter, searchText, allProducts]);

  const visibleProducts = filteredProducts.slice(0, limit);
  const recommendedProducts = allProducts.slice(0, recommendLimit);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-10 rounded-[2rem] bg-white p-8 shadow-sm">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-slate-900">
                  Trang chủ
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-slate-900">Sản phẩm</li>
            </ol>
          </nav>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Trang sản phẩm</p>
              <h1 className="text-4xl font-semibold text-slate-900">Tìm sản phẩm phù hợp với nhu cầu của bạn</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">Tổng sản phẩm</span>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{filteredProducts.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <span className="text-sm text-slate-600">Loại</span>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{activeTab}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap gap-3">
              {[
                "Tất cả",
                "Bán",
                "Cho thuê",
              ].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab === tab ? "bg-emerald-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1.5fr]">
              <select
                value={regionFilter}
                onChange={(event) => setRegionFilter(event.target.value)}
                className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none"
              >
                {areaOptions.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <select
                value={priceFilter}
                onChange={(event) => setPriceFilter(event.target.value)}
                className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none"
              >
                {priceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="search"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Tìm kiếm sản phẩm, khu vực..."
                className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none"
              />
            </div>
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Danh sách sản phẩm</p>
              <h2 className="text-3xl font-semibold text-slate-900">Tất cả sản phẩm</h2>
            </div>
            <p className="text-sm text-slate-600">Danh sách hiển thị 5 cột 2 hàng, tự động load thêm mỗi lần.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {visibleProducts.map((item) => (
              <Link href={`/san-pham/${item.id}`} key={item.id} className="block h-full">
                <article className="h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-emerald-500 cursor-pointer">
                  <div className="mb-4 h-36 rounded-3xl bg-slate-100" />
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">{item.label}</span>
                    <span className="text-xs text-slate-500">{item.region}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.price}</p>
                </article>
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            onClick={() => setLimit((prev) => prev + 10)}
          >
            Xem thêm 10 sản phẩm
          </button>
        </section>

        <section className="mt-14 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Bất động sản cho bạn</p>
              <h2 className="text-3xl font-semibold text-slate-900">Danh sách bạn đã xem gần đây</h2>
            </div>
            <button
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
              onClick={() => setRecommendLimit((prev) => prev + 5)}
            >
              Xem thêm 5 sản phẩm
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {recommendedProducts.map((item) => (
              <Link href={`/san-pham/${item.id}`} key={item.id} className="block h-full">
                <article className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md hover:border-emerald-500 hover:bg-white cursor-pointer">
                  <div className="mb-4 h-36 rounded-3xl bg-slate-200" />
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.price}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 space-y-8">
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
            {allProducts.filter((item) => item.label === "Bán").slice(0, 5).map((item) => (
              <Link href={`/san-pham/${item.id}`} key={item.id} className="block min-w-[18rem]">
                <article className="h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-emerald-500 cursor-pointer">
                  <div className="mb-4 h-40 rounded-3xl bg-slate-100" />
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{item.location}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 space-y-8">
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
            {allProducts.filter((item) => item.label === "Cho thuê").slice(0, 5).map((item) => (
              <Link href={`/san-pham/${item.id}`} key={item.id} className="block min-w-[18rem]">
                <article className="h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-emerald-500 cursor-pointer">
                  <div className="mb-4 h-40 rounded-3xl bg-slate-100" />
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{item.location}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Dự án nổi bật</p>
              <h2 className="text-3xl font-semibold text-slate-900">Dự án nổi bật</h2>
            </div>
            <Link href="/du-an" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">
              Xem thêm dự án
            </Link>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {[
              { id: 1, title: "An Phú New City", status: "Đang mở bán", location: "Thủ Đức", price: "Từ 3.5 tỷ" },
              { id: 2, title: "Vinhomes Cần Giờ", status: "Đang mở bán", location: "Cần Giờ", price: "Từ 6.2 tỷ" },
              { id: 3, title: "Vinhomes Hóc Môn", status: "Đã bàn giao", location: "Hóc Môn", price: "Từ 4.8 tỷ" },
              { id: 4, title: "Greenia Riverside", status: "Đang mở bán", location: "Quận 7", price: "Từ 5.1 tỷ" },
              { id: 5, title: "Sunshine City", status: "Đã bàn giao", location: "Quận 9", price: "Từ 7.0 tỷ" },
            ].map((item) => (
              <Link href={`/du-an/${item.id}`} key={item.id} className="block min-w-[18rem]">
                <article className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md hover:border-emerald-500 cursor-pointer hover:bg-white">
                  <div className="mb-4 h-40 rounded-3xl bg-slate-200" />
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.status}</div>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{item.price}</p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}