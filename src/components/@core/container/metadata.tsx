import SITE_CONFIG from "@configs/site-config";
import Script from "next/script";
import React from "react";

export default function Metadata() {
  return (
    <>
      {SITE_CONFIG.TRACKING.ENABLED && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.TRACKING.GA_ID}`}
          />
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${SITE_CONFIG.TRACKING.GA_ID});
        `
            }}
          />
        </>
      )}
    </>
  );
}
