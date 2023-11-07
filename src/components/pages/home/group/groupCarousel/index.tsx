import { Box } from "@chakra-ui/react";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React from "react";
import Slider from "react-slick";

import { NavigationButtons } from "./navigation";

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

const carouselHeight = { base: "200px", md: "380px" };

export default function GroupCarousel({ info }) {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  return (
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

      <NavigationButtons slider={slider} />

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {info?.gallerySlider?.map((item, index) => (
          <Box
            key={index}
            height={carouselHeight}
            position="relative"
            backgroundImage={getNextResourceThumbnail(
              RESOURCE_CTX.USERGROUPS,
              item.fileName,
              "?h=300"
            )}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
          />
        ))}
      </Slider>
    </Box>
  );
}
