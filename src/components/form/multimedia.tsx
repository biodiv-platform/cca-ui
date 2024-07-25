import { Box, Icon, Image } from "@chakra-ui/react";
import AudioIcon from "@icons/audio";
import CrossIcon from "@icons/cross";
import VideoIcon from "@icons/video";
import React from "react";

export const getMediaElementFromPath = (path) => {
  const ext = path.split(".").pop().toLowerCase();
  const isVideo = ["mp4", "webm", "mov"].includes(ext);
  const isAudio = ["mp3", "wav", "ogg"].includes(ext);
  const isImage = ["jpg", "jpeg", "png"].includes(ext);

  if (isImage) {
    return <Image src={path} alt={path} objectFit="cover" borderRadius="md" />;
  }

  if (isVideo || isAudio) {
    const IconComponent = isVideo ? VideoIcon : AudioIcon;
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        bg="gray.200"
      >
        <Icon as={IconComponent} boxSize={12} />
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" borderRadius="md" bg="gray.200">
      <Icon as={CrossIcon} boxSize={12} />
    </Box>
  );
};
