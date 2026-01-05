import React, { memo, useMemo } from "react";
import {
  Box,
  Button,
  chakra,
  Image,
  SimpleGrid,
  Carousel,
  Stack,
  Heading,
  GridItem
} from "@chakra-ui/react";

import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";

import { RESOURCE_SIZE } from "@/static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@/utils/media";
import { getInjectableHTML } from "@/utils/text";

import { LuMoveRight } from "react-icons/lu";
import Statistics from "../../statistics";

/* ------------ helper: stable dangerouslySetInnerHTML object ------------ */
function useHtml(html?: string) {
  return useMemo(() => ({ __html: getInjectableHTML(html) }), [html]);
}

/* ---------------- Text Only Card ---------------- */
const TextOnlyCard = memo(function TextOnlyCard({
  item,
  slidesPerView,
  hasButton,
  hasArrowIcon
}: any) {
  const showRightCTA = slidesPerView === 1;
  const desc = useHtml(item.customDescripition);

  return (
    <SimpleGrid
      columns={showRightCTA ? { base: 1, md: 5 } : 1}
      gap={6}
      border={slidesPerView > 1 ? "1px solid" : "none"}
      borderColor={slidesPerView > 1 ? "gray.200" : "transparent"}
      borderRadius={slidesPerView > 1 ? "2xl" : "none"}
      height={"full"}
      p={4}
      bg={item.color}
    >
      <Box gridColumn={showRightCTA ? { md: "span 4" } : undefined}>
        <chakra.h2
          fontSize={
            slidesPerView === 1 ? { base: "3xl", sm: "4xl" } : { base: "xl", sm: "sm", md: "3xl" }
          }
          fontWeight="bold"
          letterSpacing="tight"
          color="gray.900"
          mb={4}
        >
          {item.title}
        </chakra.h2>

        <chakra.div fontSize="lg" color="gray.500" dangerouslySetInnerHTML={desc} />
      </Box>

      {hasButton && (
        <GridItem display="flex" alignItems="center" justifyContent={{ md: "flex-end" }}>
          <LocalLink href="/data/list" prefixGroup>
            <Button w={{ base: "full", sm: "auto" }} size="lg" colorPalette="blue" variant="solid">
              {item.readMoreText}
              {hasArrowIcon && <LuMoveRight />}
            </Button>
          </LocalLink>
        </GridItem>
      )}
    </SimpleGrid>
  );
});

/* ---------------- Single Image Card ---------------- */
const SingleImageCard = memo(function SingleImageCard({
  item,
  imageSrc,
  hasButton,
  hasArrowIcon
}: any) {
  const desc = useHtml(item.customDescripition);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap={{ base: 6, md: 10 }}
      alignItems="flex-start"
      bg={item.color}
    >
      <Image
        src={imageSrc}
        borderRadius="lg"
        shadow="2xl"
        alt={item.title}
        loading="lazy"
        objectFit="cover"
        maxH={{ base: "180px", md: "unset" }}
        w="100%"
      />

      <Stack gap={5}>
        <chakra.h2
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          fontWeight="bold"
          letterSpacing="tight"
          color="gray.900"
        >
          {item.title}
        </chakra.h2>

        <chakra.div fontSize="lg" color="gray.500" dangerouslySetInnerHTML={desc} />

        {hasButton && (
          <GridItem display="flex" alignItems="center" justifyContent={{ md: "flex-end" }}>
            <LocalLink href="/data/list" prefixGroup>
              <Button
                w={{ base: "full", sm: "auto" }}
                size="lg"
                colorPalette="blue"
                variant="solid"
              >
                {item.readMoreText}
                {hasArrowIcon && <LuMoveRight />}
              </Button>
            </LocalLink>
          </GridItem>
        )}
      </Stack>
    </SimpleGrid>
  );
});

/* ---------------- Grid Image Card ---------------- */
const GridImageCard = memo(function GridImageCard({ item, imageSrc }: any) {
  const desc = useHtml(item.customDescripition);

  return (
    <Box
      h="100%"
      display="flex"
      flexDirection="column"
      borderRadius="xl"
      overflow="hidden"
      bg={item.color}
    >
      <Box position="relative" h="180px">
        <LocalLink href={item.moreLinks} prefixGroup>
          <Image src={imageSrc} objectFit="cover" boxSize="full" alt={item.title} loading="lazy" />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, blackAlpha.700, transparent)"
            p={4}
            display="flex"
            alignItems="flex-end"
          >
            <Heading size="2xl" color="white" lineClamp={2}>
              {item.title}
            </Heading>
          </Box>
        </LocalLink>
      </Box>

      <Box p={4} flex="1" color="gray.600" overflow="hidden" dangerouslySetInnerHTML={desc} />
    </Box>
  );
});

