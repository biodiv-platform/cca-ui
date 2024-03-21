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
import Statistics from "./statistics";
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
          <Statistics featured={featured} />
          <Posts featured={featured.featured} />
        </>
      ) : (
        <>
          {featured.groupdata.gallerySlider.length > 0 && featured.groupdata.showGallery && (
            <GroupCarousel featured={featured.groupdata.gallerySlider} />
          )}
          {featured.groupdata.showDesc && <GroupHome info={featured.groupdata} />}
          <Statistics featured={featured} />
        </>
      )}
      <CTA />
    </>
  );
}
