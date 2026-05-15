"use client";

import Link from "next/link";
import { useState } from "react";

type Project = {
  id: number;
  title: string;
  status: string;
  price: string;
  location: string;
};

type Product = {
  id: number;
  title: string;
  price: string;
  location: string;
};

const projects: Project[] = [
  { id: 1, title: "An Phú New City", status: "Đang mở bán", price: "Từ 3.5 tỷ", location: "Thủ Đức" },
  { id: 2, title: "Vinhomes Cần Giờ", status: "Đang mở bán", price: "Từ 6.2 tỷ", location: "Cần Giờ" },
  { id: 3, title: "Vinhomes Hóc Môn", status: "Đã bàn giao", price: "Từ 4.8 tỷ", location: "Hóc Môn" },
  { id: 4, title: "Greenia Riverside", status: "Đang mở bán", price: "Từ 5.1 tỷ", location: "Quận 7" },
  { id: 5, title: "Sunshine City", status: "Đã bàn giao", price: "Từ 7.0 tỷ", location: "Quận 9" },
  { id: 6, title: "Nova Residence", status: "Đang mở bán", price: "Từ 4.9 tỷ", location: "Quận 2" },
  { id: 7, title: "Greenia Lake Park", status: "Đang mở bán", price: "Từ 5.8 tỷ", location: "Nhà Bè" },
  { id: 8, title: "Ocean View Grand", status: "Đã bàn giao", price: "Từ 8.2 tỷ", location: "Vũng Tàu" },
  { id: 9, title: "Sunrise Boulevard", status: "Đang mở bán", price: "Từ 6.0 tỷ", location: "Quận 9" },
  { id: 10, title: "Greenia Garden Hills", status: "Đang mở bán", price: "Từ 5.0 tỷ", location: "Bình Tân" },
  { id: 11, title: "Skyline Park", status: "Đã bàn giao", price: "Từ 6.5 tỷ", location: "Quận 1" },
  { id: 12, title: "Forest City", status: "Đang mở bán", price: "Từ 4.2 tỷ", location: "Hóc Môn" },
  { id: 13, title: "Riverfront Residence", status: "Đang mở bán", price: "Từ 5.7 tỷ", location: "Quận 2" },
  { id: 14, title: "Pearl Avenue", status: "Đã bàn giao", price: "Từ 7.8 tỷ", location: "Quận 3" },
  { id: 15, title: "Greenia Sky Town", status: "Đang mở bán", price: "Từ 5.3 tỷ", location: "Quận 12" },
];

const featuredProducts: Product[] = [
  { id: 1, title: "Greenia River View", price: "4.2 tỷ", location: "Quận 7" },
  { id: 2, title: "Greenia Sky Apartment", price: "18tr/tháng", location: "Thủ Đức" },
  { id: 3, title: "Greenia Lakehouse", price: "6.8 tỷ", location: "Nhà Bè" },
  { id: 4, title: "Greenia Central Park", price: "22tr/tháng", location: "Bình Thạnh" },
  { id: 5, title: "Greenia Garden Home", price: "16tr/tháng", location: "Quận 12" },
];

export default function DuAnPage() {
  const [limit, setLimit] = useState(10);
  const visibleProjects = projects.slice(0, limit);

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
            <li className="font-semibold text-slate-900">Dự án</li>
          </ol>
        </nav>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Dự án</p>
            <h1 className="text-4xl font-semibold text-slate-900">Tất cả dự án nổi bật</h1>
          </div>
          <Link href="/admin" className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
            Quản lý dự án
          </Link>
        </div>

        <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {visibleProjects.map((project) => (
            <article key={project.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 h-40 rounded-3xl bg-slate-100" />
              <div className="mb-3 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
                <span>{project.status}</span>
                <span>{project.location}</span>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">{project.title}</h2>
              <p className="mt-3 text-sm text-slate-600">{project.price}</p>
            </article>
          ))}
        </section>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            onClick={() => setLimit((prev) => Math.min(prev + 5, projects.length))}
          >
            Tải thêm 5 dự án
          </button>
        </div>

        <section className="mt-14 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Sản phẩm nổi bật</p>
              <h2 className="text-3xl font-semibold text-slate-900">Danh sách sản phẩm nổi bật</h2>
            </div>
            <Link href="/san-pham" className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
              Xem sản phẩm
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {featuredProducts.slice(0, 5).map((product) => (
              <article key={product.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="mb-4 h-36 rounded-3xl bg-slate-200" />
                <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{product.price}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
