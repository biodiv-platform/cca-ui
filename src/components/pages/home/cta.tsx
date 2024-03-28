import { Box, Button, chakra, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import SITE_CONFIG from "@configs/site-config";
import AddIcon from "@icons/add";
import HeartIcon from "@icons/heart";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const Feature = (props) => (
  <Box>
    <props.icon fontSize="4xl" color="blue.500" aria-hidden="true" mb={4} />
    <chakra.p mb={4} lineHeight="tall" fontSize="lg" color={"gray.500"}>
      {props.children}
    </chakra.p>
    <LocalLink href={props.href} prefixGroup={true}>
      <Button
        w={{ base: "full", sm: "auto" }}
        onClick={props.onClick}
        size="lg"
        colorScheme="blue"
        as="a"
      >
        {props.actionText}
      </Button>
    </LocalLink>
  </Box>
);

export default function CTA() {
  const { t, lang } = useTranslation();

  return (
    <Container py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={20} spacingY={10}>
        <Feature
          href="/participate/list"
          actionText={t("home:cta.participate.action")}
          children={t("home:cta.participate.description")}
          icon={AddIcon}
        />
        <Feature
          href={SITE_CONFIG.PAGES.DONATE[lang]}
          actionText={t("home:cta.donate.action")}
          children={t("home:cta.donate.description")}
          icon={HeartIcon}
        />
      </SimpleGrid>
    </Container>
  );
}
