import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import { RESOURCE_SIZE } from "@static/constants";
import { getManifestURL } from "@utils/userGroup";
import Head from "next/head";
import Script from "next/script";
import React, { useMemo } from "react";

export default function Metadata() {
  const { currentGroup } = useGlobalState();
  const manifestURL = useMemo(() => getManifestURL(currentGroup), [currentGroup]);

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href={currentGroup?.icon + RESOURCE_SIZE.APPLE_TOUCH} />
        <link rel="manifest" href={manifestURL} />
      </Head>
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
                gtag('config', '${SITE_CONFIG.TRACKING.GA_ID}');
              `
            }}
          />
        </>
      )}
    </>
  );
}
