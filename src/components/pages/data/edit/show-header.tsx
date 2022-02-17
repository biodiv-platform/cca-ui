import { IconButton } from "@chakra-ui/button";
import PageHeading from "@components/@core/page-heading";
import DeleteIcon from "@icons/delete";
import { axDeleteTemplateResponseById } from "@services/cca.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useTemplateResponseEdit from "./use-template-response-edit";

export function ShowHeader() {
  const { t } = useTranslation();
  const { template, response, canEdit } = useTemplateResponseEdit();

  const handleOnDelete = async () => {
    if (confirm(t("common:confirm_delete"))) {
      const { success } = await axDeleteTemplateResponseById(response.id);
      if (success) {
        notification(t("template:response.delete.success"), NotificationType.Success);
      } else {
        notification(t("template:response.delete.error"));
      }
    }
  };

  return (
    <PageHeading title={`${template.name} (${template.shortName})`} icon="📄">
      {canEdit && (
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
    </PageHeading>
  );
}
