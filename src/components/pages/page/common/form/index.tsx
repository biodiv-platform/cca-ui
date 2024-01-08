import { SimpleGrid } from "@chakra-ui/react";
import { SelectInputField } from "@components/form/select";
import { SubmitButton } from "@components/form/submit-button";
import { SwitchField } from "@components/form/switch";
import { TextBoxField } from "@components/form/text";
import SITE_CONFIG from "@configs/site-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { PageShowMinimal } from "@interfaces/pages";
import { axRemovePageGalleryImage, axUploadEditorPageResource } from "@services/pages.service";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import usePagesSidebar from "../sidebar/use-pages-sidebar";
import { PageGalleryField } from "./gallery-field";

const WYSIWYGField = dynamic(() => import("@components/form/wysiwyg"), { ssr: false });

interface PageFormProps {
  defaultValues: Partial<PageShowMinimal>;
  submitLabel: string;
  onSubmit;
  hideParentId: boolean;
}

export default function PageForm({
  defaultValues,
  submitLabel,
  onSubmit,
  hideParentId
}: PageFormProps) {
  const { t } = useTranslation();
  const { pages } = usePagesSidebar();

  const parentOptions = useMemo(
    () => [
      { label: t("page:no_parent"), value: 0 },
      ...pages.map((p) => ({ label: `${p.title}`, value: p.id }))
    ],
    [pages]
  );

  const languageOptions = useMemo(
    () => Object.values(SITE_CONFIG.LANG.LIST).map((o) => ({ label: o.NAME, value: o.ID })),
    []
  );

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        title: Yup.string().required(),
        languageId: hideParentId ? Yup.number().notRequired() : Yup.number().required(),
        description: Yup.string().notRequired(),
        content: Yup.string().required(),
        parentId: hideParentId ? Yup.number().notRequired() : Yup.number().required(),
        sticky: Yup.boolean().required(),
        showInFooter: Yup.boolean(),
        showInPrimaryMenu: Yup.boolean(),
        showInSecondaryMenu: Yup.boolean()
      })
    ),
    defaultValues
  });

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(onSubmit)}>
        <TextBoxField name="title" label={t("page:form.title")} />
        <TextBoxField name="description" label={t("page:form.description")} />
        <WYSIWYGField
          name="content"
          label={t("page:form.content")}
          uploadHandler={axUploadEditorPageResource}
        />
        <PageGalleryField
          name="galleryData"
          label={t("page:form.gallery")}
          onRemoveCallback={axRemovePageGalleryImage}
        />
        {!hideParentId && (
          <SimpleGrid columns={{ md: 2 }} spacing={4}>
            <SelectInputField
              name="languageId"
              label={t("page:form.language")}
              options={languageOptions}
            />
            <SelectInputField
              name="parentId"
              label={t("page:form.parent")}
              options={parentOptions}
            />
          </SimpleGrid>
        )}
        <SwitchField name="sticky" mb={2} label={t("page:form.is_sidebar")} />
        <SwitchField name="showInFooter" mb={2} label={t("Show in Footer")} />
        <SwitchField name="showInPrimaryMenu" mb={2} label={t("Show in Primary Menu")} />
        <SwitchField name="showInSecondaryMenu" mb={2} label={t("Show in Secondary Menu")} />
        <SubmitButton mb={16}>{submitLabel}</SubmitButton>
      </form>
    </FormProvider>
  );
}
