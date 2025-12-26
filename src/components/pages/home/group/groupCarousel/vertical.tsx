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
  Carousel,
  List
} from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import React from "react";
import { LuMoveRight } from "react-icons/lu";

export default function MiniCarousel({ featured, index }) {
  if (!featured?.gallerySlider?.length) return null;

  const { gallerySlider, slidesPerView } = featured;

  const isSingle = gallerySlider.length === 1;
  const singleItem = gallerySlider[0];

  const hasImage = Boolean(singleItem?.fileName);
  const showGrid = !isSingle && slidesPerView === gallerySlider.length;

  /* -------------------------------------------------------------------------- */
  /*                         SINGLE ITEM — NO IMAGE                              */
  /* -------------------------------------------------------------------------- */
  if (isSingle && !hasImage) {
    return (
      <Box {...(index % 2 === 1 && { bg: "gray.100" })}>
        <Container py={10}>
          <SimpleGrid columns={{ base: 1, md: 5 }} gap={4}>
            <GridItem colSpan={4}>
              <chakra.h2
                fontSize={{ base: "3xl", sm: "4xl" }}
                fontWeight="bold"
                letterSpacing="tight"
                color="gray.900"
                mb={6}
              >
                {singleItem.title}
              </chakra.h2>

              <chakra.div maxW="6xl" fontSize="lg" color="gray.500">
                <Box
                  dangerouslySetInnerHTML={{
                    __html: singleItem.customDescripition
                  }}
                />
              </chakra.div>
            </GridItem>

            {console.info("#", singleItem.readMoreUIType)}

            {singleItem.readMoreText && (
              <GridItem display="flex" alignItems="center" justifyContent={{ md: "flex-end" }}>
                <LocalLink href={singleItem.moreLinks} prefixGroup>
                  <Button size="lg" colorPalette="blue">
                    {singleItem.readMoreText}
                    {singleItem.readMoreUIType == "button" && <LuMoveRight />}
                  </Button>
                </LocalLink>
              </GridItem>
            )}
          </SimpleGrid>
        </Container>
      </Box>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                         SINGLE ITEM — WITH IMAGE                            */
  /* -------------------------------------------------------------------------- */
  if (isSingle && hasImage) {
    return (
      <Container>
        <SimpleGrid
          alignItems="start"
          placeItems="center"
          columns={{ base: 1, md: 2 }}
          gapY={{ base: 10, md: 32 }}
          gapX={{ base: 10, md: 24 }}
          py={12}
        >
          <AspectRatio ratio={16 / 9} w="100%" maxW="600px" borderRadius="lg" overflow="hidden">
            <Image
              src={getNextResourceThumbnail(
                RESOURCE_CTX.USERGROUPS,
                singleItem.fileName,
                RESOURCE_SIZE.PREVIEW
              )}
              alt={singleItem.title}
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
              {singleItem.title}
            </chakra.h2>

            <chakra.p mb={6} color="gray.500" fontSize="lg">
              {singleItem.customDescripition}
            </chakra.p>

            {singleItem.readMoreText && (
              <LocalLink href={singleItem.moreLinks} prefixGroup>
                <Button size="lg" colorPalette="blue">
                  {singleItem.readMoreText}
                </Button>
              </LocalLink>
            )}
          </Box>
        </SimpleGrid>
      </Container>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                         MULTIPLE ITEMS — GRID                               */
  /* -------------------------------------------------------------------------- */
  if (showGrid) {
    return (
      <Box py={12} {...(index % 2 === 1 && { bg: "gray.100" })}>
        <Container>
          <SimpleGrid columns={{ base: 1, md: 4 }} gap={10}>
            {gallerySlider.map((item, index) => (
              <Box key={index} borderRadius="lg" overflow="hidden" shadow="xl" bg="white">
                <Box position="relative" w="full" h="160px" overflow="hidden">
                  <LocalLink href={item.moreLinks} prefixGroup>
                    <Image
                      src={getNextResourceThumbnail(
                        RESOURCE_CTX.USERGROUPS,
                        item.fileName,
                        RESOURCE_SIZE.PREVIEW
                      )}
                      objectFit="cover"
                      boxSize="full"
                      alt={item.title}
                      loading="lazy"
                    />
                    <Box
                      position="absolute"
                      left={0}
                      right={0}
                      bottom={0}
                      p={4}
                      backgroundImage="linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6))"
                    >
                      <chakra.h3 fontSize="2xl" lineHeight={1.2} color="white" fontWeight="bold">
                        {item.title}
                      </chakra.h3>
                    </Box>
                  </LocalLink>
                </Box>

                <Box p={4} h="154px">
                  {/* <List.Root gap={1} variant="plain">
                    {item.customDescripition?.split("\n").map((line, idx) => {
                      const [label, ...rest] = line.split(":");
                      const value = rest.join(":")?.trim() || "NA";

                      return (
                        <List.Item key={idx} lineHeight={1.2}>
                          <Box as="span" mr={1}>
                            <Box as="span" fontWeight="semibold" mr={1}>
                              {label}:
                            </Box>
                            <span>{value}</span>
                          </Box>
                        </List.Item>
                      );
                    })}
                  </List.Root> */}
                  <chakra.p mb={6} color="gray.500" fontSize="lg">
                    {item.customDescripition}
                  </chakra.p>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                         MULTIPLE ITEMS — CAROUSEL                           */
  /* -------------------------------------------------------------------------- */
  return (
    <Container>
      <Carousel.Root
        slideCount={gallerySlider.length}
        orientation="horizontal"
        slidesPerPage={slidesPerView}
        gap="12"
        py={12}
        autoplay={{ delay: 5000 }}
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
  );
}
