import { RESOURCE_SIZE } from "@/static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@/utils/media";
import {
  AspectRatio,
  Box,
  Button,
  chakra,
  GridItem,
  Image,
  SimpleGrid,
  Carousel
} from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import React from "react";
import Mission from "../../mission";
import WhyThisPortal from "../../why-this-portal";
import Posts from "../../posts";
import Statistics from "../../statistics";

export default function MiniCarousel({ featured, aggregationData }) {
  if (!featured?.gallerySlider?.length) return null;

  const { gallerySlider, slidesPerView } = featured;

  const isSingle = gallerySlider.length === 1;
  const singleItem = gallerySlider[0];

  const hasImage = Boolean(singleItem?.fileName);
  const showGrid = !isSingle && slidesPerView === gallerySlider.length;

  if (isSingle && singleItem.title?.toLowerCase() === "stats") {
    return <Statistics stats={aggregationData} props={singleItem} />;
  }

  /* -------------------------------------------------------------------------- */
  /*                         SINGLE ITEM — NO IMAGE                              */
  /* -------------------------------------------------------------------------- */
  if (isSingle && !hasImage) {
    return <Mission props={singleItem} />;
  }

  /* -------------------------------------------------------------------------- */
  /*                         SINGLE ITEM — WITH IMAGE                            */
  /* -------------------------------------------------------------------------- */
  if (isSingle && hasImage) {
    return <WhyThisPortal props={singleItem} />;
  }

  /* -------------------------------------------------------------------------- */
  /*                         MULTIPLE ITEMS — GRID                               */
  /* -------------------------------------------------------------------------- */
  if (showGrid) {
    return <Posts props={featured} />;
  }

  /* -------------------------------------------------------------------------- */
  /*                         MULTIPLE ITEMS — CAROUSEL                           */
  /* -------------------------------------------------------------------------- */
  return (
    <Box bg={gallerySlider[0].bgColor}>
      <Container>
        <Carousel.Root
          slideCount={gallerySlider.length}
          orientation={featured.isVertical ? "vertical" : "horizontal"}
          slidesPerPage={slidesPerView}
          p={12}
          gap="4"
          autoplay={{ delay: 5000 }}
          height="450px"
          position="relative"
        >
          <Carousel.Control gap="4" width="full" position="relative">
            <Carousel.ItemGroup>
              {gallerySlider.map((item, index) => (
                <Carousel.Item key={index} index={index}>
                  <SimpleGrid
                    alignItems="start"
                    placeItems="center"
                    columns={{ base: 1, md: 2 }}
                    gapY={{ base: 10, md: 32 }}
                    gapX={{ base: 10, md: 24 }}
                  >
                    <AspectRatio
                      ratio={16 / 9}
                      w="100%"
                      maxW="600px"
                      borderRadius="lg"
                      overflow="hidden"
                    >
                      <Image
                        src={getNextResourceThumbnail(
                          RESOURCE_CTX.USERGROUPS,
                          item.fileName,
                          RESOURCE_SIZE.PREVIEW
                        )}
                        alt={item.title}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                      />
                    </AspectRatio>

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

                      <chakra.p mb={6} color="gray.500" fontSize="lg">
                        {item.customDescripition}
                      </chakra.p>

                      {item.readMoreText && (
                        <GridItem
                          display="flex"
                          alignItems="center"
                          justifyContent={{ md: "flex-end" }}
                        >
                          <LocalLink href={item.moreLinks} prefixGroup>
                            <Button size="lg" colorPalette="blue">
                              {item.readMoreText}
                            </Button>
                          </LocalLink>
                        </GridItem>
                      )}
                    </Box>
                  </SimpleGrid>
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>
          </Carousel.Control>
        </Carousel.Root>
      </Container>
    </Box>
  );
}
