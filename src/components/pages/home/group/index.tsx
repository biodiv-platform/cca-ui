import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, chakra, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import useGlobalState from "@hooks/use-global-state";
import { getInjectableHTML } from "@utils/text";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function GroupHome({ info }) {
  const { currentGroup } = useGlobalState();
  const { t } = useTranslation();

  return (
    <Box bg="gray.100">
      <Container py={10}>
        <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4}>
          <GridItem colSpan={4}>
            <chakra.h2
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="bold"
              letterSpacing="tight"
              color="gray.900"
              mb={6}
            >
              {currentGroup?.name}
            </chakra.h2>
            <chakra.p maxW="6xl" fontSize="lg" mx={{ lg: "auto" }} color={"gray.500"}>
              <Box
                id="description"
                dangerouslySetInnerHTML={{
                  __html: getInjectableHTML(info.description)
                }}
              ></Box>
            </chakra.p>
          </GridItem>
          <GridItem display="flex" alignItems="center" justifyContent={{ md: "flex-end" }}>
            <LocalLink href="/data/list" prefixGroup={true}>
              <Button
                w={{ base: "full", sm: "auto" }}
                size="lg"
                colorScheme="blue"
                as="a"
                rightIcon={<ArrowForwardIcon />}
              >
                {t("header:browse")}
              </Button>
            </LocalLink>
          </GridItem>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
