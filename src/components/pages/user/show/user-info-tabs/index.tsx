import { Box, Tabs } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import UserAbout from "./about/user-about";
import UserLocationMap from "./about/user-location-map";
import UserParticipations from "./participations";

export default function UserInfoTabs({ user }) {
  const { t } = useTranslation();

  return (
    <Box gridColumn={{ md: "2/5" }} mb={8}>
      <Tabs.Root>
        <Tabs.List>
          <Tabs.Trigger value="about">👤 {t("user:about")}</Tabs.Trigger>
          <Tabs.Trigger value="participation">🖊️ {t("user:participations")}</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="about" px={0}>
          <UserLocationMap lng={user.longitude} lat={user.latitude} />
          <UserAbout user={user} />
        </Tabs.Content>
        <Tabs.Content value="participation" pb={0}>
          <UserParticipations user={user} />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
