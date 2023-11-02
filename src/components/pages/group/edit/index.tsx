import { Box, Center, Spinner } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import { Role } from "@interfaces/custom";
import { hasAccess } from "@utils/auth";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import ContactAdmin from "./contact-admin";
import UserGroupEditForm from "./form";
import GroupAdministratorsEditForm from "./group-administrator-edit-form";
import GroupHomePageCustomization from "./homepage-customization";

interface GroupEditPageProps {
  customFieldList;
  allCustomField;
  groupInfo;
  groupRules;
  founders;
  homePageDetails;
  moderators;
  userGroupId;
}

export default function EditGroupPageComponent({
  groupInfo,
  founders,
  moderators,
  homePageDetails,
  userGroupId
}: GroupEditPageProps) {
  const { t } = useTranslation();
  const isAdmin = hasAccess([Role.Admin]);

  return (
    <Center>
      <Box pt={10} className="container" width={"60%"}>
        <div className="container mt">
          <PageHeading>👥 {t("group:edit.title")}</PageHeading>

          {groupInfo ? (
            <UserGroupEditForm groupInfo={groupInfo} userGroupId={userGroupId} />
          ) : (
            <Spinner mb={10} />
          )}
          <GroupAdministratorsEditForm
            userGroupId={userGroupId}
            founders={founders}
            moderators={moderators}
          />
          <GroupHomePageCustomization userGroupId={userGroupId} homePageDetails={homePageDetails} />
          {!isAdmin && <ContactAdmin />}
        </div>
      </Box>
    </Center>
  );
}
