import type { Metadata } from "next";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import AdminAuthGuard from "../../components/admin/AdminAuthGuard";
import AdminAdBlock from "../../components/AdminAdBlock";

export const metadata: Metadata = {
  title: "Admin - Greenia Homes",
  description: "Trang quản trị Greenia Homes cho nội dung sản phẩm, dự án, tin tức và SEO.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <AdminAdBlock />
      <div className="min-h-screen bg-[#04060f] text-[#efdfa6]">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col bg-[radial-gradient(circle_at_top,_rgba(14,21,39,0.92),_#05080f_85%)]">
            <Topbar />
            <main className="flex-1 p-6 md:p-8">{children}</main>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
