import { Box, Flex, Heading } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import { Container } from "@components/@core/container";
import NextLink from "@components/@core/next-link";
import SITE_CONFIG from "@configs/site-config";
import EditIcon from "@icons/edit";
import { findTitleFromHeader, renderSimpleValue } from "@utils/field";
import { NextSeo } from "next-seo";
import React from "react";

import useTemplateResponseShow from "../use-template-response-show";

export default function ShowHeader() {
  const { header, canEdit } = useTemplateResponseShow();
  const title = findTitleFromHeader(header);

  return (
    <Box mx="auto" bg="gray.100" py={10}>
      <Container textAlign="center">
        <NextSeo title={title} />
        <Heading mb={4} fontWeight="semibold">
          {title}
          {canEdit && (
            <NextLink href={`/data/edit/${header.id}`}>
              <BlueLink ml={3} className="no-print">
                <EditIcon />
              </BlueLink>
            </NextLink>
          )}
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          fontSize="xl"
          alignItems="center"
          justifyContent="center"
          css={{ gap: "1.6rem" }}
        >
          {header.values
            .filter(
              (i) =>
                (Array.isArray(i.value) ? i.value?.length : i.value) &&
                !SITE_CONFIG.CCA.TITLE_FIELD_IDS.includes(i.fieldId)
            )
            .map((i) => (
              <Box
                key={i.fieldId}
                title={i.name}
                dangerouslySetInnerHTML={{ __html: renderSimpleValue(i.value, i.type, true) }}
              />
            ))}
        </Flex>
      </Container>
    </Box>
  );
}
