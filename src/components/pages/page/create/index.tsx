import { Box, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import React from "react";

import PagesSidebar from "../common/sidebar";
import { UsePagesSidebarProvider } from "../common/sidebar/use-pages-sidebar";
import PageCreateForm from "./form";

export default function PageCreatePageComponent() {
  return (
    <Container pt={8}>
      <UsePagesSidebarProvider linkType="show">
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 0, md: 4 }}>
          <PagesSidebar />
          <Box gridColumn={{ md: "2/5" }}>
            <PageCreateForm />
          </Box>
        </SimpleGrid>
      </UsePagesSidebarProvider>
    </Container>
  );
}
