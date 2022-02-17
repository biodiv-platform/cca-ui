import { AddIcon } from "@chakra-ui/icons";
import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import DeleteActionButton from "@components/@core/action-buttons/delete";
import ShareActionButton from "@components/@core/action-buttons/share";
import SimpleActionButton from "@components/@core/action-buttons/simple";
import useGlobalState from "@hooks/use-global-state";
import EditIcon from "@icons/edit";
import { axDeletePageByID } from "@services/pages.service";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import usePagesSidebar from "../common/sidebar/use-pages-sidebar";

export default function PageHeader({ title, pageId }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { fetchPages } = useGlobalState();
  const { canEdit } = usePagesSidebar();

  const handleOnEdit = () => router.push(`/page/edit/${pageId}`);

  const handleOnCreate = () => router.push(`/page/create`);

  const handleOnDelete = async (id) => {
    await axDeletePageByID(id);
    await fetchPages();
  };

  return (
    <>
      <NextSeo openGraph={{ title }} title={title} />
      <SimpleGrid columns={{ base: 1, md: 4 }} mb={4} className="fadeInUp">
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
    </>
  );
}
