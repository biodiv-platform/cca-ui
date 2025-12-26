import { RESOURCE_SIZE } from "@/static/constants";
import { getNextResourceThumbnail, RESOURCE_CTX } from "@/utils/media";
import { Box, Button, chakra, GridItem, Image, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import LocalLink from "@components/@core/local-link";
import React from "react";

export default function WhyThisPortal({ props }) {
  return (
    <Box bg={props.bgColor}>
      <Container>
        <SimpleGrid
          alignItems="start"
          placeItems="center"
          columns={{ base: 1, md: 2 }}
          py={12}
          gapY={{ base: 10, md: 32 }}
          gapX={{ base: 10, md: 24 }}
        >
          <Image
            src={getNextResourceThumbnail(
              RESOURCE_CTX.USERGROUPS,
              props.fileName,
              RESOURCE_SIZE.PREVIEW
            )}
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
              fontWeight="bold"
              letterSpacing="tight"
              color="gray.900"
            >
              {props.title}
            </chakra.h2>
            <chakra.p mb={6} textAlign="left" color={"gray.500"} fontSize="lg">
              {props.customDescripition}
            </chakra.p>
            <GridItem display="flex" alignItems="center" justifyContent={{ md: "flex-end" }}>
              <LocalLink href={props.moreLinks} prefixGroup={true}>
                <Button w={{ base: "full", sm: "auto" }} size="lg" colorPalette="blue">
                  {props.readMoreText}
                </Button>
              </LocalLink>
            </GridItem>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
