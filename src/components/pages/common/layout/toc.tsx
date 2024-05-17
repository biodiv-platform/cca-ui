import { Box, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "@components/@core/next-link";
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

export default function ToC({ templateFields, isEdit = true }) {
  const { t } = useTranslation();
  const headings = useMemo(
    () =>
      templateFields.filter((tf) =>
        isEdit ? tf.type === FORM_TYPE.HEADING : tf.isRequired === true
      ),
    []
  );

  return (
    <Box position="sticky" top="var(--content-top)">
      <Stack>
        <Text textTransform={"uppercase"} fontWeight={700} fontSize={"sm"} letterSpacing={1}>
          {t("common:navigation")}
        </Text>
        <Stack spacing={1}>
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
