import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import NextLink from "@components/@core/next-link";
import PageHeading from "@components/@core/page-heading";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import SignUpForm from "./form";

function RegisterComponent() {
  const { t } = useTranslation();

  return (
    <Flex className="container fadeInUp" align="center" justify="center" pt={6}>
      <Box maxW="xl" width="full" pb={6}>
        <NextSeo title={t("user:sign_up")} />
        <PageHeading title={t("user:sign_up")} />
        <Text mb={4}>
          {t("user:existing_user")}{" "}
          <NextLink href="/login">
            <BlueLink>
              {t("auth:sign_in")}
              <ChevronRightIcon />
            </BlueLink>
          </NextLink>
        </Text>
        <SignUpForm />
      </Box>
    </Flex>
  );
}

export default RegisterComponent;
