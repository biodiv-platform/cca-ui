import { Box, Carousel, SimpleGrid } from "@chakra-ui/react";
import React, { useState } from "react";

import Sidebar from "./sidebar";
import Slide from "./slide";
import SlideInfo from "./slide-info";

export default function GroupCarousel({ featured }) {
  const [page, setPage] = useState(0);

  // Check if current page has a title
  const hasTitle = featured[page]?.title;

  return (
    <SimpleGrid
      columns={{ base: 1, md: hasTitle ? 3 : 1 }} // Dynamically adjust columns
      borderRadius="md"
      overflow="hidden"
      bg="gray.300"
      color="white"
    >
      <Box
        gridColumn={{
          base: "1",
          md: hasTitle ? "1/3" : "1/4" // Dynamically adjust grid span
        }}
        position="relative"
      >
        <Carousel.Root
          slideCount={featured.length}
          mx="auto"
          gap="4"
          position="relative"
          colorPalette="white"
          autoplay={{ delay: 5000 }}
          page={page}
          onPageChange={(e) => setPage(e.page)}
        >
          <Carousel.Control gap="4" width="full" position="relative">
            <Carousel.ItemGroup width="full">
              {featured.map((item, index) => (
                <Carousel.Item key={index} index={index}>
                  <Slide resource={item} />
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>

            <SlideInfo size={featured.length} page={page} setPage={setPage} />
          </Carousel.Control>
        </Carousel.Root>
      </Box>

      {hasTitle && <Sidebar resource={featured[page]} />}
    </SimpleGrid>
  );
}
