import useGlobalState from "@hooks/use-global-state";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import Carousel from "./carousel";
import CTA from "./cta";
import GroupHome from "./group";
import GroupCarousel from "./group/groupCarousel";
import Mission from "./mission";
import Posts from "./posts";
import WhyThisPortal from "./why-this-portal";

export default function HomePageComponent({ featured }) {
  const { t } = useTranslation();
  const { currentGroup } = useGlobalState();

  return (
    <>
      <NextSeo title={t("common:home")} />
      {!currentGroup?.id ? (
        <>
          <Carousel />
          <Mission />
          <WhyThisPortal />
          <Posts featured={featured} />
        </>
      ) : (
        <>
          {featured.gallerySlider.length > 0 && featured.showGallery && (
            <GroupCarousel info={featured} />
          )}
          {featured.showDesc && <GroupHome info={featured} />}
        </>
      )}
      <CTA />
    </>
  );
}
