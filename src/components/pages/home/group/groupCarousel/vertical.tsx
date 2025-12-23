import { RESOURCE_SIZE } from "@/static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@/utils/media";
import { Box, Button, chakra, GridItem, Image, SimpleGrid, Carousel } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function MiniCarousel({ featured }) {
  if (!featured?.gallerySlider.length) return null;

  return (
    <Container>
      <Carousel.Root
        slideCount={featured.gallerySlider.length}
        orientation="horizontal"
        slidesPerPage={featured.gallerySlider.slidesPerView}
        gap="12"
        py={12}
        autoplay={{ delay: 5000 }}
        position="relative"
      >
        <Carousel.Control gap="4" width="full" position="relative">
          {/* Slides */}
          <Carousel.ItemGroup>
            {featured.gallerySlider.map((item, index) => (
              <Carousel.Item key={index} index={index}>
                <SimpleGrid
                  alignItems="start"
                  placeItems="center"
                  columns={{ base: 1, md: 2 }}
                  gapY={{ base: 10, md: 32 }}
                  gapX={{ base: 10, md: 24 }}
                >
                  <Image
                    src={getNextResourceThumbnail(
                      RESOURCE_CTX.USERGROUPS,
                      item.fileName,
                      RESOURCE_SIZE.PREVIEW
                    )}
                    borderRadius="lg"
                    shadow="2xl"
                    alt={item.title}
                    maxW="100%"
                    h="380px"
                  />

                  <Box>
                    <chakra.h2
                      mb={6}
                      fontSize={{ base: "3xl", sm: "4xl" }}
                      fontWeight="bold"
                      letterSpacing="tight"
                      color="gray.900"
                    >
                      {item.title}
                    </chakra.h2>

                    <chakra.p mb={6} textAlign="left" color="gray.500" fontSize="lg">
                      {item.customDescripition}
                    </chakra.p>

                    <GridItem
                      display="flex"
                      alignItems="center"
                      justifyContent={{ md: "flex-end" }}
                    >
                      <LocalLink href={item.moreLinks} prefixGroup>
                        <Button w={{ base: "full", sm: "auto" }} size="lg" colorPalette="blue">
                          {item.readMoreText}
                        </Button>
                      </LocalLink>
                    </GridItem>
                  </Box>
                </SimpleGrid>
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>
          <Box position="absolute" bottom="6" width="full">
            <Carousel.Indicators
              transition="width 0.2s ease-in-out"
              transformOrigin="center"
              opacity="0.5"
              boxSize="2"
              _current={{ width: "10", bg: "colorPalette.subtle", opacity: 1 }}
            />
          </Box>
        </Carousel.Control>
      </Carousel.Root>
    </Container>
  );
}
