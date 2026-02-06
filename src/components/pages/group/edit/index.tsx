import { Box, Heading, Spinner } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import HomeIcon from "@icons/home";
import ImageIcon from "@icons/image";
import UserCheckIcon from "@icons/user-check";
import { Role } from "@interfaces/custom";
import { getParsedUser, hasAccess } from "@utils/auth";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

import EditIcon from "@/icons/edit";

import ContactAdmin from "./contact-admin";
import UserGroupEditForm from "./form";
import GroupAdministratorsEditForm from "./group-administrator-edit-form";
import GroupHomePageCustomization from "./homepage-customization";
import Wizard from "../../common/wizard";

interface GroupEditPageProps {
  speciesGroups;
  habitats;
  customFieldList;
  allCustomField;
  groupInfo;
  groupRules;
  founders;
  homePageDetails;
  moderators;
  userGroupId;
  mediaToggle;
  langId;
  traits;
  languagesList;
}

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

export default function EditGroupPageComponent({
  groupInfo,
  founders,
  moderators,
  homePageDetails,
  userGroupId,
  languagesList
}: GroupEditPageProps) {
  const { t } = useTranslation();
  const isAdmin = hasAccess([Role.Admin]);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="container mt">
      <PageHeading>👥 {t("group:edit.title")}</PageHeading>
      <Wizard steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <Box p={6} rounded="lg" border="1px solid" borderColor="gray.200" boxShadow="sm" mb={4}>
        <Heading as="h2" fontSize={22} fontWeight="bold" color="gray.900" mb={2}>
          {t(steps[currentStep].translation)}
        </Heading>
        {groupInfo ? (
          <UserGroupEditForm
            groupInfo={groupInfo}
            userGroupId={userGroupId}
            currentStep={steps[currentStep].translation}
            languages={languagesList}
            isAdmin={isAdmin}
          />
        ) : (
          <Spinner mb={10} />
        )}
        {steps[currentStep].translation == "group:admin.title" && (
          <GroupAdministratorsEditForm
            userGroupId={userGroupId}
            founders={founders}
            moderators={moderators}
            allowUsersToJoin={groupInfo}
          />
        )}
        {(steps[currentStep].translation == "group:homepage_customization.title" ||
          steps[currentStep].translation == "group:homepage_customization.gallery_setup.title" ||
          steps[currentStep].translation ==
            "group:homepage_customization.mini_gallery_setup.title") && (
          <Box mt={4}>
            <GroupHomePageCustomization
              userGroupId={userGroupId}
              homePageDetails={homePageDetails}
              currentStep={steps[currentStep].translation}
              languages={languagesList}
            />
          </Box>
        )}

        {!isAdmin && <ContactAdmin />}
      </Box>
    </div>
  );
}
