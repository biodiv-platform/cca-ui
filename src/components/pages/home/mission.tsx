import { Box, Button, chakra, SimpleGrid, Carousel } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import { LuMoveRight } from "react-icons/lu";
import React from "react";
import { stripTags } from "@/utils/text";

export default function Mission({ featured }) {
  if (!featured?.gallerySlider?.length) return null;

  const slidesPerPage = featured.slidesPerView ?? 1;
  const isStacked = slidesPerPage >= 2;

  const renderCTA = (item, fullWidth = false) =>
    item.readMoreText && (
      <LocalLink href={item.moreLinks} prefixGroup>
        <Button size="lg" colorPalette="blue" w={fullWidth ? { base: "full", sm: "auto" } : "auto"}>
          {item.readMoreText}
          <LuMoveRight />
        </Button>
      </LocalLink>
    );

  return (
    <Box bg={featured.gallerySlider[0]?.bgColor}>
      <Container py={10}>
        <Carousel.Root
          slideCount={featured.gallerySlider.length}
          slidesPerPage={slidesPerPage}
          autoplay={{ delay: 5000 }}
          orientation={featured.isVertical ? "vertical" : "horizontal"}
        >
          <Carousel.Control width="full">
            <Carousel.ItemGroup>
              {featured.gallerySlider.map((item, index) => (
                <Carousel.Item key={index} index={index}>
                  <SimpleGrid columns={isStacked ? 1 : { base: 1, md: 5 }} gap={isStacked ? 6 : 4}>
                    <Box gridColumn={!isStacked ? { md: "span 4" } : undefined}>
                      <chakra.h2
                        fontSize={{ base: "3xl", sm: "4xl" }}
                        fontWeight="bold"
                        letterSpacing="tight"
                        color="gray.900"
                        mb={4}
                      >
                        {item.title}
                      </chakra.h2>

                      <chakra.p fontSize="lg" color="gray.500" mb={isStacked ? 6 : 0}>
                        {stripTags(item.customDescripition)}
                      </chakra.p>

                      {/* CTA BELOW (stacked mode) */}
                      {isStacked && renderCTA(item, true)}
                    </Box>

                    {/* CTA ON THE RIGHT (wide mode) */}
                    {!isStacked && item.readMoreText && (
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        {renderCTA(item)}
                      </Box>
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
