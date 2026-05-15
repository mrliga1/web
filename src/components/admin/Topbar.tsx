"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseApp } from "../../lib/firebase";

export default function Topbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    if (!firebaseApp) return;
    const auth = getAuth(firebaseApp);
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserEmail(user?.email ?? null);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    if (!firebaseApp) {
      if (typeof window !== "undefined") window.location.href = "/admin";
      return;
    }
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    if (typeof window !== "undefined") window.localStorage.removeItem("greeniaAdminRole");
    window.location.href = "/admin";
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1f2937] bg-[#08111c] px-6 py-4 text-[#efdfa6] shadow-sm shadow-black/10">
      <div className="flex items-center gap-3">
        <button className="md:hidden rounded-3xl bg-[#12202c] px-3 py-2 text-sm font-medium text-[#efdfa6] hover:bg-[#1a2f3f]">Menu</button>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#cbbd8b]">Trang quản trị</p>
          <div className="text-sm font-semibold">Bảng điều khiển</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {userEmail ? <div className="rounded-full bg-[#0f1725] px-4 py-2 text-sm text-[#cbd5e1]">{userEmail}</div> : null}
        <button onClick={handleLogout} className="rounded-full bg-[#efdfa6] px-4 py-2 text-sm font-semibold text-[#05080f] transition hover:bg-[#f5e8b1]">Đăng xuất</button>
      </div>
    </div>
  );
}
