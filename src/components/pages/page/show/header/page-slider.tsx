import { Box } from "@chakra-ui/react";
import { DETAILEDLICENSES, RESOURCE_SIZE } from "@static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

interface PageSliderProps {
  images?;
}

export function PageSlider({ images }: PageSliderProps) {
  const [licenses, setLicenses] = useState<any>([]);
  const carouselHeight = { base: "200px", md: "380px" };

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
    <Box position="relative" height={carouselHeight} width="full" overflow="hidden">
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        // charSet="UTF-8"
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
          <Box key={index} position="relative" height={carouselHeight}>
            <Box
              height="full"
              backgroundImage={getNextResourceThumbnail(
                RESOURCE_CTX.PAGES,
                image.fileName,
                RESOURCE_SIZE.PAGE
              )}
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
            />
            {image.attribution && (
              <Box position="absolute" left={0} bottom={0} p={4}>
                {image.caption} by {image.attribution} (
                {licenses.filter((license) => license.id === image.licenseId)[0]?.name || "Unknown"}
                )
              </Box>
            )}
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
