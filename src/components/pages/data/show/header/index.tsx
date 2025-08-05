import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  LinkOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import Tooltip from "@components/@core/tooltip";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import MailIcon from "@icons/mail";
import NotificationsActiveIcon from "@icons/notifications-active";
import NotificationsNoneIcon from "@icons/notifications-none";
import { Role } from "@interfaces/custom";
import { axToggleDocumentFollow, axUpdateLocation, getLoactionInfo } from "@services/cca.service";
import { findTitleFromHeader, renderSimpleValue } from "@utils/field";
import { getUserImage } from "@utils/media";
import notification, { NotificationType } from "@utils/notification";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import { Avatar } from "@/components/ui/avatar";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot
} from "@/components/ui/dialog";

import useTemplateResponseShow from "../use-template-response-show";
import NewRequestForm from "./requestorForm";
import NoSSR from "@/components/@core/no-ssr";
import { LuPencil } from "react-icons/lu";

const UserAvatar = ({ u, ...rest }) => (
  <Tooltip showArrow={true} title={u.name}>
    <Box display="inline-block">
      <Avatar src={getUserImage(u.profilePic, u.name, 400)} size="sm" name={u.name} {...rest} />
    </Box>
  </Tooltip>
);

export default function ShowHeader() {
  const { header, canEdit, permissions, response } = useTemplateResponseShow();
  const title = findTitleFromHeader(header);
  const { t } = useTranslation();
  const { user, isLoggedIn } = useGlobalState();
  const [isFollowing, setIsFollowing] = useState(
    response.followers?.includes(user?.id?.toString())
  );
  const { open, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchAndUpdateLocation = async () => {
      if (
        !response?.location?.district &&
        !response?.location?.state &&
        response?.centroid &&
        canEdit
      ) {
        try {
          const locationResponse = await getLoactionInfo(response.centroid);
          if (locationResponse.success) {
            await axUpdateLocation({
              id: response.id,
              location: locationResponse.data
            });
          }
        } catch (e) {
          console.error("Location info error:", e);
        }
      }
    };

    fetchAndUpdateLocation();
  }, []);

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

  const defaultValues = {
    ccaid: response.id,
    requestorId: user.id,
    role: Role.ExtDataContributor
  };

  const multimediaPath = header?.files[0]?.path;

  const ogImage = multimediaPath ? multimediaPath : "/next-assets/document.svg";

  const summaryData = header.values.filter(
    (i) =>
      (Array.isArray(i.value) ? i.value?.length : i.value) &&
      !SITE_CONFIG.CCA.TITLE_FIELD_IDS.includes(i.fieldId)
  );

  const formatSummary = (summary) => {
    return summary
      .map(({ name, value }) => {
        if (Array.isArray(value)) {
          return `${name}: ${value.map((v) => v.value).join(", ")}`;
        }
        return `${name}: ${value}`;
      })
      .join(", ");
  };

  return (
    <Box mx="auto" bg="gray.100" py={10}>
      <Container textAlign="center">
        <NextSeo
          title={title}
          openGraph={{
            title: title,
            images: [
              {
                url: ogImage,
                alt: title,
                height: 20
              }
            ],
            description: formatSummary(summaryData)
          }}
        />
        <Heading mb={4} fontWeight="semibold" size={"4xl"}>
          {title}
          <NoSSR>
            {canEdit && (
              <LocalLink href={`/data/edit/${header.id}`} prefixGroup={true}>
                <IconButton
                  size="lg"
                  className="no-print"
                  rounded={"full"}
                  variant="ghost"
                  colorPalette="blue"
                  aria-label={t("common:edit")}
                  as={LinkOverlay}
                  ml={3}
                  position="relative"
                >
                  <LuPencil />
                </IconButton>
              </LocalLink>
            )}
          </NoSSR>
          {isLoggedIn && (
            <IconButton
              className="no-print"
              size="lg"
              rounded={"full"}
              variant="ghost"
              colorPalette="purple"
              aria-label={isFollowing ? t("template:unfollow.title") : t("template:follow.title")}
              onClick={toggleFollow}
            >
              {isFollowing ? <NotificationsActiveIcon /> : <NotificationsNoneIcon />}{" "}
            </IconButton>
          )}
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          fontSize="xl"
          alignItems="center"
          justifyContent="center"
          css={{ gap: "1.6rem" }}
        >
          {summaryData.map((i) => (
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
          {isLoggedIn && !canEdit && (
            <>
              <Tooltip showArrow content="Request Permission to Contibute">
                <Button colorPalette="blue" variant="ghost" onClick={onOpen}>
                  <MailIcon boxSize={"7"} />
                </Button>
              </Tooltip>
              <DialogRoot open={open} onOpenChange={onClose}>
                <DialogBackdrop />
                <DialogContent>
                  <DialogHeader>{t("template:request_cca_contibutor.add_request")}</DialogHeader>
                  <DialogCloseTrigger />
                  <DialogBody>
                    <NewRequestForm onClose={onClose} defaultValues={defaultValues} />
                  </DialogBody>
                </DialogContent>
              </DialogRoot>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
