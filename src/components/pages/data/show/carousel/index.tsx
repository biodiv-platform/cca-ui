import { Box, Carousel, Flex, IconButton } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

import useTemplateResponseShow from "../use-template-response-show";
import CarouselResourceInfo from "./resource-info";
import Slide, { NoSlide } from "./slide";

export default function Gallery() {
  const [page, setPage] = useState(0);

  const {
    header: { files: resources = [] }
  } = useTemplateResponseShow();

  const handlePageChange = useCallback((details: { page: number }) => {
    setPage(details.page);
  }, []);

  if (!resources.length) {
    return <NoSlide />;
  }

  return (
    <Box bg="gray.900" position="relative">
      <CarouselResourceInfo currentResource={resources[page]} />

      <Box h={{ base: "200px", md: "416px" }}>
        <Carousel.Root
          page={page}
          onPageChange={handlePageChange}
          slideCount={resources.length}
          slidesPerPage={1}
          gap="4"
          draggable={false}
        >
          <Carousel.Control>
            <Carousel.ItemGroup>
              {resources.map((resource, index) => (
                <Carousel.Item key={resource.path} index={index}>
                  <Flex
                    minW="100%"
                    align="center"
                    justify="center"
                    h={{ base: "200px", md: "416px" }}
                    overflow="hidden"
                  >
                    <Slide resource={resource} />
                  </Flex>
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>

            {/* Navigation */}
            <Carousel.PrevTrigger asChild>
              <IconButton
                position="absolute"
                left="4"
                top="50%"
                transform="translateY(-50%)"
                aria-label="Previous"
                variant="subtle"
                rounded="full"
                opacity={0.3}
                _hover={{ opacity: 1 }}
                disabled={page === 0}
              >
                <LuMoveLeft />
              </IconButton>
            </Carousel.PrevTrigger>

            <Carousel.NextTrigger asChild>
              <IconButton
                position="absolute"
                right="4"
                top="50%"
                transform="translateY(-50%)"
                aria-label="Next"
                variant="subtle"
                rounded="full"
                opacity={0.3}
                _hover={{ opacity: 1 }}
                disabled={page === resources.length - 1}
              >
                <LuMoveRight />
              </IconButton>
            </Carousel.NextTrigger>

            {/* Indicators */}
            <Carousel.IndicatorGroup
              position="absolute"
              bottom="6"
              left="50%"
              transform="translateX(-50%)"
              gap="2"
            >
              {resources.map((_, index) => (
                <Carousel.Indicator
                  key={index}
                  index={index}
                  boxSize="0.8em"
                  borderRadius="full"
                  bg="whiteAlpha.500"
                  _current={{ bg: "white" }}
                />
              ))}
            </Carousel.IndicatorGroup>
          </Carousel.Control>
        </Carousel.Root>
      </Box>
    </Box>
  );
}
