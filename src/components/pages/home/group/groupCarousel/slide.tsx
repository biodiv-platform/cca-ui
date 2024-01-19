import { Box, Image } from "@chakra-ui/react";
import { RESOURCE_SIZE } from "@static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React from "react";

export default function Slide({ resource }) {
  const resourceType = RESOURCE_CTX.USERGROUPS;
  const SlideImage = () => (
    <Image
      src={getNextResourceThumbnail(resourceType, resource?.fileName, RESOURCE_SIZE.PREVIEW)}
      h={{ base: 200, md: 380 }}
      w="full"
      objectFit="cover"
      loading="lazy"
      ignoreFallback={true}
      alt={resource.id}
    />
  );

  return (
    <Box className="keen-slider__slide" style={{ minWidth: "100%" }}>
      <SlideImage />
    </Box>
  );
}
