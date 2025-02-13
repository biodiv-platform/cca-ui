import { Box, Button } from "@chakra-ui/react";
import { CheckboxField } from "@components/form/checkbox";
import { SubmitButton } from "@components/form/submit-button";
import { TextAreaField } from "@components/form/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobalState from "@hooks/use-global-state";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuMoveRight } from "react-icons/lu";

import { galleryFieldValidationSchema } from "./common";
import NewResourceForm from "./new-resource-form";

interface IGallerySetupForm {
  title: string;
  customDescripition: string;
  fileName: string;
  moreLinks: string;
  observationId: number;
  authorId?: string;
  authorName?: string;
  profilePic?: string;
  options?: any[];
  truncated?: boolean;
}

export default function GallerySetupFrom({ setIsCreate, galleryList, setGalleryList }) {
  const { t } = useTranslation();
  const { currentGroup } = useGlobalState();
  const [defaultValues] = useState<IGallerySetupForm | any>(
    currentGroup.id ? undefined : { truncated: true }
  );
  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(galleryFieldValidationSchema),
    defaultValues
  });

  const handleFormSubmit = (value) => {
    const payload = {
      authorId: defaultValues?.authorInfo?.id,
      authorName: defaultValues?.authorInfo?.name,
      authorImage: defaultValues?.authorInfo?.profilePic,
      ...value
    };
    setGalleryList([...galleryList, payload]);
    setIsCreate(false);
  };

  useEffect(() => {
    hForm.reset(defaultValues);
  }, [defaultValues]);

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleFormSubmit)}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button m={3} type="button" onClick={() => setIsCreate(false)}>
            <LuMoveRight />
            {t("group:homepage_customization.back")}
          </Button>
        </Box>
        <NewResourceForm />

        <TextAreaField
          name="customDescripition"
          label={t("group:homepage_customization.table.description")}
        />

        {!currentGroup.id && (
          <CheckboxField name="truncated" label={t("group:homepage_customization.table.enabled")} />
        )}
        <SubmitButton>{t("group:homepage_customization.gallery_setup.create")}</SubmitButton>
      </form>
    </FormProvider>
  );
}
