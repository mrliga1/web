"use client";

import { useState } from "react";

export default function AdminSeoPage() {
  const [title, setTitle] = useState("Greenia Homes - Phát triển bất động sản sang trọng");
  const [description, setDescription] = useState(
    "Greenia Homes cung cấp dự án, sản phẩm và tin tức bất động sản cao cấp. Quản lý SEO và metadata ngay trong trang admin."
  );
  const [message, setMessage] = useState("");

  const handleSave = () => {
    setMessage("Đã lưu metadata tạm thời. Hãy triển khai lưu vào backend nếu cần.");
  };

  return (
    <div className="mx-auto max-w-4xl text-[#efdfa6]">
      <div className="mb-6 rounded-[2rem] border border-[#1f2937] bg-[#08121f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <h1 className="text-2xl font-semibold text-white">SEO & Metadata</h1>
        <p className="mt-2 text-sm text-[#b9b3a1]">Điều chỉnh thẻ tiêu đề và mô tả cho trang chủ hoặc các trang quan trọng.</p>
      </div>
      <div className="space-y-6 rounded-[2rem] border border-[#1f2937] bg-[#08121f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#ddd3b6]">Tiêu đề SEO</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-3xl border border-[#1f2937] bg-[#0e1d2e] px-4 py-3 text-[#efdfa6] outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#ddd3b6]">Mô tả SEO</label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-3xl border border-[#1f2937] bg-[#0e1d2e] px-4 py-3 text-[#efdfa6] outline-none"
          />
        </div>
        <button onClick={handleSave} className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
          Lưu thay đổi
        </button>
        {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
      </div>
    </div>
  );
}
