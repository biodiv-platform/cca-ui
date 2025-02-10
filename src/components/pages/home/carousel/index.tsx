import { Box } from "@chakra-ui/react";
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

const slides = [
  "/next-assets/carousel/5.webp",
  "/next-assets/carousel/1.webp",
  "/next-assets/carousel/6.webp",
  "/next-assets/carousel/2.webp",
  "/next-assets/carousel/3.webp",
  "/next-assets/carousel/4.webp"
];

export default function Carousel() {
  const [slider, setSlider] = React.useState<Slider | null>(null);

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

      <NavigationButtons slider={slider} />

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {slides.map((url, index) => (
          <Box
            key={index}
            height={carouselHeight}
            position="relative"
            backgroundImage={`url(${url})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
          />
        ))}
      </Slider>
    </Box>
  );
}
