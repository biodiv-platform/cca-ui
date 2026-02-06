import React from "react";

import GroupCarousel from "./group/groupCarousel";
import MiniCarousel from "./group/groupCarousel/mini-carousel";

export default function HomePageComponent({ homeInfo }) {
  return (
    <>
      {homeInfo?.showGallery &&
        Array.isArray(homeInfo.gallerySlider) &&
        homeInfo.gallerySlider.length > 0 && <GroupCarousel featured={homeInfo.gallerySlider} />}

      {homeInfo?.miniGallery &&
        homeInfo.miniGallery.map((item) => (
          <>
            <MiniCarousel featured={item} aggregationData={homeInfo.aggregationData} />
          </>
        ))}
    </>
  );
}
