import { Box, SimpleGrid } from "@chakra-ui/react";
import Activity from "@components/@core/activity";
import { Container } from "@components/@core/container";
import { axAddPageComment } from "@services/pages.service";
import { RESOURCE_TYPE } from "@static/constants";
import React from "react";

import PagesSidebar from "../common/sidebar";
import { UsePagesSidebarProvider } from "../common/sidebar/use-pages-sidebar";
import { Content } from "./content.server";
import { NextPageHeader } from "./header/index";

interface PageShowPageComponentProps {
  page;
}

export default function PageShowPageComponent({ page }: PageShowPageComponentProps) {
  return (
    <UsePagesSidebarProvider currentPage={page} linkType="show">
      <NextPageHeader page={page} />
      <Container my={8}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 0, md: 10 }}>
          <PagesSidebar />
          <Box gridColumn={{ md: "2/5" }}>
            <Content html={page.content} />
            {page.allowComments && (
              <Activity
                resourceId={page?.id}
                resourceType={RESOURCE_TYPE.PAGE}
                commentFunc={axAddPageComment}
              />
            )}
          </Box>
        </SimpleGrid>
      </Container>
    </UsePagesSidebarProvider>
  );
}
