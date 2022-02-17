import { SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import { UserProfileData } from "@interfaces/integrator";
import { NextSeo } from "next-seo";
import React from "react";

import UserInfoSidebar from "./sidebar";
import UserInfoTabs from "./user-info-tabs";

export interface UserProfileProps {
  user: UserProfileData;
}

export default function UserShowPageComponent({ user }: UserProfileProps) {
  return (
    <Container>
      <NextSeo title={user.name} />
      <SimpleGrid mt={16} columns={{ base: 1, md: 4 }} spacing={{ base: 0, md: 4 }}>
        <UserInfoSidebar user={user} />
        <UserInfoTabs user={user} />
      </SimpleGrid>
    </Container>
  );
}
