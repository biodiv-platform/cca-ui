import { RESOURCE_SIZE } from "@/static/constants";
import { getInjectableHTML } from "@/utils/text";
import { Box, chakra, Heading, Image, Text, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React from "react";

export default function Posts({ props }) {
  return (
    <Box bg="gray.100" py={12}>
      <Container>
        <chakra.h2
          fontSize={{ base: "3xl", sm: "4xl" }}
          fontWeight="bold"
          letterSpacing="tight"
          color="gray.900"
          mb={10}
        >
          {props.title}
        </chakra.h2>
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={10}>
          {props.gallerySlider.map((item, index) => {
            const imageSrc = getNextResourceThumbnail(
              RESOURCE_CTX.USERGROUPS,
              item.fileName,
              RESOURCE_SIZE.PREVIEW
            );
            return (
              <Box borderRadius="lg" overflow="hidden" key={index} shadow="xl" bg="white">
                <Box position="relative" w="full" h="160px" overflow="hidden">
                  <LocalLink href={item.moreLinks} prefixGroup={true}>
                    <Image
                      transform="scale(1.0)"
                      src={imageSrc || "/next-assets/cca-fallback.svg"}
                      objectFit="cover"
                      boxSize="full"
                      alt="/next-assets/cca-fallback.svg"
                      width="100%"
                      height="100%"
                      loading="lazy"
                    />
                    <Box
                      left={0}
                      right={0}
                      bottom={0}
                      position="absolute"
                      p={4}
                      backgroundImage="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))"
                    >
                      <Heading fontSize="2xl" lineHeight={1.2} color="white" fontWeight="bold">
                        {item.title}
                      </Heading>
                    </Box>
                  </LocalLink>
                </Box>
                <Box
                  p={4}
                  dangerouslySetInnerHTML={{
                    __html: getInjectableHTML(item.customDescripition)
                  }}
                />
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
