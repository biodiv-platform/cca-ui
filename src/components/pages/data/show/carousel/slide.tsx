import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { ResourceType } from "@interfaces/custom";
import { getResourceThumbnail, getSupportedTypeByPath } from "@utils/media";
import React from "react";

export const NoSlide = () => (
  <Flex color="gray.500" w="full" justifyContent="center">
    No Image(s)
  </Flex>
);

const getMediaElement = (resource) => {
  const { path, attribution } = resource;
  const mediaType = getSupportedTypeByPath(path);

  switch (mediaType) {
    case ResourceType.Video:
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          bg="gray.200"
          w="100%"
          h="100%"
        >
          <video controls style={{ maxWidth: "100%", maxHeight: "100%" }}>
            <source src={path} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      );

    case ResourceType.Audio:
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          bg="gray.200"
          w="100%"
          h="100%"
        >
          <audio controls style={{ maxWidth: "100%", maxHeight: "100%" }}>
            <source src={path} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      );

    case ResourceType.Image:
      return (
        <Image
          className="carousel--image"
          loading="lazy"
          // ignoreFallback
          src={getResourceThumbnail(path, "?h=416")}
          alt={attribution || path}
        />
      );

    default:
      return (
        <Flex color="gray.500" w="full" justifyContent="center">
          Unsupported Media Type
        </Flex>
      );
  }
};

export const Slide = ({ resource }) => (
  <Link target="_blank" href={resource.path}>
    {getMediaElement(resource)}
  </Link>
);

export default Slide;
