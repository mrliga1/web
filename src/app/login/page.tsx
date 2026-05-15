"use client";

import { useState } from "react";
import { signIn, register } from "../../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async () => {
    try {
      setError("");
      if (isRegister) {
        await register(email, password, "editor");
        window.location.href = "/admin";
      } else {
        await signIn(email, password);
        window.location.href = "/admin";
      }
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Lỗi xác thực");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold">{isRegister ? "Đăng ký" : "Đăng nhập"}</h1>
        <p className="mt-2 text-sm text-slate-600">Sử dụng tài khoản để truy cập trang quản trị.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-700">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-slate-700">Mật khẩu</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2" />
          </div>
          {error ? <div className="text-sm text-red-600">{error}</div> : null}
          <div className="flex items-center gap-3">
            <button onClick={handleSubmit} className="rounded-full bg-emerald-900 px-5 py-2 text-sm font-semibold text-white">{isRegister ? "Đăng ký" : "Đăng nhập"}</button>
            <button onClick={() => setIsRegister(!isRegister)} className="text-sm text-slate-600">{isRegister ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
