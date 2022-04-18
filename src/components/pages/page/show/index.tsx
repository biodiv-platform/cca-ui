import { Box, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import HTMLContainer from "@components/@core/html-container";
import { preProcessContent } from "@utils/pages.util";
import React from "react";

import PagesSidebar from "../common/sidebar";
import { UsePagesSidebarProvider } from "../common/sidebar/use-pages-sidebar";
import PageHeader from "./header";

interface PageShowPageComponentProps {
  page;
}

export default function PageShowPageComponent({ page }: PageShowPageComponentProps) {
  return (
    <UsePagesSidebarProvider currentPage={page} linkType="show">
      <Container my={8}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 0, md: 10 }}>
          <PagesSidebar />
          <Box gridColumn={{ md: "2/5" }}>
            <PageHeader title={page.title} pageId={page.id} user={page.userIbp} date={page.date} />
            <Box
              as={HTMLContainer}
              className="fadeInUp delay-4"
              mb={8}
              dangerouslySetInnerHTML={{ __html: preProcessContent(page.content) }}
            />
          </Box>
        </SimpleGrid>
      </Container>
    </UsePagesSidebarProvider>
  );
}
