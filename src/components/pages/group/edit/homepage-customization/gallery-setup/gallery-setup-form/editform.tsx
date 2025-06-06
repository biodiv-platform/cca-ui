import { Box, Button } from "@chakra-ui/react";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { TextAreaField } from "@components/form/textarea";
import ImageUploaderField from "@components/pages/group/common/image-uploader-field";
import { yupResolver } from "@hookform/resolvers/yup";
import { axEditGroupHomePageGallery } from "@services/usergroup.service";
import { NotificationType } from "@utils/notification";
import notification from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuMoveLeft } from "react-icons/lu";

import { galleryFieldValidationSchema } from "./common";

export default function GalleryEditForm({ setIsEdit, setGalleryList, editGalleryData }) {
  const { t } = useTranslation();

  const { id, ugId, title, fileName, customDescripition, moreLinks, displayOrder } =
    editGalleryData;

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(galleryFieldValidationSchema),
    defaultValues: {
      id,
      ugId,
      title,
      fileName,
      customDescripition,
      moreLinks,
      displayOrder
    }
  });

  const handleFormSubmit = async (payload) => {
    const { success, data } = await axEditGroupHomePageGallery(ugId, id, payload);

    if (success) {
      notification(t("group:homepage_customization.update.success"), NotificationType.Success);
      setGalleryList(data.gallerySlider);
      setIsEdit(false);
    } else {
      notification(t("group:homepage_customization.update.failure"), NotificationType.Success);
    }
  };

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleFormSubmit)}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button m={3} type="button" onClick={() => setIsEdit(false)} variant={"subtle"}>
            <LuMoveLeft />
            {t("group:homepage_customization.back")}
          </Button>
        </Box>
        <TextBoxField name="title" label={t("group:homepage_customization.resources.title")} />
        <TextBoxField name="moreLinks" label={t("group:homepage_customization.resources.link")} />

        <ImageUploaderField
          label={t("group:homepage_customization.resources.imageurl")}
          name="fileName"
        />

        <TextAreaField
          name="customDescripition"
          label={t("group:homepage_customization.table.description")}
        />

        <SubmitButton>{t("group:homepage_customization.update.title")}</SubmitButton>
      </form>
    </FormProvider>
  );
}
