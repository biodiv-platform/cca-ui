import { Flex, Image, Link } from "@chakra-ui/react";
import { getResourceThumbnail } from "@utils/image";
import React from "react";

export const NoSlide = () => (
  <Flex color="gray.500" w="full" justifyContent="center">
    No Image(s)
  </Flex>
);

const Slide = ({ resource }) => {
  return (
    <Link target="_blank" href={resource.path}>
      <Image
        className="carousel--image"
        loading="lazy"
        ignoreFallback={true}
        src={getResourceThumbnail(resource.path, "?h=416")}
        alt={resource.attribution || resource.path}
      />
    </Link>
  );
};

export default Slide;
