import { Box } from "@chakra-ui/react";
import { DETAILEDLICENSES, RESOURCE_SIZE } from "@static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

interface PageSliderProps {
  images?;
  description;
  pageId;
}

export function PageSlider({ images, description, pageId }: PageSliderProps) {
  const [licenses, setLicenses] = useState({});

  const carouselHeight = { base: "200px", md: "380px" };

  console.warn("licenses", licenses);
  console.warn("pageId", pageId);
  console.warn("description", description);

  // Settings for the slider
  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
    setLicenses(DETAILEDLICENSES);
  }, []);

  return (
    <>
      <Box position="relative" height={carouselHeight} width="full" overflow="hidden">
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        {/* Slider */}
        <Slider {...settings}>
          {images.map((image, index) => (
            <Box
              key={index}
              height={carouselHeight}
              position="relative"
              backgroundImage={getNextResourceThumbnail(
                RESOURCE_CTX.PAGES,
                image.fileName,
                RESOURCE_SIZE.PAGE
              )}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
            />
          ))}
        </Slider>
      </Box>
    </>
  );
}
