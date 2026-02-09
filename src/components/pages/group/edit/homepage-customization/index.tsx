import { Box, Button } from "@chakra-ui/react";
import { SwitchField } from "@components/form/switch";
import { yupResolver } from "@hookform/resolvers/yup";
import { axUpdateGroupHomePageDetails } from "@services/usergroup.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import GallerySetup from "./gallery-setup";
import MiniGallery from "@/components/pages/admin/homegallery/mini-gallery";

export default function GroupHomePageCustomization({
  userGroupId,
  homePageDetails,
  currentStep,
  languages
}) {
  const { t } = useTranslation();

  const [galleryList, setGalleryList] = useState(
    homePageDetails?.gallerySlider?.sort((a, b) => a.displayOrder - b.displayOrder) || []
  );

  // ✅ Sorted by id ASC (ONLY CHANGE #1)
  const [miniGalleryList, setMiniGalleryList] = useState(
    homePageDetails?.miniGallery?.slice().sort((a, b) => (a?.id || 0) - (b?.id || 0)) || []
  );

  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    showGallery,
    showStats,
    showDesc,
    showGridMap,
    showPartners,
    gallerySlider,
    description
  } = homePageDetails;

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        showGallery: Yup.boolean(),
        showStats: Yup.boolean(),
        showDesc: Yup.boolean(),
        showGridMap: Yup.boolean(),
        showPartners: Yup.boolean(),
        description: Yup.string()
      })
    ),
    defaultValues: {
      showGallery,
      showStats,
      showGridMap,
      showPartners,
      showDesc,
      gallerySlider,
      description
    }
  });

  const handleFormSubmit = async ({ gallerySlider, ...value }) => {
    const payload = {
      gallerySlider: galleryList.reduce((acc, item, index) => {
        if (!item.id) {
          acc.push({
            ugId: userGroupId,
            displayOrder: index,
            ...item,
            translations: Object.values(item.translations)
          });
        }
        return acc;
      }, []),

      miniGallery: miniGalleryList.map((item) => {
        const updatedGallerySlider = item.gallerySlider.reduce(
          (acc: any[], galleryItem: any, index: number) => {
            if (!galleryItem.id) {
              acc.push({
                ugId: userGroupId,
                displayOrder: index,
                ...galleryItem,
                translations: Object.values(galleryItem.translations)
              });
            }
            return acc;
          },
          []
        );

        return { gallerySlider: updatedGallerySlider };
      }),

      ...value
    };

    const { success, data } = await axUpdateGroupHomePageDetails(userGroupId, payload);

    if (success) {
      setGalleryList(data?.gallerySlider?.sort((a, b) => a.displayOrder - b.displayOrder));

      // ✅ Sorted by id ASC (ONLY CHANGE #2)
      setMiniGalleryList(
        data?.miniGallery?.slice().sort((a, b) => (a?.id || 0) - (b?.id || 0)) || []
      );

      notification(t("group:homepage_customization.success"), NotificationType.Success);
    } else {
      notification(t("group:homepage_customization.failure"), NotificationType.Error);
    }
  };

  return (
    <>
      {currentStep == "group:homepage_customization.title" && (
        <FormProvider {...hForm}>
          <form onSubmit={hForm.handleSubmit(handleFormSubmit)} className="fade">
            <Box width={["100%", 350]} justifyContent="space-between">
              <SwitchField name="showGallery" label={t("group:homepage_customization.gallery")} />
            </Box>
          </form>
        </FormProvider>
      )}

      {currentStep == "group:homepage_customization.gallery_setup.title" && (
        <GallerySetup
          userGroupId={userGroupId}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          setGalleryList={setGalleryList}
          galleryList={galleryList}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          languages={languages}
        />
      )}

      {currentStep == "group:homepage_customization.mini_gallery_setup.title" && (
        <MiniGallery
          miniGallery={miniGalleryList}
          setMiniGallery={setMiniGalleryList}
          languages={languages}
          groupId={userGroupId}
        />
      )}

      {currentStep != "group:homepage_customization.mini_gallery_setup.title" && (
        <Box hidden={isCreate || isEdit} display="flex" m={4} justifyContent="flex-end">
          <Button colorPalette="blue" onClick={hForm.handleSubmit(handleFormSubmit)}>
            {t("group:homepage_customization.save")}
          </Button>
        </Box>
      )}
    </>
  );
}
