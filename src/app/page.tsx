"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { firebaseDatabase } from "../lib/firebase";

type Product = {
  id: number | string; // Đã sửa lại để nhận cả ID dạng chuỗi của Firebase
  title: string;
  type: string;
  price: string;
  location: string;
  label: string;
  region: string;
  priceRange: string;
};

type Project = {
  id: number;
  title: string;
  status: string;
  price: string;
  location: string;
};

type News = {
  id: number;
  title: string;
  category: string;
  date: string;
};

const productList: Product[] = [
  { id: 1, title: "Greenia River View", type: "Bán", price: "4.2 tỷ", location: "Quận 7", label: "Bán", region: "Quận 7", priceRange: "3-5 tỷ" },
  { id: 2, title: "Greenia Sky Apartment", type: "Cho thuê", price: "18tr/tháng", location: "Thủ Đức", label: "Cho thuê", region: "Thủ Đức", priceRange: "10-20tr" },
  { id: 3, title: "Greenia Lakehouse", type: "Bán", price: "6.8 tỷ", location: "Nhà Bè", label: "Bán", region: "Nhà Bè", priceRange: "5-8 tỷ" },
  { id: 4, title: "Greenia Central Park", type: "Cho thuê", price: "22tr/tháng", location: "Bình Thạnh", label: "Cho thuê", region: "Bình Thạnh", priceRange: "20-30tr" },
  { id: 5, title: "Greenia City Villa", type: "Bán", price: "9.1 tỷ", location: "Thủ Đức", label: "Bán", region: "Thủ Đức", priceRange: "8-10 tỷ" },
  { id: 6, title: "Greenia Studio", type: "Cho thuê", price: "12tr/tháng", location: "Quận 9", label: "Cho thuê", region: "Quận 9", priceRange: "10-20tr" },
  { id: 7, title: "Greenia River Park", type: "Bán", price: "5.4 tỷ", location: "Quận 2", label: "Bán", region: "Quận 2", priceRange: "3-5 tỷ" },
  { id: 8, title: "Greenia Urban Loft", type: "Cho thuê", price: "20tr/tháng", location: "Quận 1", label: "Cho thuê", region: "Quận 1", priceRange: "20-30tr" },
  { id: 9, title: "Greenia Beach Villa", type: "Bán", price: "11.2 tỷ", location: "Vũng Tàu", label: "Bán", region: "Vũng Tàu", priceRange: "10-12 tỷ" },
  { id: 10, title: "Greenia Garden Home", type: "Cho thuê", price: "16tr/tháng", location: "Quận 12", label: "Cho thuê", region: "Quận 12", priceRange: "10-20tr" },
  { id: 11, title: "Greenia Sunrise", type: "Bán", price: "7.3 tỷ", location: "Hóc Môn", label: "Bán", region: "Hóc Môn", priceRange: "5-8 tỷ" },
  { id: 12, title: "Greenia Plaza", type: "Cho thuê", price: "25tr/tháng", location: "Quận 3", label: "Cho thuê", region: "Quận 3", priceRange: "20-30tr" },
  { id: 13, title: "Greenia Hill", type: "Bán", price: "8.5 tỷ", location: "An Phú", label: "Bán", region: "An Phú", priceRange: "8-10 tỷ" },
  { id: 14, title: "Greenia Lotus", type: "Cho thuê", price: "19tr/tháng", location: "Quận 4", label: "Cho thuê", region: "Quận 4", priceRange: "10-20tr" },
  { id: 15, title: "Greenia Prime", type: "Bán", price: "5.9 tỷ", location: "Bình Tân", label: "Bán", region: "Bình Tân", priceRange: "5-8 tỷ" },
];

