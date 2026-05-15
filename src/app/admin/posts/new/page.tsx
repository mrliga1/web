"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import MediaLibraryModal from "../../../../components/admin/MediaLibraryModal";
import { firebaseDatabase } from "../../../../lib/firebase";
import { getIdToken } from "../../../../lib/auth";
import { push, ref as dbRef, set } from "firebase/database";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);

  const handleSelectMedia = (path: string) => {
    setImageUrl(path);
    setShowMediaModal(false);
  };

  const handleFile = async (file?: File) => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = await getIdToken();
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload image thất bại");
      }
      const data = await response.json();
      setImageUrl(data.path);
    } catch (err) {
      console.error(err);
      alert("Upload image thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const postsRef = dbRef(firebaseDatabase, "/posts");
      const newRef = push(postsRef);
      await set(newRef, {
        title,
        summary,
        content,
        image: imageUrl,
        createdAt: Date.now(),
      });
      window.alert("Đã lưu bài viết");
      window.location.href = "/admin/posts";
    } catch (err) {
      console.error(err);
      alert("Lưu bài viết thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl text-[#efdfa6]">
      <div className="mb-6 flex items-center justify-between rounded-[2rem] border border-[#1f2937] bg-[#08121f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <h1 className="text-2xl font-semibold text-white">Tạo bài viết mới</h1>
      </div>

      <div className="space-y-6 rounded-[2rem] bg-[#08121f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-[#1f2937]">
        <div>
          <label className="block text-sm font-medium text-[#b9b3a1]">Tiêu đề</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-3xl border border-[#233044] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#b9b3a1]">Tóm tắt</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="mt-2 w-full rounded-3xl border border-[#233044] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#b9b3a1]">Nội dung</label>
          <div className="mt-2 rounded-3xl border border-[#233044] bg-[#0d1523] px-2 py-2 text-[#efdfa6]">
            <ReactQuill value={content} onChange={setContent} theme="snow" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#b9b3a1]">Ảnh đại diện</label>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} className="rounded-3xl border border-[#233044] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none" />
            <button type="button" onClick={() => setShowMediaModal(true)} className="rounded-full bg-[#d5c18d] px-4 py-2 text-sm font-semibold text-[#05080f] hover:bg-[#efdfa6]">Chọn từ thư viện</button>
            {loading ? <div className="text-sm text-[#94a3b8]">Đang tải...</div> : imageUrl ? <img src={imageUrl} alt="preview" className="h-20 w-32 rounded-3xl object-cover" /> : null}
          </div>
          {imageUrl ? <p className="mt-2 text-sm text-[#b9b3a1]">Đường dẫn: <span className="font-medium text-white">{imageUrl}</span></p> : null}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleSave} disabled={loading} className="rounded-full bg-[#d5c18d] px-5 py-2 text-sm font-semibold text-[#05080f] hover:bg-[#efdfa6]">Lưu</button>
          <a href="/admin/posts" className="text-sm text-[#b9b3a1] hover:text-white">Hủy</a>
        </div>
      </div>
      <MediaLibraryModal open={showMediaModal} onClose={() => setShowMediaModal(false)} onSelect={handleSelectMedia} />
    </div>
  );
}
