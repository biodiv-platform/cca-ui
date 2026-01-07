import {
  Box,
  Button,
  Circle,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import { CheckboxField } from "@components/form/checkbox";
import { RichTextareaField } from "@components/form/rich-textarea";
import { SwitchField } from "@components/form/switch";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobalState from "@hooks/use-global-state";

import { Role } from "@interfaces/custom";
import {
  axCreateMiniGroupGallery,
  axUpdateGroupHomePageDetails,
  axUserGroupCreate
} from "@services/usergroup.service";
import { hasAccess } from "@utils/auth";
import dayjs, { dateToUTC, parseDate } from "@utils/date";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuCheck, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import * as Yup from "yup";

import EditIcon from "@/icons/edit";

import AdminInviteField from "../common/admin-invite-field";
import ImageUploaderField from "../common/image-uploader-field";
import { STATIC_GROUP_PAYLOAD } from "../common/static";
import GallerySetupFrom from "../edit/homepage-customization/gallery-setup/gallery-setup-form";
import GallerySetupTable from "../edit/homepage-customization/gallery-setup/gallery-setup-tabel";
import HomeIcon from "@/icons/home";
import ImageIcon from "@/icons/image";
import UserCheckIcon from "@/icons/user-check";
import { GallerySlider } from "@/interfaces/userGroup";
import AreaDrawField from "../common/area-draw-field";
import MiniGallery from "../../admin/homegallery/mini-gallery";

interface GroupCreatePageComponentProps {
  languages;
}

export const transformMemberPayload = (membersList) => {
  return (membersList || [])?.reduce(
    ({ idsList, emailList }, item: any) => {
      return item["__isNew__"]
        ? { idsList, emailList: [...emailList, item.value] }
        : { emailList, idsList: [...idsList, item.value] };
    },
    { idsList: [], emailList: [] }
  );
};

const steps = [
  { label: "Basic Details", translation: "group:basic_details", icon: EditIcon },
  { label: "User Roles", translation: "group:admin.title", icon: UserCheckIcon },
  {
    label: "Homepage Components",
    translation: "group:homepage_customization.title",
    icon: HomeIcon
  },
  {
    label: "Main Gallery",
    translation: "group:homepage_customization.gallery_setup.title",
    icon: ImageIcon
  },
  {
    label: "Mini Gallery",
    translation: "group:homepage_customization.mini_gallery_setup.title",
    icon: ImageIcon
  }
];

export default function CreateGroupPageComponent({ languages }: GroupCreatePageComponentProps) {
  const { t } = useTranslation();
  const { languageId } = useGlobalState();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCreate, setIsCreate] = useState(false);
  const [, setIsEdit] = useState(false);
  const [galleryList, setGalleryList] = useState<GallerySlider[]>([]);
  const [miniGalleryList, setMiniGalleryList] = useState<any[]>([]);
  const [, setEditGalleryData] = useState([]);

  const hForm = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string()
          .required()
          .matches(/^[^/]*$/, "Name cannot contain '/'"),

        allowUserToJoin: Yup.boolean().required(),
        icon: Yup.string().nullable(),
        founder: Yup.array().nullable(),
        moderator: Yup.array().nullable(),
        showGallery: Yup.boolean(),
        showStats: Yup.boolean(),
        showDesc: Yup.boolean(),
        showGridMap: Yup.boolean()
      })
    ),
    defaultValues: {
      allowUserToJoin: true,
      showGallery: true,
      showStats: true,
      showGridMap: true,
      showPartners: true,
      showDesc: true
    }
  });
  const isAdmin = hasAccess([Role.Admin]);

  const handleFormSubmit = async () => {
    const { founder, moderator, ...otherValues } = hForm.getValues();

    const founderFormat = transformMemberPayload(founder);
    const moderatorFormat = transformMemberPayload(moderator);
    const invitationData = {
      userGroupId: 0,
      founderIds: founderFormat.idsList,
      moderatorsIds: moderatorFormat.idsList,
      founderEmail: founderFormat.emailList,
      moderatorsEmail: moderatorFormat.emailList
    };

    const payload = {
      languageId: languageId,
      ...STATIC_GROUP_PAYLOAD,
      ...otherValues,
      invitationData
    };

    const { success, data } = await axUserGroupCreate(payload);
    if (success) {
      notification(t("group:create.success"), NotificationType.Success);
      const { showDesc, showGallery, showGridMap, showStats, description } = hForm.getValues();
      let miniGallery_overall_success = true;
      const miniGalleryIds: string[] = [];
      for (const miniGallery of miniGalleryList) {
        const { success: miniGallery_success, data: mini } = await axCreateMiniGroupGallery(
          {
            ...miniGallery,
            slidesPerView: Number(miniGallery.slidesPerView),
            isVertical: Boolean(miniGallery.isVertical),
            translations: Object.values(miniGallery.translations)
          },
          data.id
        );
        miniGallery_overall_success = miniGallery_success;
        miniGalleryIds.push(mini.galleryId);

        if (!miniGallery_success) {
          break;
        }
      }
      if (miniGallery_overall_success) {
        notification("Successfully created miniGalleries", NotificationType.Success);
      }
      const gallerypaylpad = {
        gallerySlider: galleryList.reduce<any[]>((acc, item, index) => {
          if (!item.id) {
            acc.push({
              displayOrder: index,
              ...item,
              translations: Object.values(item.translations)
            });
          }
          return acc;
        }, []),
        miniGallery: (miniGalleryList as any[]).map((item, i) => {
          const updatedGallerySlider = item.gallerySlider.reduce(
            (acc: any[], galleryItem: any, index: number) => {
              if (!galleryItem.id) {
                acc.push({
                  displayOrder: index,
                  ...galleryItem,
                  translations: Object.values(galleryItem.translations),
                  galleryId: miniGalleryIds[i]
                });
              }
              return acc;
            },
            []
          );
          return { gallerySlider: updatedGallerySlider };
        }),
        showDesc,
        showGallery,
        showGridMap,
        showStats,
        description
      };
      const { success: group_success } = await axUpdateGroupHomePageDetails(
        data.id,
        gallerypaylpad
      );
      if (group_success) {
        notification(t("group:homepage_customization.success"), NotificationType.Success);
      } else {
        notification("Unable to add gallery slides", NotificationType.Error);
      }
    } else {
      notification(t("group:create.error"));
    }
  };

  const handleNext = async () => {
    let isValid = false;
    if (
      steps[currentStep].translation === "group:homepage_customization.mini_gallery_setup.title"
    ) {
      isValid = true;
    }
    if (steps[currentStep].translation === "group:basic_details") {
      isValid = await hForm.trigger(["name"]);
    } else if (steps[currentStep].translation === "group:admin.title") {
      isValid = await hForm.trigger(["allowUserToJoin", "founder", "moderator"]);
    } else if (steps[currentStep].translation === "group:homepage_customization.title") {
      isValid = true;
    } else if (
      steps[currentStep].translation === "group:homepage_customization.gallery_setup.title"
    ) {
      isValid = galleryList.length > 0;
    }
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="container mt">
      <PageHeading>👥 {t("group:create.title")}</PageHeading>
      <Box mb={8}>
        <Grid
          templateColumns={`repeat(${steps.length * 2 - 1}, 1fr)`} // icon, arrow, icon, arrow...
          gap={0}
          alignItems="center"
          overflow={"auto"}
        >
          {/* === ICONS AND ARROWS === */}
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            const bgColor = isActive ? "blue.600" : isCompleted ? "green" : "white";
            const borderColor = isActive ? "blue.600" : isCompleted ? "green" : "gray.300";
            const iconColor = isActive || isCompleted ? "white" : "gray.400";

            return (
              <>
                {/* Step Icon */}
                <GridItem key={`icon-${index}`} colSpan={1}>
                  <Flex justify="center" align="center" w="100%">
                    <Circle
                      as={Button}
                      size="48px"
                      border="2px solid"
                      borderColor={borderColor}
                      bg={bgColor}
                      color={iconColor}
                      _hover={!isActive && !isCompleted ? { borderColor: "gray.400" } : {}}
                    >
                      {isCompleted ? <LuCheck size={4} /> : <Icon as={StepIcon} boxSize={4} />}
                    </Circle>
                  </Flex>
                </GridItem>

                {/* Arrow (skip for last item) */}
                {index !== steps.length - 1 && (
                  <GridItem key={`arrow-${index}`} colSpan={1} textAlign="center">
                    <Icon boxSize={6}>
                      <LuChevronRight color="gray.400" />
                    </Icon>
                  </GridItem>
                )}
              </>
            );
          })}

          {/* === LABELS === */}
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const textColor = isActive ? "blue.600" : isCompleted ? "green.600" : "gray.600";

            return (
              <>
                <GridItem key={`label-${index}`} colSpan={1} mt={2} textAlign="center">
                  <Text fontSize="sm" fontWeight="medium" color={textColor}>
                    {t(step.translation)}
                  </Text>
                </GridItem>

                {/* Skip empty GridItem after last label */}
                {index !== steps.length - 1 && <GridItem key={`label-gap-${index}`} colSpan={1} />}
              </>
            );
          })}
        </Grid>
      </Box>
      <Box p={6} rounded="lg" border="1px solid" borderColor="gray.200" boxShadow="sm" mb={4}>
        <Heading as="h2" fontSize={22} fontWeight="bold" color="gray.900" mb={2}>
          {t(steps[currentStep].translation)}
        </Heading>
        <FormProvider {...hForm}>
          <form onSubmit={hForm.handleSubmit(handleFormSubmit)}>
            {steps[currentStep].translation == "group:basic_details" && (
              <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ md: 4 }}>
                <Box gridColumn="1/4">
                  <TextBoxField
                    name="name"
                    isRequired={true}
                    label={t("group:name")}
                    hint={t("group:name_hint")}
                  />
                  <RichTextareaField
                    name="description"
                    label={t("form:description.title")}
                    hint={t("form:description.hint")}
                  />
                </Box>
                <ImageUploaderField label="Logo" name="icon" hint={t("group:logo_hint")} />
              </SimpleGrid>
            )}
            {steps[currentStep].translation == "group:group_coverage" && (
              <>
                <AreaDrawField
                  label={t("group:spatial_coverge")}
                  name={"spacialCoverage"}
                  mb={8}
                  isRequired={false}
                />
              </>
            )}

            {steps[currentStep].translation == "group:admin.title" && (
              <>
                <CheckboxField
                  name="allowUserToJoin"
                  label={t("group:join_without_invitation")}
                  hint={t("group:join_without_invitation_hint")}
                />
                <AdminInviteField
                  name="founder"
                  label={t("group:invite_founders")}
                  hint={t("group:invite_founders_hint")}
                />
                <AdminInviteField
                  name="moderator"
                  label={t("group:invite_moderators")}
                  hint={t("group:invite_moderators_hint")}
                />
              </>
            )}

            {steps[currentStep].translation == "group:homepage_customization.title" && (
              <>
                <Box className="fade">
                  <Box color="gray.600">{t("group:homepage_customization.hint")}</Box>
                  <Box width={["100%", 350]} justifyContent="space-between" mt={4}>
                    <SwitchField
                      name="showGallery"
                      label={t("group:homepage_customization.gallery")}
                    />
                    <SwitchField name="showDonors" label={t("group:homepage_customization.cta")} />
                  </Box>
                </Box>
              </>
            )}
          </form>
        </FormProvider>
        {steps[currentStep].translation == "group:homepage_customization.gallery_setup.title" && (
          <>
            <Box color="gray.600">{t("group:homepage_customization.gallery_hint")}</Box>
            {isCreate ? (
              <GallerySetupFrom
                setIsCreate={setIsCreate}
                galleryList={galleryList}
                setGalleryList={setGalleryList}
                languages={languages}
              />
            ) : (
              <GallerySetupTable
                userGroupId={null}
                setIsCreate={setIsCreate}
                setGalleryList={setGalleryList}
                galleryList={galleryList}
                setIsEdit={setIsEdit}
                setEditGalleryData={setEditGalleryData}
              />
            )}
          </>
        )}
        {steps[currentStep].translation ==
          "group:homepage_customization.mini_gallery_setup.title" && (
          <MiniGallery
            miniGallery={miniGalleryList}
            setMiniGallery={setMiniGalleryList}
            languages={languages}
            mode={"create"}
          />
        )}
      </Box>
      {!isCreate && (
        <Flex justify="space-between" align="center" mb={4}>
          <Button
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={currentStep === 0}
            px={6}
            py={3}
            borderRadius="lg"
            transition="all 0.2s"
            bg={currentStep === 0 ? "gray.100" : "blue.600"}
            color={currentStep === 0 ? "gray.400" : "white"}
            _hover={currentStep === 0 ? {} : { bg: "gray.200" }}
            cursor={currentStep === 0 ? "not-allowed" : "pointer"}
          >
            <Icon as={LuChevronLeft} boxSize={5} />
            {t("group:create.previous")}
          </Button>

          <Text fontSize="sm" color="gray.500">
            {t("group:create.step")} {currentStep + 1} of {steps.length}
          </Text>

          <Button
            onClick={currentStep === steps.length - 1 ? handleFormSubmit : handleNext}
            px={6}
            py={3}
            borderRadius="lg"
            transition="all 0.2s"
            bg={currentStep === steps.length - 1 ? "green.600" : "blue.600"}
            color="white"
            _hover={{
              bg: currentStep === steps.length - 1 ? "green.700" : "blue.700"
            }}
          >
            {currentStep === steps.length - 1 ? t("group:create.title") : t("group:create.next")}
            <LuChevronRight />
          </Button>
        </Flex>
      )}
    </div>
  );
}
