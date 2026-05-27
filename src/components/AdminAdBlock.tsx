"use client"
import { useEffect } from "react";

export default function AdminAdBlock() {
  useEffect(() => {
    try {
      const path = window.location?.pathname ?? "";
      if (!path.startsWith("/admin")) return;

      // Remove any AdSense script tags that might have been injected
      document.querySelectorAll('script').forEach((s) => {
        const src = s.getAttribute("src") ?? "";
        const id = s.id ?? "";
        if (src.includes("pagead2.googlesyndication.com") || id === "ads-init") {
          s.remove();
        }
      });

      // Make adsbygoogle.push a no-op to avoid TagError
      try {
        // @ts-ignore
        window.adsbygoogle = { push: () => {} };
      } catch (e) {
        // ignore
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return null;
}
