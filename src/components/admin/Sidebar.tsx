"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-6 border-r border-[#2b3447] bg-[#071019] p-6 text-[#efdfa6] shadow-[20px_0_60px_rgba(0,0,0,0.45)] md:flex">
      <div className="rounded-[2rem] bg-gradient-to-b from-[#0f172a] to-[#111827] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c6b283]">Luxury Admin</p>
        <h2 className="mt-4 text-2xl font-semibold text-white">Greenia</h2>
        <p className="mt-2 text-sm text-[#a8a29e]">Kênh quản trị nội dung</p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        <Link href="/admin" className="rounded-3xl px-4 py-3 text-sm font-semibold text-[#f4e7b0] transition hover:bg-[#132132] hover:text-white">Dashboard</Link>
        <Link href="/admin/posts" className="rounded-3xl px-4 py-3 text-sm font-semibold text-[#f4e7b0] transition hover:bg-[#132132] hover:text-white">Bài viết</Link>
        <Link href="/admin/posts/new" className="rounded-3xl px-4 py-3 text-sm font-semibold text-[#f4e7b0] transition hover:bg-[#132132] hover:text-white">Tạo bài mới</Link>
        <Link href="/admin/products" className="rounded-3xl px-4 py-3 text-sm font-semibold text-[#f4e7b0] transition hover:bg-[#132132] hover:text-white">Sản phẩm</Link>
        <Link href="/admin/projects" className="rounded-3xl px-4 py-3 text-sm font-semibold text-[#f4e7b0] transition hover:bg-[#132132] hover:text-white">Dự án</Link>
        <Link href="/admin/media" className="rounded-3xl px-4 py-3 text-sm font-semibold text-[#f4e7b0] transition hover:bg-[#132132] hover:text-white">Media</Link>
        <Link href="/admin/settings" className="rounded-3xl px-4 py-3 text-sm font-semibold text-[#f4e7b0] transition hover:bg-[#132132] hover:text-white">Cài đặt</Link>
      </nav>

      <div className="mt-auto rounded-3xl border border-[#1e2735] bg-[#08111d] p-4 text-xs text-[#9ca3af]">
        <p className="font-semibold text-[#efdfa6]">Phiên bản</p>
        <p className="mt-2">0.1</p>
      </div>
    </aside>
  );
}
