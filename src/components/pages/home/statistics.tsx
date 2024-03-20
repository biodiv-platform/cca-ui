import { Box, Button, chakra, Image, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function Statistics(featured) {
  const { t } = useTranslation();

  const sumOfArea = featured.featured.aggregationData?.numericAggregation.reduce(
    (accumulator, currentValue) => {
      return accumulator + (Object.values(currentValue)[0] as { value?: number }).value || 0;
    },
    0
  );

  return (
    <Box borderRadius="lg" overflow="hidden" shadow="xl" bg="white">
      <Container>
        <SimpleGrid columns={{ base: 1, md: 3 }} py={12} spacing={10}>
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
            color={"gray.500"}
            borderColor={"teal.600"}
          >
            <Image
              src={
                "https://www.iccaregistry.org/assets/icons/data_summary/all_icca_records-c53a2d6d10445d4d08c1809c09c92e1e7a0af98a454986f5a98919d3c7f50dac.svg"
              }
              h="60px"
              loading="lazy"
            />
            <Box p={7} h="154px">
              <chakra.p fontSize="lg">Total number of CCAs documented :</chakra.p>

              <chakra.p fontSize="2xl" color={"black"}>
                {featured.featured.aggregationData.total}
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
            color={"gray.500"}
            borderColor={"teal.600"}
          >
            <Image
              src="https://www.iccaregistry.org/assets/icons/data_summary/total_terrestrial_plus_marine_plus_coastal_km-93a9fc837c4e1b7b8103936edc096c6e893d52d262d349a43a04b8f2f17aad90.svg"
              h="60px"
              loading="lazy"
            />
            <Box p={7} h="154px">
              <chakra.p fontSize="lg">Total area (hectares) covered by documented CCAs: </chakra.p>
              <chakra.p fontSize="2xl" color={"black"}>
                {parseFloat(sumOfArea.toFixed(2))}
              </chakra.p>
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Box textAlign="center">
              <LocalLink href="/chart" prefixGroup={true}>
                <Button size="lg" colorScheme="blue" as="a">
                  {t("Statistics")}
                </Button>
              </LocalLink>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
