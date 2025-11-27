import NextLink from "@/components/@core/next-link";
import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { FORM_TYPE } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";

const NavigationLink = ({ href, children }) => (
  <NextLink href={href}>
    <Link
      fontSize={"sm"}
      rounded={"md"}
      px={3}
      py={2}
      ml={"-12px!important"}
      fontWeight={400}
      color={"gray.700"}
      _hover={{ bg: "gray.100" }}
    >
      {children}
    </Link>
  </NextLink>
);

export default function ToC({ templateFields }) {
  const { t } = useTranslation();
  const headings = useMemo(() => templateFields.filter((tf) => tf.type === FORM_TYPE.HEADING), []);

  return (
    <Box
      position={{ base: "sticky", md: "fixed" }}
      top="var(--content-top)"
      maxWidth="220px"
      maxHeight={{ md: "calc(100vh - var(--content-top) - 20px)" }} // Prevent overflow
    >
      <Stack>
        <Text textTransform={"uppercase"} fontWeight={700} fontSize={"sm"} letterSpacing={1}>
          {t("common:navigation")}
        </Text>
        <Stack gap={1}>
          {headings.map((heading, index) => (
            <NavigationLink key={index} href={`#${heading.fieldId}`}>
              {heading.name}
            </NavigationLink>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
