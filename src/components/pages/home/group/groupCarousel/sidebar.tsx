import { stripTags } from "@/utils/text";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import BlurBox from "@components/@core/blur-box";
import { RESOURCE_SIZE } from "@static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { LuMoveRight } from "react-icons/lu";

const ReadMore = ({ resource, readMoreButtonText, readMoreUIType }) => {
  return (
    <Box>
      {resource.moreLinks && readMoreUIType === "button" ? (
        <Button colorPalette="blue" variant="solid" size="lg" fontSize="xl" asChild>
          <a href={resource.moreLinks}>
            {readMoreButtonText} <LuMoveRight />
          </a>
        </Button>
      ) : (
        <a
          href={resource.moreLinks}
          style={{ display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}
        >
          <Flex alignItems="center" justifyContent="flex-end">
            {readMoreButtonText} <LuMoveRight />
          </Flex>
        </a>
      )}
    </Box>
  );
};

export default function Sidebar({ resource }) {
  const { t } = useTranslation();

  const readMoreButtonText =
    resource?.readMoreText == null ? t("common:read_more") : resource.readMoreText;

  const readMoreUIType = resource.readMoreUIType;

  const bgThumb = useMemo(() => {
    const resourceType = RESOURCE_CTX.USERGROUPS;
    return getNextResourceThumbnail(resourceType, resource?.fileName, RESOURCE_SIZE.THUMBNAIL);
  }, [resource?.fileName]);

  const bg = resource.gallerySidebar === "translucent" ? bgThumb : "";

  return (
    <BlurBox bg={bg} fallbackColor="var(--chakra-colors-gray-800)">
      <Center h="full" p={{ base: 6, lg: 8 }}>
        <div>
          <Heading
            as="h1"
            fontWeight={500}
            mb={2}
            fontSize={{ base: "1.2rem", lg: "2.2rem" }}
            lineHeight="1.3em"
          >
            {resource.title}
          </Heading>
          <Text fontSize={{ md: "sm", lg: "lg" }} mb={4} maxH="14rem" overflow="auto">
            {stripTags(resource.customDescripition)}
          </Text>
          <ReadMore
            resource={resource}
            readMoreButtonText={readMoreButtonText}
            readMoreUIType={readMoreUIType}
          />
        </div>
      </Center>
    </BlurBox>
  );
}
