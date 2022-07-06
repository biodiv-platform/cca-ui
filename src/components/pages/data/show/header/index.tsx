import { Avatar, Box, Flex, Heading, IconButton, LinkOverlay } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import NextLink from "@components/@core/next-link";
import Tooltip from "@components/@core/tooltip";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import EditIcon from "@icons/edit";
import NotificationsActiveIcon from "@icons/notifications-active";
import NotificationsNoneIcon from "@icons/notifications-none";
import { axToggleDocumentFollow } from "@services/cca.service";
import { findTitleFromHeader, renderSimpleValue } from "@utils/field";
import { getUserImage } from "@utils/image";
import notification, { NotificationType } from "@utils/notification";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import useTemplateResponseShow from "../use-template-response-show";

const UserAvatar = ({ u, ...rest }) => (
  <Tooltip hasArrow={true} title={u.name}>
    <Avatar src={getUserImage(u.profilePic, u.name, 400)} size="sm" name={u.name} {...rest} />
  </Tooltip>
);

export default function ShowHeader() {
  const { header, canEdit, permissions, response } = useTemplateResponseShow();
  const title = findTitleFromHeader(header);
  const { t } = useTranslation();
  const { user, isLoggedIn } = useGlobalState();
  const [isFollowing, setIsFollowing] = useState(response.followers.includes(user?.id?.toString()));

  const toggleFollow = async () => {
    const { success } = await axToggleDocumentFollow(!isFollowing, response.id);

    if (success) {
      notification(
        isFollowing ? t("template:unfollow.success") : t("template:follow.success"),
        NotificationType.Success
      );
      setIsFollowing(!isFollowing);
    } else {
      notification(isFollowing ? t("template:unfollow.error") : t("template:follow.error"));
    }
  };

  return (
    <Box mx="auto" bg="gray.100" py={10}>
      <Container textAlign="center">
        <NextSeo title={title} />
        <Heading mb={4} fontWeight="semibold">
          {title}
          {canEdit && (
            <NextLink href={`/data/edit/${header.id}`}>
              <IconButton
                size="lg"
                className="no-print"
                isRound={true}
                variant="ghost"
                colorScheme="blue"
                aria-label={t("common:edit")}
                as={LinkOverlay}
                icon={<EditIcon />}
                ml={3}
              />
            </NextLink>
          )}
          {isLoggedIn && (
            <IconButton
              className="no-print"
              icon={isFollowing ? <NotificationsActiveIcon /> : <NotificationsNoneIcon />}
              size="lg"
              isRound={true}
              variant="ghost"
              colorScheme="purple"
              aria-label={isFollowing ? t("template:unfollow.title") : t("template:follow.title")}
              onClick={toggleFollow}
            />
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
