import { Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot
} from "@/components/ui/accordion";

import HomePageCustomizationForm from "./form";

export default function GroupHomePageCustomization({ userGroupId, homePageDetails }) {
  const { t } = useTranslation();
  return (
    <AccordionRoot>
      <AccordionItem
        mb={8}
        bg="white"
        border="1px solid var(--chakra-colors-gray-300)"
        borderRadius="md"
        value="homepage"
      >
        <AccordionItemTrigger _expanded={{ bg: "gray.100" }}>
          <Box flex={1} textAlign="left" fontSize="lg">
            🧰 {t("group:homepage_customization.title")}
          </Box>
        </AccordionItemTrigger>
        <AccordionItemContent>
          <HomePageCustomizationForm userGroupId={userGroupId} homePageDetails={homePageDetails} />
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
