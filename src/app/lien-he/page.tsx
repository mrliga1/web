import Link from "next/link";

export default function LienHePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-slate-900">
                Trang chủ
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-slate-900">Liên hệ</li>
          </ol>
        </nav>

        <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr]">
            <section className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-700">Liên hệ</p>
                <h1 className="text-4xl font-semibold text-slate-900">Kết nối với đội ngũ Greenia Homes</h1>
              </div>

              <p className="max-w-3xl text-slate-600">
                Hãy gửi yêu cầu tư vấn, đặt lịch xem nhà hoặc hỏi thông tin sản phẩm. Chúng tôi sẽ phản hồi nhanh chóng trong giờ hành chính.
              </p>

              <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div>
                  <p className="text-sm text-slate-500">Địa chỉ</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Số XYZ, Quận 7, TP.HCM</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">info@greeniahomes.vn</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Số điện thoại</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">0909 123 456</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-slate-50 p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Form yêu cầu tư vấn</h2>
              <div className="mt-6 space-y-4">
                <input type="text" placeholder="Họ và tên" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none" />
                <input type="tel" placeholder="Số điện thoại" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none" />
                <input type="email" placeholder="Email" className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none" />
                <textarea placeholder="Nhập yêu cầu của bạn" className="h-32 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none" />
                <button className="w-full rounded-3xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
                  Gửi yêu cầu
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
