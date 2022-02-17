import { Box, Flex } from "@chakra-ui/react";
import { useKeenSlider } from "keen-slider/react";
import React, { useState } from "react";

import useTemplateResponseShow from "../use-template-response-show";
import Dots from "./dot";
import CarouselNavigation from "./navigation";
import CarouselResourceInfo from "./resource-info";
import Slide, { NoSlide } from "./slide";

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const {
    header: { files: resources = [] }
  } = useTemplateResponseShow();

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slideChanged: (s) => setCurrentSlide(s?.track?.details?.rel),
    created() {
      setLoaded(true);
    }
  });

  return (
    <Box bg="gray.900" p={0} position="relative">
      <CarouselResourceInfo currentResource={resources[currentSlide]} />
      <Box ref={sliderRef} className="keen-slider fade" h={{ base: "200px", md: "416px" }}>
        {resources.length ? (
          resources.map((resource) => (
            <Flex
              key={resource.path}
              className="keen-slider__slide"
              minW="100%"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Slide resource={resource} />
            </Flex>
          ))
        ) : (
          <NoSlide />
        )}
      </Box>
      {loaded && resources.length && (
        <>
          <CarouselNavigation
            prev={slider?.current?.prev}
            next={slider?.current?.next}
            current={currentSlide}
            total={resources.length}
          />
          <Dots
            slidesLength={resources.length}
            moveTo={slider?.current?.moveToIdx}
            currentSlide={currentSlide}
          />
        </>
      )}
    </Box>
  );
}
