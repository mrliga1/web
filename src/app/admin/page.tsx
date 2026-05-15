"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const adminCards = [
  { title: "Bài viết", description: "Tạo, sửa, phê duyệt nội dung blog và tin tức.", href: "/admin/posts" },
  { title: "Sản phẩm", description: "Quản lý sản phẩm bán, cho thuê, danh mục và trạng thái.", href: "/admin/products" },
  { title: "Dự án", description: "Quản lý dự án, thông tin giá bán, vị trí và tiến độ.", href: "/admin/projects" },
  { title: "SEO & Metadata", description: "Thiết lập tiêu đề, mô tả và thẻ SEO cho trang.", href: "/admin/seo" },
];

import { signOut as signOutUser } from "../../lib/auth";

export default function AdminPage() {
  const [role, setRole] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("greeniaAdminRole");
  });
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [pageTitle, setPageTitle] = useState("Tiêu đề nội dung mẫu");
  const [pageSummary, setPageSummary] = useState("Tóm tắt nội dung hiển thị ở phần trực quan.");
  const [pageImage, setPageImage] = useState("https://via.placeholder.com/640x360.png?text=Banner");
  const [codeValue, setCodeValue] = useState(`{
  "title": "Tiêu đề nội dung mẫu",
  "summary": "Tóm tắt nội dung hiển thị ở phần trực quan.",
  "image": "https://via.placeholder.com/640x360.png?text=Banner"
}`);

  const handleLogout = async () => {
    try {
      await signOutUser();
      window.localStorage.removeItem("greeniaAdminRole");
      setRole(null);
      setActiveTab("Dashboard");
      window.location.href = "/login";
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Không thể đăng xuất");
    }
  };

  const editorDescription = useMemo(
    () => ({
      title: pageTitle,
      summary: pageSummary,
      image: pageImage,
    }),
    [pageTitle, pageSummary, pageImage]
  );

  return (
    <div className="min-h-screen bg-[#04060f] px-4 py-10 text-[#efdfa6] sm:px-6 lg:px-8">
      {role === null ? (
        <div className="mx-auto max-w-xl rounded-[2rem] bg-[#08121f] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
          <h1 className="text-3xl font-semibold text-white">Đang tải thông tin tài khoản</h1>
          <p className="mt-3 text-sm text-[#b9b3a1]">Vui lòng chờ trong giây lát để xác thực quyền truy cập admin.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col gap-6 rounded-[2rem] bg-[#08121f] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#d5c18d]">Kênh quản trị</p>
              <h1 className="text-3xl font-semibold text-white">Xin chào, {role === "admin" ? "Admin" : "Biên tập viên"}</h1>
              <p className="mt-2 text-sm text-[#b9b3a1]">Chọn chức năng để quản lý nội dung và chỉnh sửa nhanh bằng visual hoặc code editor.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-3xl bg-[#0f1725] px-5 py-3 text-sm text-[#d5c18d]">Quyền: {role}</div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-[#1f2937] px-5 py-3 text-sm font-semibold text-[#efdfa6] hover:bg-[#28313d]"
              >
                Đăng xuất
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#08121f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] border border-[#1f2937]">
            <div className="flex flex-wrap gap-3">
              {[
                "Dashboard",
                "Trực quan",
                "Code",
              ].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab === tab ? "bg-[#d5c18d] text-[#05080f]" : "bg-[#0f1725] text-[#d5c18d] hover:bg-[#162237]"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Dashboard" && (
              <div className="mt-8 space-y-8">
                <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
                  <div className="space-y-6 rounded-[2rem] bg-[#08121f] p-8 border border-[#233044]">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-[#d5c18d]">Tổng quan</p>
                      <h2 className="mt-3 text-2xl font-semibold text-white">Bảng điều khiển</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                      {[
                        { label: "Bài viết chờ duyệt", value: "4" },
                        { label: "Sản phẩm đang xử lý", value: "12" },
                      ].map((card) => (
                        <div key={card.label} className="rounded-3xl bg-[#0b1624] p-6 shadow-sm">
                          <p className="text-sm text-[#b9b3a1]">{card.label}</p>
                          <p className="mt-4 text-3xl font-semibold text-white">{card.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <aside className="space-y-6 rounded-[2rem] bg-[#08121f] p-6">
                    <div className="rounded-3xl bg-[#0b1624] p-6 shadow-sm">
                      <p className="text-sm uppercase tracking-[0.24em] text-[#d5c18d]">Mẹo quản trị</p>
                      <p className="mt-3 text-sm text-[#b9b3a1]">Sử dụng tab Trực quan để chỉnh sửa nội dung nhanh, tab Code để cấu hình chi tiết JSON hoặc HTML.</p>
                    </div>
                    <div className="rounded-3xl border border-[#233044] bg-[#0b1624] p-6">
                      <p className="text-sm uppercase tracking-[0.24em] text-[#d5c18d]">Quyền biên tập</p>
                      <p className="mt-3 text-sm text-[#b9b3a1]">Biên tập viên không có quyền xóa nội dung. Chỉ admin mới có toàn quyền.</p>
                    </div>
                  </aside>
                </section>

                <section className="grid gap-6 lg:grid-cols-2">
                  {adminCards.map((card) => (
                    <Link
                      key={card.title}
                      href={card.href}
                      className="rounded-[2rem] border border-[#233044] bg-[#08121f] p-6 shadow-sm transition hover:border-[#d5c18d] hover:bg-[#0a1722]"
                    >
                      <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                      <p className="mt-3 text-[#b9b3a1]">{card.description}</p>
                    </Link>
                  ))}
                </section>
              </div>
            )}

            {activeTab === "Trực quan" && (
              <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
                <section className="space-y-6 rounded-[2rem] bg-[#08121f] p-8">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[#d5c18d]">Trình soạn thảo trực quan</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">Chỉnh sửa nội dung nhanh</h2>
                  </div>
                  <div className="space-y-4 rounded-3xl bg-[#0b1624] p-6 shadow-sm">
                    <label className="block text-sm font-medium text-[#b9b3a1]">Tiêu đề</label>
                    <input
                      value={pageTitle}
                      onChange={(event) => setPageTitle(event.target.value)}
                      className="w-full rounded-3xl border border-[#233044] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none"
                    />
                  </div>
                  <div className="space-y-4 rounded-3xl bg-[#0b1624] p-6 shadow-sm">
                    <label className="block text-sm font-medium text-[#b9b3a1]">Tóm tắt</label>
                    <textarea
                      value={pageSummary}
                      onChange={(event) => setPageSummary(event.target.value)}
                      rows={5}
                      className="w-full rounded-3xl border border-[#233044] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none"
                    />
                  </div>
                  <div className="space-y-4 rounded-3xl bg-[#0b1624] p-6 shadow-sm">
                    <label className="block text-sm font-medium text-[#b9b3a1]">URL ảnh preview</label>
                    <input
                      value={pageImage}
                      onChange={(event) => setPageImage(event.target.value)}
                      className="w-full rounded-3xl border border-[#233044] bg-[#0d1523] px-4 py-3 text-[#efdfa6] outline-none"
                    />
                  </div>
                </section>
                <aside className="space-y-6 rounded-[2rem] bg-[#08121f] p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.24em] text-[#d5c18d]">Xem trước</p>
                  <div className="rounded-[2rem] border border-[#233044] bg-[#0b1624] p-6">
                    <div className="mb-5 h-48 overflow-hidden rounded-3xl bg-[#09111c]">
                      <img src={editorDescription.image} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#d5c18d]">Nội dung trực quan</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{editorDescription.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#b9b3a1]">{editorDescription.summary}</p>
                  </div>
                </aside>
              </div>
            )}

            {activeTab === "Code" && (
              <div className="mt-8 rounded-[2rem] bg-[#08121f] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.15)] border border-[#233044]">
                <div className="space-y-4 rounded-3xl bg-[#0b1624] p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.24em] text-[#d5c18d]">Trình soạn thảo mã</p>
                  <p className="text-sm text-[#b9b3a1]">Sửa cấu trúc JSON/HTML cho phần nội dung admin hoặc page template.</p>
                  <textarea
                    value={codeValue}
                    onChange={(event) => setCodeValue(event.target.value)}
                    rows={18}
                    className="w-full rounded-3xl border border-[#233044] bg-[#0d1523] px-4 py-4 font-mono text-sm text-[#efdfa6] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(codeValue);
                        setPageTitle(parsed.title || pageTitle);
                        setPageSummary(parsed.summary || pageSummary);
                        setPageImage(parsed.image || pageImage);
                      } catch {
                        setError("Mã JSON không hợp lệ. Vui lòng kiểm tra lại.");
                      }
                    }}
                    className="rounded-full bg-[#d5c18d] px-6 py-3 text-sm font-semibold text-[#05080f] hover:bg-[#efdfa6]"
                  >
                    Cập nhật từ code
                  </button>
                  {error ? <p className="text-sm text-[#ffb3b3]">{error}</p> : null}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
