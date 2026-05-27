"use client"
import React, { useEffect, useState } from "react";
import Script from "next/script";

export default function ClientOnlyAds() {
  const [showAds, setShowAds] = useState(false);

  useEffect(() => {
    try {
      const path = window.location?.pathname ?? "";
      if (!path.startsWith("/admin")) setShowAds(true);
    } catch (e) {
      setShowAds(false);
    }
  }, []);

  if (!showAds) return null;

  const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-XXXXXXXXXX";
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-XXXXXXX";
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-XXXXXXXXXX";

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { page_path: window.location.pathname });`}
      </Script>

      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script id="ads-init" strategy="afterInteractive">
        {`(window.adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: '${ADS_ID}', enable_page_level_ads: true });`}
      </Script>
    </>
  );
}
