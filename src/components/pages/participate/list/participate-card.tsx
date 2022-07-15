import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Flex } from "@chakra-ui/react";
import NextLink from "@components/@core/next-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

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
        <Badge borderRadius="full" px={2} colorScheme="blue" variant="outline">
          {template.platform.join("/")}
        </Badge>
      </Flex>
      <Box fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
        {template.name}
      </Box>
      <Box mb={4} title={template.description} noOfLines={1}>
        {template.description}
      </Box>
      <NextLink href={`/participate/${template.templateId}`}>
        <Button
          as="a"
          colorScheme="blue"
          boxShadow={"0 5px 20px 0px var(--chakra-colors-blue-100)"}
          size="sm"
          rightIcon={<ArrowForwardIcon />}
        >
          {t("template:participate")}
        </Button>
      </NextLink>
    </Box>
  );
}
