import { Badge, Box, Button, Flex } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { LuMoveRight } from "react-icons/lu";

export default function ParticipateCard({ template }) {
  const { t } = useTranslation();

  return (
    <Box p={4} borderWidth="1px" borderColor="gray.300" rounded="lg" shadow="lg" bg="white">
      <Flex mb={4}>
        <Box
          color="gray.600"
          fontWeight="bold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          mr={2}
        >
          {template.shortName}
        </Box>
        <Badge borderRadius="full" px={2} colorPalette="blue" variant="outline">
          {template.platform.join("/")}
        </Badge>
      </Flex>
      <Box fontWeight="bold" as="h4" lineHeight="tight" lineClamp={1}>
        {template.name}
      </Box>
      <Box mb={4} title={template.description} lineClamp={1}>
        {template.description}
      </Box>
      <LocalLink href={`/participate/${template.templateId}`} prefixGroup={true}>
        <Button
          as="a"
          colorPalette="blue"
          boxShadow={"0 5px 20px 0px var(--chakra-colors-blue-100)"}
          size="sm"
        >
          {t("template:participate")}
          <LuMoveRight />
        </Button>
      </LocalLink>
    </Box>
  );
}
