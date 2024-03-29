import { useLocalRouter } from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import { axCreatePage } from "@services/pages.service";
import { dateToUTC } from "@utils/date";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import { PAGE_TYPES, transformPagePayload } from "../common/data";
import PageForm from "../common/form";

export default function PageCreateForm(): JSX.Element {
  const { t } = useTranslation();
  const { user, currentGroup, languageId } = useGlobalState();
  const router = useLocalRouter();

  const defaultValues = {
    content: "",
    parentId: 0,
    sticky: true,
    languageId,
    pageType: PAGE_TYPES.CONTENT,
    allowComments: false,
    showInFooter: false,
    showInMenu: false
  };

  const handleOnPageEdit = async (values) => {
    const payload = transformPagePayload(values, {
      date: dateToUTC().format(),
      pageIndex: 0,
      userGroupId: currentGroup.id,
      languageId,
      autherId: user?.id,
      autherName: user?.name
    });
    const { success, data } = await axCreatePage(payload);
    if (success) {
      notification(t("page:create.success"), NotificationType.Success);
      router.push(`/page/show/${data?.id}`, true);
    } else {
      notification(t("page:create.failure"));
    }
  };

  return (
    <PageForm
      defaultValues={defaultValues}
      submitLabel={t("page:create.title")}
      onSubmit={handleOnPageEdit}
      hideParentId={false}
    />
  );
}
