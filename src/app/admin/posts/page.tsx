"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { firebaseDatabase } from "../../../lib/firebase";
import { ref, onValue } from "firebase/database";

type Post = { id: string; title: string; summary?: string; createdAt?: number };

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const r = ref(firebaseDatabase, "/posts");
    return onValue(r, (snapshot) => {
      const val = snapshot.val() || {};
      const list: Post[] = Object.entries(val).map(([k, v]: any) => ({ id: k, title: v.title, summary: v.summary, createdAt: v.createdAt }));
      setPosts(list);
    });
  }, []);

  return (
    <div className="mx-auto max-w-6xl text-[#efdfa6]">
      <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-[#1f2937] bg-[#08121f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Bài viết</h1>
          <p className="mt-1 text-sm text-[#b9b3a1]">Danh sách bài viết hiện có và nhanh chóng chỉnh sửa nội dung.</p>
        </div>
        <Link href="/admin/posts/new" className="rounded-full bg-[#efdfa6] px-4 py-2 text-sm font-semibold text-[#05080f] transition hover:bg-[#f5e8b1]">Tạo bài mới</Link>
      </div>

      <div className="overflow-hidden rounded-[2rem] bg-[#08121f] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-[#1f2937]">
        <table className="w-full table-auto text-left text-sm">
          <thead className="text-[#cbbd8b]">
            <tr>
              <th className="px-4 py-3">Tiêu đề</th>
              <th className="px-4 py-3">Tóm tắt</th>
              <th className="px-4 py-3">Ngày</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-[#e7dfb7]">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-[#94a3b8]">Chưa có bài viết</td>
              </tr>
            ) : (
              posts.map((p) => (
                <tr key={p.id} className="border-t border-[#1f2937]">
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3">{p.summary}</td>
                  <td className="px-4 py-3">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/posts/${p.id}`} className="mr-2 text-sm text-[#efdfa6] hover:text-white">Sửa</Link>
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
