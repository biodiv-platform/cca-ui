import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { getResourceThumbnail } from "@utils/media";
import React from "react";

export const NoSlide = () => (
  <Flex color="gray.500" w="full" justifyContent="center">
    No Image(s)
  </Flex>
);

const getMediaElement = (resource) => {
  if (
    resource.path.endsWith(".mp4") ||
    resource.path.endsWith(".webm") ||
    resource.path.endsWith(".mov")
  ) {
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
          <source src={resource.path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    );
  } else if (
    resource.path.endsWith(".mp3") ||
    resource.path.endsWith(".wav") ||
    resource.path.endsWith(".ogg")
  ) {
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
          <source src={resource.path} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </Box>
    );
  } else {
    return (
      <Image
        className="carousel--image"
        loading="lazy"
        ignoreFallback={true}
        src={getResourceThumbnail(resource.path, "?h=416")}
        alt={resource.attribution || resource.path}
      />
    );
  }
};

const Slide = ({ resource }) => {
  return (
    <Link target="_blank" href={resource.path}>
      {getMediaElement(resource)}
    </Link>
  );
};

export default Slide;
