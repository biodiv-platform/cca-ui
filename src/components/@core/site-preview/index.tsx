import { Box, HoverCard, Image, Portal, Spinner, Stack, Text } from "@chakra-ui/react";
import { axGetOpenGraphMeta } from "@services/api.service";
import React, { useState } from "react";

interface SiteMeta {
  title?: string;
  description?: string;
  image?: string;
}

/** Open Graph data per page url, fetched once per page load */
const metaCache: Record<string, Promise<SiteMeta>> = {};

const getSiteMeta = (url: string) => {
  if (!metaCache[url]) {
    metaCache[url] = axGetOpenGraphMeta(url).then(({ success, data }) => (success ? data : {}));
  }
  return metaCache[url];
};

interface SitePreviewProps {
  /** Page whose Open Graph card is shown */
  url: string;
  /** Shown when the page gives no title */
  name: string;
  children: React.ReactNode;
}

/** Shows a page's Open Graph card (image, title, description) when hovering the children */
export default function SitePreview({ url, name, children }: SitePreviewProps) {
  const [meta, setMeta] = useState<SiteMeta>();

  const handleOpenChange = async ({ open }) => {
    if (open && !meta) {
      setMeta(await getSiteMeta(url));
    }
  };

  return (
    <HoverCard.Root
      openDelay={300}
      closeDelay={100}
      lazyMount
      unmountOnExit
      onOpenChange={handleOpenChange}
    >
      <HoverCard.Trigger asChild>
        <Box as="span" display="inline-flex">
          {children}
        </Box>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content
            width="340px"
            p={0}
            overflow="hidden"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.200"
          >
            {!meta ? (
              <Box textAlign="center" py={6}>
                <Spinner size="sm" />
              </Box>
            ) : (
              <>
                {meta.image && (
                  <Image
                    src={meta.image}
                    alt={meta.title || name}
                    w="full"
                    h="200px"
                    objectFit="cover"
                  />
                )}
                <Stack gap={0} px={3} py={2}>
                  <Text fontSize="sm" color="gray.800" lineClamp={1}>
                    {meta.title || name}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {new URL(url).hostname.replace(/^www\./, "")}
                  </Text>
                </Stack>
              </>
            )}
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  );
}
