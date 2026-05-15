"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getUserRole } from "../../lib/auth";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const r = await getUserRole(user.uid);
      if (r) window.localStorage.setItem("greeniaAdminRole", r);
      setChecking(false);
    });
    return () => unsub();
  }, [router]);

  if (checking) {
    return <div className="min-h-screen bg-slate-50">Đang kiểm tra phiên đăng nhập...</div>;
  }

  return <>{children}</>;
}
