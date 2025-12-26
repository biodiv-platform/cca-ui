import { Box, Button, chakra, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import React from "react";
import { LuMoveRight } from "react-icons/lu";

export default function Mission({ props }) {
  return (
    <Box bg={props.bgColor}>
      <Container py={10}>
        <SimpleGrid columns={{ base: 1, md: 5 }} gap={4}>
          <GridItem colSpan={4}>
            <chakra.h2
              fontSize={{ base: "3xl", sm: "4xl" }}
              fontWeight="bold"
              letterSpacing="tight"
              colorPalette="gray.900"
              mb={6}
            >
              {props.title}
            </chakra.h2>
            <chakra.p maxW="6xl" fontSize="lg" mx={{ lg: "auto" }} color={"gray.500"}>
              {props.customDescripition}
            </chakra.p>
          </GridItem>
          <GridItem display="flex" alignItems="center" justifyContent={{ md: "flex-end" }}>
            <LocalLink href={props.moreLinks} prefixGroup={true}>
              <Button
                w={{ base: "full", sm: "auto" }}
                size="lg"
                colorPalette="blue"
                variant="solid"
              >
                {props.readMoreText}

                {<LuMoveRight />}
              </Button>
            </LocalLink>
          </GridItem>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
