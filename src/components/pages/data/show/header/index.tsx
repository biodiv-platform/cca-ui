import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import { Container } from "@components/@core/container";
import NextLink from "@components/@core/next-link";
import Tooltip from "@components/@core/tooltip";
import SITE_CONFIG from "@configs/site-config";
import EditIcon from "@icons/edit";
import { findTitleFromHeader, renderSimpleValue } from "@utils/field";
import { getUserImage } from "@utils/image";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useTemplateResponseShow from "../use-template-response-show";

const UserAvatar = ({ u, ...rest }) => (
  <Tooltip hasArrow={true} title={u.name}>
    <Avatar src={getUserImage(u.profilePic, u.name, 400)} size="sm" name={u.name} {...rest} />
  </Tooltip>
);

export default function ShowHeader() {
  const { header, canEdit, permissions } = useTemplateResponseShow();
  const title = findTitleFromHeader(header);
  const { t } = useTranslation();

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
        <Flex alignItems="center" justifyContent="center" mt={6} gap={2} fontWeight="bold">
          <Box mr={2}>{t("common:contributors")}:</Box> <UserAvatar u={permissions.owner} />
          {permissions.editors.length > 0 && (
            <Flex alignItems="center" gap={2}>
              {permissions.editors.map((u) => (
                <UserAvatar key={u.id} u={u} />
              ))}
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
