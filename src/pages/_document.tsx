import SITE_CONFIG from "@configs/site-config";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

interface IDocumentProps {
  lang?;
}

class MyDocument extends Document<IDocumentProps> {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="description" content={SITE_CONFIG.SITE.DESCRIPTION} />
          <meta name="theme-color" content="#319795" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
