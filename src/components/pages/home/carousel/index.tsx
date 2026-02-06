import type { IconButtonProps } from "@chakra-ui/react";
import { AspectRatio, Carousel, IconButton, Image } from "@chakra-ui/react";
import { forwardRef } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const slides = [
  "/next-assets/carousel/5.webp",
  "/next-assets/carousel/1.webp",
  "/next-assets/carousel/6.webp",
  "/next-assets/carousel/2.webp",
  "/next-assets/carousel/3.webp",
  "/next-assets/carousel/4.webp"
];

const Gallery = () => {
  return (
    <Carousel.Root
      slideCount={slides.length}
      mx="auto"
      gap="4"
      position="relative"
      colorPalette="white"
      autoplay={{ delay: 4000 }}
    >
      <Carousel.Control gap="4" width="full" position="relative">
        <Carousel.PrevTrigger asChild>
          <ActionButton insetStart="4">
            <LuArrowLeft />
          </ActionButton>
        </Carousel.PrevTrigger>

        <Carousel.ItemGroup width="full">
          {slides.map((src, index) => (
            <Carousel.Item key={index} index={index}>
              <AspectRatio ratio={16 / 9} maxH="380px" w="full" overflow="hidden">
                <Image src={src} alt={`Product ${index + 1}`} objectFit="contain" />
              </AspectRatio>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.NextTrigger asChild>
          <ActionButton insetEnd="4">
            <LuArrowRight />
          </ActionButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  );
};

const ActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function ActionButton(props, ref) {
    return (
      <IconButton
        {...props}
        ref={ref}
        size="xs"
        variant="outline"
        rounded="full"
        position="absolute"
        zIndex="1"
        bg="bg"
      />
    );
  }
);

export default Gallery;
