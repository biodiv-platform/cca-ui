import { Box, Button, chakra, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function Statistics(featured) {
  const { t } = useTranslation();

  return (
    <Box>
      <Container>
        <SimpleGrid
          alignItems="start"
          placeItems="center"
          columns={{ base: 1, md: 2 }}
          py={12}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 24 }}
        >
          <Box>
            <chakra.h2
              mb={6}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="bold"
              letterSpacing="tight"
              color="gray.900"
            >
              {t("Charts")}
            </chakra.h2>
            <chakra.p mb={6} textAlign="left" color={"gray.500"} fontSize="lg">
              Total number of CCAs documented : {featured.featured.totalCount}
            </chakra.p>
            <chakra.p mb={6} textAlign="left" color={"gray.500"} fontSize="lg">
              Total area covered by documented CCAs: xxx hectares
            </chakra.p>
            <chakra.p mb={6} textAlign="left" color={"gray.500"} fontSize="lg">
              The documented CCAs are aggregated and shown in charts.
            </chakra.p>
          </Box>
          <Box>
            <LocalLink href="/chart" prefixGroup={true}>
              <Button w={{ base: "full", sm: "auto" }} size="lg" colorScheme="blue" as="a">
                {t("Show in Charts")}
              </Button>
            </LocalLink>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
