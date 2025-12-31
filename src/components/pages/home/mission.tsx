import { Box, Button, chakra, GridItem, SimpleGrid, Carousel } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import { LuMoveRight } from "react-icons/lu";
import React from "react";
import { stripTags } from "@/utils/text";

export default function Mission({ featured }) {
  if (!featured.gallerySlider?.length) return null;

  return (
    <Box bg={featured.gallerySlider[0]?.bgColor}>
      <Container py={10}>
        <Carousel.Root
          slideCount={featured.gallerySlider.length}
          slidesPerPage={1}
          autoplay={{ delay: 5000 }}
          position="relative"
          orientation={featured.isVertical ? "vertical" : "horizontal"}
          mx="auto"
          height="auto"
        >
          <Carousel.Control width="full">
            <Carousel.ItemGroup>
              {featured.gallerySlider.map((item, index) => (
                <Carousel.Item key={index} index={index}>
                  <SimpleGrid columns={{ base: 1, md: 5 }} gap={4}>
                    <GridItem colSpan={4}>
                      <chakra.h2
                        fontSize={{ base: "3xl", sm: "4xl" }}
                        fontWeight="bold"
                        letterSpacing="tight"
                        color="gray.900"
                        mb={6}
                      >
                        {item.title}
                      </chakra.h2>

                      <chakra.p fontSize="lg" color="gray.500">
                        {stripTags(item.customDescripition)}
                      </chakra.p>
                    </GridItem>

                    {item.readMoreText && (
                      <GridItem
                        display="flex"
                        alignItems="center"
                        justifyContent={{ md: "flex-end" }}
                      >
                        <LocalLink href={item.moreLinks} prefixGroup>
                          <Button size="lg" colorPalette="blue">
                            {item.readMoreText}
                            <LuMoveRight />
                          </Button>
                        </LocalLink>
                      </GridItem>
                    )}
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
