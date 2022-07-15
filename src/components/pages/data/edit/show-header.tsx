import { IconButton } from "@chakra-ui/button";
import PageHeading from "@components/@core/page-heading";
import DeleteIcon from "@icons/delete";
import UsersIcon from "@icons/users";
import { axDeleteTemplateResponseById } from "@services/cca.service";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useTemplateResponseEdit from "./use-template-response-edit";

export function ShowHeader() {
  const { t } = useTranslation();
  const { template, response, canEditEditors, setIsEdit } = useTemplateResponseEdit();
  const router = useRouter();

  const handleOnDelete = async () => {
    if (confirm(t("common:confirm_delete"))) {
      const { success } = await axDeleteTemplateResponseById(response.id);
      if (success) {
        notification(t("template:response.delete.success"), NotificationType.Success);
        router.push("/data/list");
      } else {
        notification(t("template:response.delete.error"));
      }
    }
  };

  return (
    <PageHeading title={`${template.name} (${template.shortName})`} icon="📄">
      {canEditEditors && (
        <IconButton
          isRound={true}
          variant="ghost"
          colorScheme="red"
          icon={<DeleteIcon />}
          aria-label={t("common:delete")}
          title={t("common:delete")}
          onClick={handleOnDelete}
        />
      )}
      {canEditEditors && (
        <IconButton
          isRound={true}
          variant="ghost"
          colorScheme="blue"
          icon={<UsersIcon />}
          aria-label={t("user:permissions")}
          title={t("user:permissions")}
          onClick={() => setIsEdit(true)}
        />
      )}
    </PageHeading>
  );
}
