import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
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
      <Tabs isLazy={true}>
        <TabList>
          <Tab>👥 {t("common:usergroups")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GroupPost
              groups={permission?.userGroupMember}
              selectedDefault={observationGroups}
              resourceId={resourceId}
              saveUserGroupsFunc={saveUserGroupsFunc}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Groups;
