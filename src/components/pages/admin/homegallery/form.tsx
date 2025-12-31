import { Box, Button } from "@chakra-ui/react";
import { SwitchField } from "@components/form/switch";
import { axInsertHomePageGallery } from "@services/utility.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import GallerySetup from "./gallery-setup";
import MiniGallery from "./mini-gallery";

export default function HomePageGalleryCustomizationForm({
  homePageDetails,
  languages,
  currentStep
}) {
  const { t } = useTranslation();
  const [galleryList, setGalleryList] = useState(
    homePageDetails?.gallerySlider?.sort((a, b) => a.displayOrder - b.displayOrder) || []
  );
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [miniGalleryList, setMiniGalleryList] = useState(homePageDetails?.miniGallery);

  const {
    gallerySlider,
    showGallery,
    showStats,
    showRecentObservation,
    showGridMap,
    showPartners,
    showSponsors,
    showDonors,
    showDesc,
    description
  } = homePageDetails;

  const hForm = useForm<any>({
    mode: "onChange",
    defaultValues: {
      gallerySlider,
      showGallery,
      showStats,
      showRecentObservation,
      showGridMap,
      showPartners,
      showSponsors,
      showDonors,
      showDesc,
      description
    }
  });

  const handleFormSubmit = async ({ gallerySlider, ...value }) => {
    const payload = {
      gallerySlider: galleryList.reduce(
        (acc, item, index) =>
          item.id
            ? acc
            : [
                ...acc,
                { ...item, displayOrder: index, translations: Object.values(item.translations) }
              ],
        []
      ),
      miniGallery: (miniGalleryList ?? []).map((item) => {
        const updatedGallerySlider = (item.gallerySlider ?? []).reduce(
          (acc: any[], galleryItem: any, index: number) => {
            if (!galleryItem.id) {
              acc.push({
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
    const { success, data } = await axInsertHomePageGallery(payload);
    if (success) {
      setGalleryList(data.gallerySlider?.sort((a, b) => a.displayOrder - b.displayOrder));
      setMiniGalleryList(data?.miniGallery);
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
              <SwitchField name="showDonors" label={t("group:homepage_customization.cta")} />
            </Box>
          </form>
        </FormProvider>
      )}
      {currentStep == "group:homepage_customization.gallery_setup.title" && (
        <GallerySetup
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
          handleFormSubmit={hForm.handleSubmit(handleFormSubmit)}
        />
      )}
      {currentStep != "group:homepage_customization.mini_gallery_setup.title" && (
        <Box hidden={isCreate || isEdit} display="flex" m={4} justifyContent="flex-end">
          <Button colorPalette="blue" onClick={hForm.handleSubmit(handleFormSubmit)}>
            {t("common:save")}
          </Button>
        </Box>
      )}
    </>
  );
}
