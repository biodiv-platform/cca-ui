import { Badge, Flex } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import HomeDescription from "@components/pages/home/description";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import UserAvatarList from "../common/user-image-list";

interface GroupEditPageProps {
  customFieldList;
  allCustomField;
  groupInfo: {
    description;
    name;
    allowUserToJoin;
    speciesGroupIds;
    habitatIds;
    neLongitude;
    neLatitude;
    swLatitude;
    swLongitude;
  };
  founders;
  moderators;
}

export default function AboutGroupComponent({
  groupInfo,
  founders,
  moderators
}: GroupEditPageProps) {
  const { t } = useTranslation();
  const { description, name, allowUserToJoin } = groupInfo;

  return (
    <div className="container mt">
      <Flex alignItems="center" mb={6}>
        <PageHeading mb={0} mr={4}>
          👥 {t("group:about.title")} {name}
        </PageHeading>
        <Badge colorScheme={allowUserToJoin ? "blue" : "yellow"}>
          {t(allowUserToJoin ? "group:about.open_group" : "group:about.closed_group")}
        </Badge>
      </Flex>
      <HomeDescription description={description} mb={6} />
      <UserAvatarList title={t("group:admin.founder")} userList={founders} />
      <UserAvatarList title={t("group:admin.moderator")} userList={moderators} />
    </div>
  );
}
