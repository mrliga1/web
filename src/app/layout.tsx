import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import ClientOnlyAds from "../components/ClientOnlyAds";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-XXXXXXX";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-XXXXXXXXXX";
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-XXXXXXXXXX";

export const metadata: Metadata = {
  title: "Greenia Homes",
  description: "Greenia Homes - Bất động sản xanh, trang quản trị admin và bộ giao diện sản phẩm dự án tin tức.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <ClientOnlyAds />

        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
            <Link href="/" className="text-lg font-semibold text-slate-900">
              Greenia Homes
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
              <Link href="/">Trang chủ</Link>
              <Link href="/san-pham">Sản phẩm</Link>
              <Link href="/du-an">Dự án</Link>
              <Link href="/tin-tuc">Tin tức</Link>
              <Link href="/lien-he">Liên hệ</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="tel:0932966700"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12 1.07.35 2.11.68 3.09a2 2 0 0 1-.45 2.11L9.91 10.09a16 16 0 0 0 6 6l1.17-1.17a2 2 0 0 1 2.11-.45c.98.33 2.02.56 3.09.68A2 2 0 0 1 22 16.92Z" />
                </svg>
                0932 966 700
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-400">Greenia Homes</p>
                <p className="max-w-xl text-sm leading-7 text-slate-300">
                  Greenia Homes cung cấp giải pháp bất động sản xanh cho cuộc sống hiện đại kết hợp đầu tư và nghỉ dưỡng.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Liên kết</p>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    <li>
                      <Link href="/" className="hover:text-white">
                        Trang chủ
                      </Link>
                    </li>
                    <li>
                      <Link href="/san-pham" className="hover:text-white">
                        Sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link href="/du-an" className="hover:text-white">
                        Dự án
                      </Link>
                    </li>
                    <li>
                      <Link href="/tin-tuc" className="hover:text-white">
                        Tin tức
                      </Link>
                    </li>
                    <li>
                      <Link href="/lien-he" className="hover:text-white">
                        Liên hệ
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Liên hệ nhanh</p>
                <div className="rounded-3xl bg-slate-900 p-6 text-sm text-slate-300">
                  <p className="font-semibold text-white">Hỗ trợ tư vấn</p>
                  <p className="mt-3">0932 966 700</p>
                  <p className="mt-2">Xin vui lòng gọi để nhận tư vấn sản phẩm nhanh chóng.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
              © 2026 Greenia Homes. Bản quyền nội dung thuộc Greenia Homes.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
