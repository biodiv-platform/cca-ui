import { Box, Button, chakra, GridItem, Image, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import SITE_CONFIG from "@configs/site-config";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function WhyThisPortal() {
  const { t, lang } = useTranslation();

  return (
    <Container>
      <SimpleGrid
        alignItems="start"
        placeItems="center"
        columns={{ base: 1, md: 2 }}
        py={12}
        spacingY={{ base: 10, md: 32 }}
        spacingX={{ base: 10, md: 24 }}
      >
        <Image
          src="/next-assets/home-human-chain.webp"
          borderRadius="lg"
          shadow="2xl"
          alt="home-human-chain"
          max-width="100%"
          height="auto"
        />
        <Box>
          <chakra.h2
            mb={6}
            fontSize={{ base: "3xl", sm: "4xl" }}
            lineHeight="8"
            fontWeight="bold"
            letterSpacing="tight"
            color="gray.900"
          >
            {t("home:why_portal.title")}
          </chakra.h2>
          <chakra.p mb={6} textAlign="left" color={"gray.500"} fontSize="lg">
            {t("home:why_portal.description")}
          </chakra.p>
          <GridItem display="flex" alignItems="center" justifyContent={{ md: "flex-end" }}>
            <LocalLink href={SITE_CONFIG.PAGES.ABOUT[lang]} prefixGroup={true}>
              <Button w={{ base: "full", sm: "auto" }} size="lg" colorScheme="blue" as="a">
                {t("common:learn_more")}
              </Button>
            </LocalLink>
          </GridItem>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
