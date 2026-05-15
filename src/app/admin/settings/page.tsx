import Link from "next/link";

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-6xl text-[#efdfa6]">
      <div className="mb-6 rounded-[2rem] border border-[#1f2937] bg-[#08121f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <h1 className="text-2xl font-semibold text-white">Cài đặt quản trị</h1>
        <p className="mt-1 text-sm text-[#b9b3a1]">Quản lý thiết lập hệ thống, quyền và metadata cho trang.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/settings/roles"
          className="rounded-[2rem] border border-[#1f2937] bg-[#0f1725] p-6 text-left transition hover:border-[#d5c18d] hover:bg-[#112533]"
        >
          <h2 className="text-xl font-semibold text-white">Quản lý Roles</h2>
          <p className="mt-3 text-sm text-[#b9b3a1]">Thay đổi quyền admin / editor cho người dùng đã đăng ký.</p>
        </Link>
        <Link
          href="/admin/seo"
          className="rounded-[2rem] border border-[#1f2937] bg-[#0f1725] p-6 text-left transition hover:border-[#d5c18d] hover:bg-[#112533]"
        >
          <h2 className="text-xl font-semibold text-white">SEO & Metadata</h2>
          <p className="mt-3 text-sm text-[#b9b3a1]">Cập nhật thẻ tiêu đề, mô tả và metadata để tối ưu hoá tìm kiếm.</p>
        </Link>
      </div>
    </div>
  );
}
