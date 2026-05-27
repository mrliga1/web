"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getUserRole } from "../../lib/auth";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // fallback: ensure we don't stay stuck forever
    const fallback = setTimeout(() => {
      console.warn("Auth check fallback triggered: clearing checking state");
      setChecking(false);
    }, 6000);

    const unsub = onAuthStateChanged(async (user) => {
      try {
        if (!user) {
          router.push("/login");
          return;
        }
        try {
          const r = await getUserRole(user.uid);
          if (r) window.localStorage.setItem("greeniaAdminRole", r);
        } catch (e) {
          console.error("Failed to read user role:", e);
        }
      } finally {
        clearTimeout(fallback);
        setChecking(false);
      }
    });
    return () => {
      clearTimeout(fallback);
      try {
        unsub();
      } catch {}
    };
  }, [router]);

  if (checking) {
    return <div className="min-h-screen bg-slate-50">Đang kiểm tra phiên đăng nhập...</div>;
  }

  return <>{children}</>;
}
