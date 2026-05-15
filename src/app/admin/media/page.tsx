"use client";

import { useEffect, useState } from "react";
import { getIdToken } from "../../../lib/auth";

type MediaItem = {
  name: string;
  path: string;
  url: string;
};

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const loadFiles = async () => {
    try {
      const token = await getIdToken();
      const response = await fetch("/api/upload/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setFiles(await response.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleFileUpload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = await getIdToken();
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Upload thất bại");
      }
      const result = await response.json();
      setMessage(`Đã upload: ${result.path}`);
      await loadFiles();
    } catch (error) {
      console.error(error);
      setMessage("Upload thất bại. Vui lòng thử lại.");
    } finally {
      setUploading(false);
    }
  };

  const handleCopyPath = async (path: string) => {
    await navigator.clipboard.writeText(path);
    setMessage(`Đã sao chép đường dẫn: ${path}`);
  };

  const handleDeleteImage = async (path: string) => {
    if (!confirm(`Xác nhận xoá ${path}?`)) return;
    setUploading(true);
    setMessage("");

    try {
      const token = await getIdToken();
      const response = await fetch("/api/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ path }),
      });
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      setMessage(`Đã xoá: ${path}`);
      await loadFiles();
    } catch (error) {
      console.error(error);
      setMessage("Xoá thất bại. Vui lòng thử lại.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl text-[#efdfa6]">
      <div className="mb-6 flex flex-col gap-3 rounded-[2rem] border border-[#efdfa6] bg-[#05080f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Thư viện Media</h1>
          <p className="mt-2 text-sm text-[#b9b3a1]">Upload ảnh vào thư mục <code className="rounded-full bg-[#0d1523] px-2 py-1 text-[#efdfa6]">/public/uploads</code> và chọn đường dẫn tương đối để gắn cho nội dung.</p>
        </div>
        <div className="rounded-full bg-[#05080f] px-4 py-3 text-sm text-[#efdfa6]">Đường dẫn lưu: <span className="font-semibold text-[#efdfa6]">/uploads/tên-ảnh.jpg</span></div>
      </div>

      <div className="mb-6 rounded-[2rem] bg-[#05080f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-[#efdfa6]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="block text-sm font-medium text-[#efdfa6]">Chọn ảnh mới</label>
          <input type="file" accept="image/*" onChange={(event) => handleFileUpload(event.target.files?.[0])} className="rounded-3xl border border-[#efdfa6] bg-[#0d1523] px-4 py-2 text-[#efdfa6] outline-none" />
          {uploading ? <div className="text-sm text-[#efdfa6]">Đang upload...</div> : null}
        </div>
        {message ? <p className="mt-4 text-sm text-[#efdfa6]">{message}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {files.length === 0 ? (
          <div className="rounded-[2rem] bg-[#05080f] p-6 text-[#efdfa6] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">Chưa có ảnh nào trong thư mục uploads.</div>
        ) : (
          files.map((file) => (
            <div key={file.path} className="overflow-hidden rounded-[2rem] border border-[#efdfa6] bg-[#05080f] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
              <img src={file.url} alt={file.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <p className="truncate text-sm font-semibold text-[#efdfa6]">{file.name}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#05080f] px-3 py-1 text-xs text-[#efdfa6]">{file.path}</span>
                  <button onClick={() => handleCopyPath(file.path)} className="rounded-full bg-[#efdfa6] px-3 py-1 text-xs font-semibold text-[#05080f] hover:bg-[#f5e8b1]">Sao chép</button>
                  <button onClick={() => handleDeleteImage(file.path)} className="rounded-full bg-[#c95f50] px-3 py-1 text-xs font-semibold text-white hover:bg-[#ce6f63]">Xoá</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
