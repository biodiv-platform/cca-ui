import { Box, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "@components/@core/next-link";
import { FORM_TYPE } from "@static/constants";
import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";

const NavigationLink = ({ href, children, disabled = false }) => (
  <NextLink href={disabled ? "#" : href} passHref>
    <Link
      style={{
        fontSize: "sm",
        borderRadius: "md",
        padding: "8px 12px",
        marginLeft: "-12px",
        fontWeight: 400,
        color: disabled ? "gray" : "gray.700",
        backgroundColor: disabled ? "transparent" : "inherit",
        cursor: disabled ? "not-allowed" : "pointer",
        textDecoration: "none"
      }}
      onClick={(e) => disabled && e.preventDefault()}
    >
      {children}
    </Link>
  </NextLink>
);

export default function ToC({ templateFields, isEdit }) {
  const { t } = useTranslation();

  const headings = useMemo(() => templateFields.filter((tf) => tf.type === FORM_TYPE.HEADING), []);

  return (
    <Box position="sticky" top="var(--content-top)">
      <Stack>
        <Text textTransform={"uppercase"} fontWeight={700} fontSize={"sm"} letterSpacing={1}>
          {t("common:navigation")}
        </Text>
        <Stack gap={1}>
          {headings.map((heading, index) => (
            <NavigationLink
              key={index}
              href={`#${heading.fieldId}`}
              disabled={
                !heading.isRequired &&
                !heading.children.some((child) => child.isRequired) &&
                !isEdit
              }
            >
              {heading.name}
            </NavigationLink>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