const projectList: Project[] = [
  { id: 1, title: "An Phú New City", status: "Đang mở bán", price: "Từ 3.5 tỷ", location: "Thủ Đức" },
  { id: 2, title: "Vinhomes Cần Giờ", status: "Đang mở bán", price: "Từ 6.2 tỷ", location: "Cần Giờ" },
  { id: 3, title: "Vinhomes Hóc Môn", status: "Đã bàn giao", price: "Từ 4.8 tỷ", location: "Hóc Môn" },
  { id: 4, title: "Greenia Riverside", status: "Đang mở bán", price: "Từ 5.1 tỷ", location: "Quận 7" },
  { id: 5, title: "Sunshine City", status: "Đã bàn giao", price: "Từ 7.0 tỷ", location: "Quận 9" },
];

const newsList: News[] = [
  { id: 1, title: "Bất động sản TP.HCM tăng giá mạnh", category: "Thị trường", date: "15/05/2026" },
  { id: 2, title: "Chọn căn hộ thông minh cùng Greenia Homes", category: "Cẩm nang", date: "12/05/2026" },
  { id: 3, title: "Xu hướng đầu tư đất nền ven đô", category: "Đầu tư", date: "10/05/2026" },
  { id: 4, title: "Thiết kế tiện ích chuẩn 5 sao", category: "Tiện ích", date: "08/05/2026" },
  { id: 5, title: "Kinh nghiệm vay ngân hàng mua nhà", category: "Tài chính", date: "05/05/2026" },
];

