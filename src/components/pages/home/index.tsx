import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import Carousel from "./carousel";
import CTA from "./cta";
import Mission from "./mission";
import Posts from "./posts";
import WhyThisPortal from "./why-this-portal";

export default function HomePageComponent({ featured }) {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t("common:home")} />
      <Carousel />
      <Mission />
      <WhyThisPortal />
      <Posts featured={featured} />
      <CTA />
    </>
  );
}