/* ---------------- Compact Image Card ---------------- */
const CompactImageCard = memo(function CompactImageCard({ item, imageSrc }: any) {
  const desc = useHtml(item.customDescripition);

  return (
    <Box borderRadius="lg" overflow="hidden" shadow="xl" bg={item.color}>
      <Box position="relative" h="160px">
        <LocalLink href={item.moreLinks} prefixGroup>
          <Image src={imageSrc} objectFit="cover" boxSize="full" alt={item.title} loading="lazy" />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-t, blackAlpha.700, transparent)"
            p={4}
            display="flex"
            alignItems="flex-end"
          >
            <Heading size="2xl" color="white">
              {item.title}
            </Heading>
          </Box>
        </LocalLink>
      </Box>

      <Box p={4} color="gray.600" dangerouslySetInnerHTML={desc} />
    </Box>
  );
});

/* ---------------- Property Card ---------------- */
const PropertyCard = memo(function PropertyCard({
  item,
  slidesPerView,
  showGrid,
  aggregationData
}: any) {
  const hasImage = Boolean(item?.fileName);
  const hasButton = Boolean(item?.readMoreText);
  const hasArrowIcon = item?.readMoreUIType?.toLowerCase() === "button_with_arrow";

  const imageSrc = useMemo(() => {
    if (!hasImage) return undefined;
    return getNextResourceThumbnail(RESOURCE_CTX.USERGROUPS, item.fileName, RESOURCE_SIZE.PREVIEW);
  }, [hasImage, item?.fileName]);

  const isStats = useMemo(() => (item?.title ?? "").toLowerCase() === "stats", [item?.title]);
  if (isStats)
    return <Statistics stats={aggregationData} props={item} hasArrowIcon={hasArrowIcon} />;

  if (!hasImage)
    return (
      <TextOnlyCard
        item={item}
        slidesPerView={slidesPerView}
        hasButton={hasButton}
        hasArrowIcon={hasArrowIcon}
      />
    );

  if (slidesPerView === 1)
    return (
      <SingleImageCard
        item={item}
        imageSrc={imageSrc}
        hasButton={hasButton}
        hasArrowIcon={hasArrowIcon}
      />
    );

  if (showGrid) return <GridImageCard item={item} imageSrc={imageSrc} />;

  return <CompactImageCard item={item} imageSrc={imageSrc} hasArrowIcon={hasArrowIcon} />;
});

/* ---------------- Carousel Shell ---------------- */
const CarouselShell = memo(function CarouselShell({
  gallerySlider,
  slidesPerPage,
  featured,
  aggregationData
}: any) {
  const showGrid = slidesPerPage === gallerySlider.length;

  return (
    <Carousel.Root
      slideCount={gallerySlider.length}
      slidesPerPage={slidesPerPage}
      gap={{ base: 4, md: 10 }}
      autoplay={{ delay: 5000 }}
      orientation={featured.isVertical ? "vertical" : "horizontal"}
      w="full"
      h="auto"
    >
      <Carousel.Control width="full">
        <Carousel.ItemGroup h="auto" w="full">
          {gallerySlider.map((item: any, index: number) => (
            <Carousel.Item
              key={item.id ?? `carousel-item-${index}`}
              index={index}
              w="full"
              h="auto"
            >
              <PropertyCard
                item={item}
                slidesPerView={slidesPerPage}
                showGrid={showGrid}
                aggregationData={aggregationData}
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
      </Carousel.Control>
    </Carousel.Root>
  );
});

/* ---------------- Mini Carousel (SSR-only) ---------------- */
export default function MiniCarousel({ featured, aggregationData }: any) {
  const { gallerySlider, slidesPerView = 1 } = featured || {};
  if (!gallerySlider?.length) return null;

  const bgColor = gallerySlider[0]?.bgColor || "white";

  return (
    <Box bg={bgColor}>
      <Container py={{ base: 6, md: 12 }}>
        {slidesPerView > 1 && (
          <chakra.h2
            fontSize={{ base: "3xl", sm: "4xl" }}
            fontWeight="bold"
            letterSpacing="tight"
            color="gray.900"
            mb={10}
          >
            {featured.title}
          </chakra.h2>
        )}

        {/* Mobile SSR markup: always 1 slide/page */}
        <Box display={{ base: "block", md: "none" }}>
          <CarouselShell
            gallerySlider={gallerySlider}
            slidesPerPage={1}
            featured={featured}
            aggregationData={aggregationData}
          />
        </Box>

        {/* Desktop SSR markup: fixed slidesPerView */}
        <Box display={{ base: "none", md: "block" }}>
          <CarouselShell
            gallerySlider={gallerySlider}
            slidesPerPage={slidesPerView}
            featured={featured}
            aggregationData={aggregationData}
          />
        </Box>
      </Container>
    </Box>
  );
}
