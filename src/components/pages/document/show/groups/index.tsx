import { Box, Tabs } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import { Featured, ObservationUserPermission, UserGroupIbp } from "@interfaces/document";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import GroupPost from "./group-post";

interface IGroupsProps {
  observationGroups: UserGroupIbp[] | undefined;
  permission: ObservationUserPermission | undefined;
  featured: Featured[] | undefined;
  resourceId;
  resourceType;
  saveUserGroupsFunc;
  featureFunc;
  unfeatureFunc;
}

const Groups = ({
  observationGroups,
  permission,
  resourceId,
  saveUserGroupsFunc
}: IGroupsProps) => {
  const { t } = useTranslation();

  return (
    <Box mb={4} className="white-box" data-hidden={!SITE_CONFIG.USERGROUP.ACTIVE}>
      <Tabs.Root lazyMount defaultValue={"userGroups"}>
        <Tabs.List>
          <Tabs.Trigger value="userGroups">👥 {t("common:microsites")}</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="userGroups">
          <GroupPost
            groups={permission?.userGroupMember}
            selectedDefault={observationGroups}
            resourceId={resourceId}
            saveUserGroupsFunc={saveUserGroupsFunc}
          />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default Groups;
