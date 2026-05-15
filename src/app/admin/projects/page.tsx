"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { firebaseDatabase } from "../../../lib/firebase";
import { ref, onValue } from "firebase/database";

type Project = { id: string; title: string; location?: string; price?: string; createdAt?: number };

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);

  useEffect(() => {
    const r = ref(firebaseDatabase, "/projects");
    return onValue(r, (snapshot) => {
      const val = snapshot.val() || {};
      const list: Project[] = Object.entries(val).map(([k, v]: any) => ({ id: k, title: v.title, location: v.location, price: v.price, createdAt: v.createdAt }));
      setItems(list);
    });
  }, []);

  return (
    <div className="mx-auto max-w-6xl text-[#efdfa6]">
      <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-[#efdfa6] bg-[#05080f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dự án</h1>
          <p className="mt-1 text-sm text-[#b9b3a1]">Quản lý dự án, vị trí, giá cả và nội dung chi tiết.</p>
        </div>
        <Link href="/admin/projects/new" className="rounded-full bg-[#efdfa6] px-4 py-2 text-sm font-semibold text-[#05080f] transition hover:bg-[#f5e8b1]">Tạo dự án</Link>
      </div>

      <div className="overflow-hidden rounded-[2rem] bg-[#05080f] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-[#efdfa6]">
        <table className="w-full table-auto text-left text-sm">
          <thead className="text-[#cbbd8b]">
            <tr>
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3">Vị trí</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Ngày</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-[#e7dfb7]">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-[#94a3b8]">Chưa có dự án</td>
              </tr>
            ) : (
              items.map((p) => (
                <tr key={p.id} className="border-t border-[#1f2937]">
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3">{p.location}</td>
                  <td className="px-4 py-3">{p.price}</td>
                  <td className="px-4 py-3">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/projects/${p.id}`} className="mr-2 text-sm text-[#efdfa6] hover:text-white">Sửa</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
