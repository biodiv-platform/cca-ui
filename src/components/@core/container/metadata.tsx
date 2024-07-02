import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import { useRouter } from "next/router";
import Script from "next/script";
import { DefaultSeo } from "next-seo";
import React from "react";

export default function Metadata() {
  const router = useRouter();
  const { currentGroup } = useGlobalState();
  const canonical = SITE_CONFIG.SITE.URL + router.asPath;

  return (
    <>
      <DefaultSeo
        title={currentGroup?.name}
        canonical={canonical}
        description={SITE_CONFIG.SITE.DESCRIPTION}
        openGraph={{
          type: "website",
          url: canonical,
          title: currentGroup?.name,
          site_name: currentGroup?.name,
          description: SITE_CONFIG.SITE.DESCRIPTION,
          images: [
            {
              url: "/next-assets/home-human-chain.webp",
              alt: "Home"
            }
          ]
        }}
      />
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