export default function Home() {
  const [productLimit, setProductLimit] = useState(10);
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
              // Cải thiện logic nhận diện loại sản phẩm (Bán/Cho thuê) từ Admin
              const rawType = (value.type || value.label || "Bán").toString().toLowerCase();
              const finalLabel = (rawType.includes("thuê") || rawType === "rent") ? "Cho thuê" : "Bán";

              return {
                id: key, 
                title: value.title || "Chưa có tiêu đề",
                type: finalLabel,
                label: finalLabel,
                price: value.price || "Liên hệ",
                location: value.location || "TP.HCM",
                region: value.region || value.location || "TP.HCM",
                priceRange: value.priceRange || value.price || "Liên hệ",
              };
            }
          ).reverse(); // Đảo ngược mảng để sản phẩm mới nhất lên đầu!
          
          setFirebaseProducts(fbProducts);
        }
      },
      (error) => console.error("Error fetching products:", error)
    );
    return () => unsubscribe();
  }, []);

  // Nếu có dữ liệu Firebase thì ưu tiên dùng toàn bộ, không thì dùng dữ liệu mẫu
  const allProducts = firebaseProducts.length > 0 ? firebaseProducts : productList;
  const visibleProducts = allProducts.slice(0, productLimit);

  const handleProductMore = () => {
    if (productLimit === 10) {
      setProductLimit(15);
      return;
    }
    window.location.href = "/san-pham";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">Greenia Homes</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Nhà ở xanh, đầu tư sinh lời và an cư bền vững.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Greenia Homes đem đến giải pháp bất động sản trọn gói: từ sản phẩm bán, cho thuê, dự án đến tin tức hữu ích và hỗ trợ tư vấn chuyên sâu.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/lien-he" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 text-center">
                Yêu cầu tư vấn ngay
              </Link>
              <Link href="#products" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Xem sản phẩm nổi bật
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-slate-900 text-white shadow-xl">
            <div className="relative h-full min-h-[520px] bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.35),_transparent_35%),linear-gradient(180deg,_#047857,_#0f766e)] p-8 sm:p-10">
              <div className="space-y-6">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                  Banner giới thiệu
                </span>
                <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Tư vấn bất động sản phù hợp từng nhu cầu
                </h2>
                <p className="max-w-xl text-sm leading-6 text-slate-200 sm:text-base">
                  Điền thông tin bên dưới để được Greenia liên hệ với phương án tài chính và sản phẩm phù hợp nhất.
                </p>
              </div>

              <div className="mt-10 rounded-[2rem] bg-white/10 p-6 backdrop-blur-sm shadow-xl sm:p-8">
                <div className="grid gap-4">
                  <input type="text" placeholder="Tên của bạn" className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-200 outline-none" />
                  <input type="tel" placeholder="Số điện thoại" className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-200 outline-none" />
                  <input type="text" placeholder="Nhu cầu (mua/thuê, khu vực, ngân sách)" className="w-full rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-200 outline-none" />
                  <button className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                    Gửi yêu cầu tư vấn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Giới thiệu</p>
              <h2 className="text-2xl font-semibold text-slate-900">Tầm nhìn, chiến lược, quy trình</h2>
              <p className="text-slate-600">
                Chúng tôi xây dựng hành trình mua bán bất động sản bằng dữ liệu, trải nghiệm khách hàng và kiểm duyệt nội dung chặt chẽ.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Tầm nhìn</h3>
              <p className="mt-3 text-slate-600">Mang lại không gian sống xanh, an toàn và hiện đại cho cộng đồng.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Quy trình</h3>
              <p className="mt-3 text-slate-600">Từ khảo sát đến ký hợp đồng, mỗi bước đều rõ ràng, minh bạch và hỗ trợ chuyên nghiệp.</p>
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Lý do chọn</p>
              <h2 className="text-3xl font-semibold text-slate-900">Vì sao nên chọn Greenia Homes?</h2>
            </div>
            <p className="max-w-xl text-slate-600">
              Sản phẩm đa dạng, quy trình rõ ràng, hỗ trợ pháp lý và dịch vụ tư vấn tận tâm cho gia đình bạn.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { title: "Hỗ trợ toàn diện", detail: "Tư vấn, pháp lý, thiết kế và hậu mãi trong cùng một giải pháp." },
              { title: "Sản phẩm đa dạng", detail: "Bán, cho thuê, dự án, nhà phố, căn hộ và biệt thự." },
              { title: "Quy trình rõ ràng", detail: "Cập nhật tiến độ, thẩm định, ký duyệt và bàn giao minh bạch." },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="products" className="mt-14 space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Sản phẩm</p>
              <h2 className="text-3xl font-semibold text-slate-900">Danh sách sản phẩm</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-slate-600">
              <span className="rounded-full border border-slate-200 px-3 py-1">Bán</span>
              <span className="rounded-full border border-slate-200 px-3 py-1">Cho thuê</span>
              <span className="rounded-full border border-slate-200 px-3 py-1">Khu vực</span>
              <span className="rounded-full border border-slate-200 px-3 py-1">Khoảng giá</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {visibleProducts.map((product) => (
              <article key={product.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 h-36 rounded-3xl bg-slate-100" />
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">{product.label}</span>
                  <span className="text-xs text-slate-500">{product.location}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{product.price}</p>
              </article>
            ))}
          </div>
          <button
            type="button"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            onClick={handleProductMore}
          >
            {productLimit === 10 ? "Xem thêm 5 sản phẩm" : "Trở về trang sản phẩm"}
          </button>
        </section>

        <section className="mt-14 space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Bất động sản dành cho bạn</p>
              <h2 className="text-3xl font-semibold text-slate-900">Sản phẩm bạn đã xem gần đây</h2>
            </div>
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
              Xem thêm sản phẩm
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {/* Đã sửa: Đồng bộ thành allProducts thay vì productList */}
            {allProducts.slice(0, 5).map((product) => (
              <article key={product.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="mb-4 h-36 rounded-3xl bg-slate-200" />
                <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{product.price}</p>
              </article>
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
            {/* Đã sửa: Dùng allProducts để lấy dữ liệu thực từ Firebase */}
            {allProducts.filter((item) => item.label === "Bán").slice(0, 5).map((product) => (
              <article key={product.id} className="min-w-[18rem] rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 h-40 rounded-3xl bg-slate-100" />
                <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{product.location}</p>
              </article>
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
            {/* Đã sửa: Dùng allProducts để lấy dữ liệu thực từ Firebase */}
            {allProducts.filter((item) => item.label === "Cho thuê").slice(0, 5).map((product) => (
              <article key={product.id} className="min-w-[18rem] rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 h-40 rounded-3xl bg-slate-100" />
                <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{product.location}</p>
              </article>
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
            {projectList.map((project) => (
              <article key={project.id} className="min-w-[18rem] rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="mb-4 h-40 rounded-3xl bg-slate-200" />
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{project.status}</div>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{project.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{project.price}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}