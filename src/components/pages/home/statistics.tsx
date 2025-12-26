import { Box, Button, chakra, GridItem, Image, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function Statistics({ stats, props }) {
  const { t } = useTranslation();

  const sumOfArea = stats.numericAggregation.reduce((accumulator, currentValue) => {
    return accumulator + (Object.values(currentValue)[0] as { value?: number }).value || 0;
  }, 0);

  return (
    <Box borderRadius="lg" overflow="hidden" bg={props.bgColor}>
      <Container>
        <SimpleGrid columns={{ base: 1, md: 2 }} py={12} gap={10}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            borderWidth="2px"
            borderRadius="lg"
            p={6}
            mb={6}
            textAlign="left"
            colorPalette={"gray.500"}
            borderColor={"teal.600"}
          >
            <Image src="/next-assets/document.svg" h="60px" loading="lazy" />
            <Box p={7} h="154px">
              <chakra.p fontSize="lg">{t("home:statistics.total_documented")}</chakra.p>

              <chakra.p fontSize="2xl" color={"black"}>
                {stats.total}
              </chakra.p>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            borderWidth="2px"
            borderRadius="lg"
            p={6}
            mb={6}
            textAlign="left"
            colorPalette={"gray.500"}
            borderColor={"teal.600"}
          >
            <Image src="/next-assets/people.svg" h="60px" loading="lazy" />
            <Box p={7} h="154px">
              <chakra.p fontSize="lg">{t("home:statistics.total_area")} </chakra.p>
              <chakra.p fontSize="2xl" color={"black"}>
                {parseFloat(sumOfArea.toFixed(2))}
              </chakra.p>
            </Box>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 5 }} gap={3} mb={6}>
          <GridItem colSpan={4}>
            <chakra.p mb={6} textAlign="left" color={"gray.500"} fontSize="lg">
              {props.customDescripition}
            </chakra.p>
          </GridItem>
          <GridItem display="flex" alignItems="center" justifyContent={{ md: "flex-end" }}>
            <LocalLink href="/chart" prefixGroup={true}>
              <Button size="lg" colorPalette="blue">
                {t("home:statistics.title")}
              </Button>
            </LocalLink>
          </GridItem>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
