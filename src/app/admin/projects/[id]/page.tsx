"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MediaLibraryModal from "../../../../components/admin/MediaLibraryModal";
import { firebaseDatabase } from "../../../../lib/firebase";
import { getIdToken } from "../../../../lib/auth";
import { ref, onValue, set, remove } from "firebase/database";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const handleSelectMedia = (path: string) => {
    setImageUrl(path);
    setShowMediaModal(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(window.localStorage.getItem("greeniaAdminRole"));
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    const r = ref(firebaseDatabase, `/projects/${id}`);
    return onValue(r, (snap) => {
      const v = snap.val();
      if (!v) return;
      setTitle(v.title || "");
      setLocation(v.location || "");
      setPrice(v.price || "");
      setSummary(v.summary || "");
      setContent(v.content || "");
      setImageUrl(v.image || "");
    });
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await set(ref(firebaseDatabase, `/projects/${id}`), {
        title,
        location,
        price,
        summary,
        content,
        image: imageUrl,
        updatedAt: Date.now(),
      });
      router.push("/admin/projects");
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
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
      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      setImageUrl(data.path);
    } catch (err) {
      console.error(err);
      alert("Upload image thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (role !== "admin") {
      alert("Chỉ admin mới có quyền xóa");
      return;
    }
    if (!confirm("Xác nhận xoá dự án này?")) return;
    setLoading(true);
    try {
      await remove(ref(firebaseDatabase, `/projects/${id}`));
      router.push("/admin/projects");
    } catch (err) {
      console.error(err);
      alert("Xoá thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl text-[#efdfa6]">
      <div className="mb-6 flex items-center justify-between rounded-[2rem] border border-[#efdfa6] bg-[#05080f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <h1 className="text-2xl font-semibold text-white">Sửa dự án</h1>
      </div>

      <div className="space-y-6 rounded-[2rem] bg-[#05080f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-[#efdfa6]">
        <div>
          <label className="block text-sm font-medium text-[#efdfa6]">Tiêu đề</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-3xl border border-[#233044] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#b9b3a1]">Vị trí</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="mt-2 w-full rounded-3xl border border-[#efdfa6] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#b9b3a1]">Giá</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} className="mt-2 w-full rounded-3xl border border-[#efdfa6] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#b9b3a1]">Tóm tắt</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className="mt-2 w-full rounded-3xl border border-[#efdfa6] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none" />
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
            <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} className="rounded-3xl border border-[#efdfa6] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none" />
            <button type="button" onClick={() => setShowMediaModal(true)} className="rounded-full bg-[#d5c18d] px-4 py-2 text-sm font-semibold text-[#05080f] hover:bg-[#efdfa6]">Chọn từ thư viện</button>
          </div>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-3 w-full rounded-3xl border border-[#233044] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none" />
          {imageUrl ? <img src={imageUrl} alt="preview" className="mt-3 h-28 w-48 object-cover" /> : null}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleSave} disabled={loading} className="rounded-full bg-emerald-900 px-5 py-2 text-sm font-semibold text-white">Lưu</button>
          <button onClick={() => router.push("/admin/projects")} className="text-sm text-[#b9b3a1] hover:text-white">Hủy</button>
          {role === "admin" ? (
            <button onClick={handleDelete} disabled={loading} className="ml-auto rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">Xóa</button>
          ) : null}
        </div>
      </div>
      <MediaLibraryModal open={showMediaModal} onClose={() => setShowMediaModal(false)} onSelect={handleSelectMedia} />
    </div>
  );
}
