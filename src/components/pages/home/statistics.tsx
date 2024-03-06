import { Box, Button, chakra, SimpleGrid } from "@chakra-ui/react";
import BoxHeading from "@components/@core/activity/box-heading";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import Slider from "react-slick";

import { generateChartDataForAll, renderChart } from "./data";

export default function Statistics(featured) {
  const { t } = useTranslation();

  const chartDataList = generateChartDataForAll(
    featured.featured.aggregationData,
    featured.featured.filtersList
  );

  // Settings for the slider
  const settings = {
    dots: false,
    arrows: false,
    fade: false,
    infinite: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const carouselHeight = { base: "200px", md: "400px" };

  return (
    <Box>
      <Container>
        <SimpleGrid
          alignItems="start"
          placeItems="center"
          columns={{ base: 1, md: 2 }}
          py={12}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 24 }}
        >
          <Box>
            <chakra.h2
              mb={6}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="bold"
              letterSpacing="tight"
              color="gray.900"
            >
              {t("Charts")}
            </chakra.h2>
            <chakra.p mb={6} textAlign="left" color={"gray.500"} fontSize="lg">
              Total number of documented CCA : {featured.featured.totalCount}
            </chakra.p>
            <LocalLink href="/chart" prefixGroup={true}>
              <Button w={{ base: "full", sm: "auto" }} size="lg" colorScheme="blue" as="a">
                {t("Browse Charts")}
              </Button>
            </LocalLink>
          </Box>

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
              {chartDataList.map((url, index) => (
                <>
                  <BoxHeading>{chartDataList[index]?.Title}</BoxHeading>
                  <Box
                    key={index}
                    height={carouselHeight}
                    position="relative"
                    backgroundPosition="center"
                    backgroundRepeat="repeat"
                    backgroundSize="cover"
                  >
                    {renderChart(chartDataList[index], index)}
                  </Box>
                </>
              ))}
            </Slider>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
