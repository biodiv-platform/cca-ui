import { SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import { User } from "@interfaces/user";
import React from "react";

import SideBar from "./sidebar";
import UserEditTabs from "./tabs";

export interface UserEditPageComponentProps {
  user: User;
  isAdmin?: boolean;
}

export default function UserEditPageComponent({ user, isAdmin }: UserEditPageComponentProps) {
  return (
    <Container mt={16}>
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 0, md: 4 }}>
        <SideBar user={user} />
        <UserEditTabs isAdmin={isAdmin} user={user} />
      </SimpleGrid>
    </Container>
  );
}
