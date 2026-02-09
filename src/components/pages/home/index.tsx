import React from "react";

import GroupCarousel from "./group/groupCarousel";
import MiniCarousel from "./group/groupCarousel/mini-carousel";

export default function HomePageComponent({ homeInfo }) {
  const sortedMiniGallery = Array.isArray(homeInfo?.miniGallery)
    ? homeInfo.miniGallery.slice().sort((a, b) => (a?.id || 0) - (b?.id || 0))
    : [];

  return (
    <>
      {homeInfo?.showGallery &&
        Array.isArray(homeInfo.gallerySlider) &&
        homeInfo.gallerySlider.length > 0 && <GroupCarousel featured={homeInfo.gallerySlider} />}

      {sortedMiniGallery.map((item) => (
        <MiniCarousel key={item?.id} featured={item} aggregationData={homeInfo.aggregationData} />
      ))}
    </>
  );
}
