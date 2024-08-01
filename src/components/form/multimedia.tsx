import { Box, Icon, Image } from "@chakra-ui/react";
import AudioIcon from "@icons/audio";
import CrossIcon from "@icons/cross";
import VideoIcon from "@icons/video";
import { ResourceType } from "@interfaces/custom";
import { getSupportedTypeByPath } from "@utils/media";
import React from "react";

const commonBoxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "md",
  bg: "gray.200"
};

export const getMediaElementFromPath = (path) => {
  const mediaType = getSupportedTypeByPath(path);

  switch (mediaType) {
    case ResourceType.Image:
      return <Image src={path} alt={path} objectFit="cover" borderRadius="md" />;

    case ResourceType.Video:
      return (
        <Box {...commonBoxProps}>
          <Icon as={VideoIcon} boxSize={12} />
        </Box>
      );

    case ResourceType.Audio:
      return (
        <Box {...commonBoxProps}>
          <Icon as={AudioIcon} boxSize={12} />
        </Box>
      );

    default:
      return (
        <Box {...commonBoxProps}>
          <Icon as={CrossIcon} boxSize={12} />
        </Box>
      );
  }
};
