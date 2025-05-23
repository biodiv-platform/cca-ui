import { Box, chakra, Heading, Image, List, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import SITE_CONFIG from "@configs/site-config";
import { findTitleFromHeader, renderSimpleValue } from "@utils/field";
import { getResourceThumbnail } from "@utils/media";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function Posts({ featured }) {
  const { t } = useTranslation();

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
          {t("home:featured.title")}
        </chakra.h2>
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={10}>
          {featured.map((f) => {
            const imageSrc = getResourceThumbnail(f?.files?.[0]?.path, "?h=164");

            return (
              <Box borderRadius="lg" overflow="hidden" key={f.id} shadow="xl" bg="white">
                <Box position="relative" w="full" h="160px" overflow="hidden">
                  <LocalLink href={`/data/show/${f.id}`} prefixGroup={true}>
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
                        {findTitleFromHeader(f)}
                      </Heading>
                    </Box>
                  </LocalLink>
                </Box>
                <Box p={4} h="154px">
                  <List.Root gap={1} variant={"plain"}>
                    {f.values
                      .filter((f) => !SITE_CONFIG.CCA.TITLE_FIELD_IDS.includes(f.fieldId))
                      .map((field, index) => (
                        <List.Item key={index} lineHeight={1.2}>
                          <Box as="span" mr={1}>
                            <Box as="span" fontWeight="semibold" mr={1}>
                              {field.name}:
                            </Box>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: renderSimpleValue(field.value, field.type) || "NA"
                              }}
                            />
                          </Box>
                        </List.Item>
                      ))}
                  </List.Root>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
