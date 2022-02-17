import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import UserAbout from "./about/user-about";
import UserLocationMap from "./about/user-location-map";
import UserParticipations from "./participations";

export default function UserInfoTabs({ user }) {
  const { t } = useTranslation();

  return (
    <Box gridColumn={{ md: "2/5" }} mb={8}>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>👤 {t("user:about")}</Tab>
          <Tab>🖊️ {t("user:participations")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <UserLocationMap lng={user.longitude} lat={user.latitude} />
            <UserAbout user={user} />
          </TabPanel>
          <TabPanel pb={0}>
            <UserParticipations />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
