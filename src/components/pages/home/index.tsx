import useGlobalState from "@hooks/use-global-state";
import { stripTags } from "@utils/text";
import { NextSeo } from "next-seo";
import React from "react";

import CTA from "./cta";
import GroupHome from "./group";
import GroupCarousel from "./group/groupCarousel";
import Mission from "./mission";
import Posts from "./posts";
import Statistics from "./statistics";
import WhyThisPortal from "./why-this-portal";
import Gallery from "./carousel";
import MiniCarousel from "./group/groupCarousel/vertical";

export default function HomePageComponent({ featured }) {
  const { currentGroup, languageId } = useGlobalState();

  return (
    <>
      {!currentGroup?.id ? (
        <>
          <Gallery />
          <Mission />
          <WhyThisPortal />
          <Statistics featured={featured} />
          <Posts featured={featured.featured} />
        </>
      ) : (
        <>
          <NextSeo
            title={currentGroup?.name}
            openGraph={{
              title: currentGroup?.name,
              images: [
                {
                  url: currentGroup?.icon + "?w=240",
                  alt: currentGroup?.name
                }
              ],
              description: stripTags(featured?.groupdata?.description)
            }}
          />
          {featured.groupdata.gallerySlider.length > 0 && featured.groupdata.showGallery && (
            <GroupCarousel featured={featured.groupdata.gallerySlider} />
          )}

          {featured.groupdata.miniGallery &&
            featured.groupdata.miniGallery.map((item) => (
              <>
                <MiniCarousel
                  key={`gallery-${item.galleryId}-${languageId}`}
                  featured={item}
                />
              </>
            ))}
          {featured.groupdata.showDesc && <GroupHome info={featured.groupdata} />}
          <Statistics featured={featured} />
        </>
      )}
      <CTA />
    </>
  );
}
