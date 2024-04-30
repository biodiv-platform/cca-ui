import { Box, Container, Flex } from "@chakra-ui/react";
import DeleteActionButton from "@components/@core/action-buttons/delete";
import ShareActionButton from "@components/@core/action-buttons/share";
import SimpleActionButton from "@components/@core/action-buttons/simple";
import { useLocalRouter } from "@components/@core/local-link";
import AddIcon from "@icons/add";
import EditIcon from "@icons/edit";
import { axDeletePageByID } from "@services/pages.service";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import usePages from "../../common/sidebar/use-pages-sidebar";
import { TableOfContents } from "./toc";

export function PageOptions({ title, pageId }) {
  const { t } = useTranslation();
  const router = useLocalRouter();
  const { canEdit } = usePages();

  const handleOnEdit = () => router.push(`/page/edit/${pageId}`, true);

  const handleOnCreate = () => router.push(`/page/create`, true);

  return (
    <Box
      bg="whiteAlpha.700"
      py={2}
      position="sticky"
      top={14}
      pt={4}
      pb={4}
      zIndex={1}
      backdropFilter="saturate(180%) blur(20px)"
      shadow="sm"
    >
      <Container
        maxW="1280px"
        width="100%"
        px={{ base: "1.5rem", md: 0 }}
        mt={{ base: "1rem", md: 0 }}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <div>
            <TableOfContents />
          </div>
          <div>
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
                  deleteFunc={axDeletePageByID}
                />
              </>
            )}
          </div>
        </Flex>
      </Container>
    </Box>
  );
}
