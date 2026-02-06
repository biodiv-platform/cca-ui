import { RESOURCE_SIZE } from "@/static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@/utils/media";
import { Box, Button, chakra, GridItem, Image, SimpleGrid, Carousel } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import React from "react";

export default function WhyThisPortal({ items }) {
  if (!items?.length) return null;

  return (
    <Box bg={items[0]?.bgColor}>
      <Container>
        <Carousel.Root
          slideCount={items.length}
          slidesPerPage={1}
          gap="4"
          autoplay={{ delay: 5000 }}
          position="relative"
          py={12}
        >
          <Carousel.Control width="full">
            <Carousel.ItemGroup>
              {items.map((item, index) => (
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
                      h="auto"
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
                            <Button w={{ base: "full", sm: "auto" }} size="lg" colorPalette="blue">
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
