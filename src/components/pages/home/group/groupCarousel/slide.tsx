import { AspectRatio, Box, Image } from "@chakra-ui/react";
import { RESOURCE_SIZE } from "@static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React from "react";

export default function Slide({ resource }) {
  const resourceType = RESOURCE_CTX.USERGROUPS;

  return (
    <AspectRatio ratio={16 / 9} maxH="380px" w="full" overflow="hidden">
      <Image
        src={getNextResourceThumbnail(resourceType, resource?.fileName, RESOURCE_SIZE.PREVIEW)}
        objectFit="cover"
        loading="lazy"
        alt={resource.id}
      />
    </AspectRatio>
  );
}
