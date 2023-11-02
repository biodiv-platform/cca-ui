import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Flex, Heading, Link, SimpleGrid } from "@chakra-ui/react";
import DeleteActionButton from "@components/@core/action-buttons/delete";
import ShareActionButton from "@components/@core/action-buttons/share";
import SimpleActionButton from "@components/@core/action-buttons/simple";
import { useLocalRouter } from "@components/@core/local-link";
import NextLink from "@components/@core/next-link";
import useGlobalState from "@hooks/use-global-state";
import EditIcon from "@icons/edit";
import { axDeletePageByID } from "@services/pages.service";
import { formatTimeStampFromUTC } from "@utils/date";
import { getUserImage } from "@utils/media";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import usePagesSidebar from "../common/sidebar/use-pages-sidebar";

export default function PageHeader({ title, pageId, user, date }) {
  const { t } = useTranslation();
  const router = useLocalRouter();
  const { fetchPages } = useGlobalState();
  const { canEdit } = usePagesSidebar();

  const handleOnEdit = () => router.push(`/page/edit/${pageId}`, true);

  const handleOnCreate = () => router.push(`/page/create`, true);

  const handleOnDelete = async (id) => {
    await axDeletePageByID(id);
    await fetchPages();
  };

  return (
    <>
      <NextSeo openGraph={{ title }} title={title} />
      <SimpleGrid columns={{ base: 1, md: 4 }} mb={2} className="fadeInUp">
        <Heading as="h1" size="xl" mb={2} gridColumn="1 / 4">
          {title}
        </Heading>
        <Flex alignItems="top" justifyContent={["flex-start", "flex-end"]}>
          <ShareActionButton text={title} title={t("page:share")} />
          {canEdit && (
            <>
              <SimpleActionButton
                icon={<AddIcon />}
                title={t("page:create.title")}
                onClick={handleOnCreate}
                colorScheme="yellow"
              />
              <SimpleActionButton
                icon={<EditIcon />}
                title={t("common:edit")}
                onClick={handleOnEdit}
                colorScheme="teal"
              />
              <DeleteActionButton
                observationId={pageId}
                title={t("page:remove.title")}
                description={t("page:remove.description")}
                deleted={t("page:remove.success")}
                deleteFunc={handleOnDelete}
              />
            </>
          )}
        </Flex>
      </SimpleGrid>
      <Flex mb={2} gap={2} color="gray.600" alignItems="center">
        <NextLink href={`/user/show/${user.id}`}>
          <Link>
            <Avatar
              size="xs"
              name={user.name}
              src={getUserImage(user.profilePic, user.name)}
              mr={2}
            />
            <span>{user.name}</span>
          </Link>
        </NextLink>
        &bull;
        <span>{formatTimeStampFromUTC(date)}</span>
      </Flex>
    </>
  );
}
