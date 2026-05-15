"use client";

import { useEffect, useState } from "react";
import { getIdToken } from "../../lib/auth";

type MediaItem = {
  name: string;
  path: string;
  url: string;
};

type MediaLibraryModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
};

export default function MediaLibraryModal({ open, onClose, onSelect }: MediaLibraryModalProps) {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const load = async () => {
      setLoading(true);
      try {
        const token = await getIdToken();
        const response = await fetch("/api/upload/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFiles(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [open]);

  const handleCopy = async (path: string) => {
    await navigator.clipboard.writeText(path);
    setMessage(`Đã sao chép: ${path}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-[#08121f] shadow-2xl border border-[#233044]">
        <div className="flex items-center justify-between border-b border-[#233044] px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Thư viện Media</h2>
            <p className="text-sm text-[#b9b3a1]">Chọn ảnh để gán vào sản phẩm hoặc dự án.</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-[#0f1725] px-3 py-2 text-sm text-[#efdfa6] hover:bg-[#162237]">Đóng</button>
        </div>
        <div className="p-6">
          {message ? <div className="mb-4 rounded-2xl bg-[#16311e] p-3 text-sm text-[#a8f0b3]">{message}</div> : null}
          {loading ? (
            <div className="rounded-3xl border border-[#233044] bg-[#0b1624] p-8 text-center text-[#b9b3a1]">Đang tải...</div>
          ) : files.length === 0 ? (
            <div className="rounded-3xl border border-[#233044] bg-[#0b1624] p-8 text-center text-[#b9b3a1]">Chưa có ảnh nào trong thư viện.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {files.map((file) => (
                <div key={file.path} className="overflow-hidden rounded-3xl border border-[#233044] bg-[#0b1624] shadow-sm">
                  <img src={file.url} alt={file.name} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <p className="truncate text-sm font-medium text-white">{file.name}</p>
                    <p className="mt-1 text-xs text-[#b9b3a1] break-all">{file.path}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button onClick={() => onSelect(file.path)} className="rounded-full bg-[#d5c18d] px-3 py-2 text-xs font-semibold text-[#05080f] hover:bg-[#efdfa6]">Chọn</button>
                      <button onClick={() => handleCopy(file.path)} className="rounded-full bg-[#0f1725] px-3 py-2 text-xs text-[#efdfa6] hover:bg-[#162237]">Sao chép</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
