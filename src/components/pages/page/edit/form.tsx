import useGlobalState from "@hooks/use-global-state";
import { axUpdatePage } from "@services/pages.service";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import PageForm from "../common/form";

interface PageEditFormProps {
  page;
}

export default function PageEditForm({ page }: PageEditFormProps): JSX.Element {
  const { t } = useTranslation();
  const { fetchPages } = useGlobalState();
  const router = useRouter();

  const defaultValues = {
    title: page.title,
    content: page.content,
    sticky: page.sticky,
    languageId: page.languageId
  };

  const handleOnPageEdit = async (payload) => {
    const { success } = await axUpdatePage({
      id: page.id,
      pageType: page.pageType,
      url: page.url,
      showInFooter: page.showInFooter,
      ...payload,
      languageId: undefined
    });
    if (success) {
      notification(t("page:update.success"), NotificationType.Success);
      await fetchPages();
      router.push(`/page/show/${page.id}`);
    } else {
      notification(t("page:update.failure"));
    }
  };

  return (
    <PageForm
      defaultValues={defaultValues}
      submitLabel={t("page:update.title")}
      onSubmit={handleOnPageEdit}
      hideParentId={true}
    />
  );
}
