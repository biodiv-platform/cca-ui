import SITE_CONFIG from "@configs/site-config";
import Script from "next/script";
import React from "react";

export default function Metadata() {
  return (
    <>
      {SITE_CONFIG.TRACKING.ENABLED && (
        <>
          {/* GTM Head Tag */}
          <Script
            strategy="afterInteractive"
            id="gtm-head"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${SITE_CONFIG.TRACKING.GTM_ID}');
              `
            }}
          />

          {/* GTM Body Tag */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=${SITE_CONFIG.TRACKING.GTM_ID}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `
            }}
          />
        </>
      )}
    </>
  );
}
