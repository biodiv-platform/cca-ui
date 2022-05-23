import { Box, Button, Flex, Image, List, ListItem } from "@chakra-ui/react";
import Loading from "@components/@core/loading";
import NextLink from "@components/@core/next-link";
import { FORM_TYPE } from "@static/constants";
import { renderSimpleValue } from "@utils/field";
import { getResourceThumbnail } from "@utils/image";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import useResponseList from "../use-response-list";

export const Card = ({ response, onHover, isTruncated }) => {
  const thumb = getResourceThumbnail(response?.files?.[0]?.path);
  const handleOnCardHover = () => onHover(response);

  return (
    <NextLink href={`/data/show/${response.id}`}>
      <Box
        as="a"
        target="_blank"
        p={4}
        key={response.id}
        borderBottom="1px solid"
        borderColor="gray.300"
        display="block"
        onMouseEnter={handleOnCardHover}
        _hover={{ bg: "gray.100" }}
      >
        <Flex>
          <Box flexGrow={1} minWidth={0}>
            <Box fontSize="lg" fontWeight="bold" mb={2}>
              {response.titlesValues.map((field) => field.value).toString()}
            </Box>
            <List spacing={1}>
              {response.values
                .filter((field) => field.type !== FORM_TYPE.FILE)
                .map((field, index) => (
                  <ListItem key={index} lineHeight={1.2}>
                    <Box isTruncated={isTruncated}>
                      <Box as="span" fontWeight="semibold" mr={1}>
                        {field.name}:
                      </Box>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: renderSimpleValue(field.value, field.type)
                        }}
                      />
                    </Box>
                  </ListItem>
                ))}
            </List>
          </Box>
          {thumb && <Image boxSize="64px" src={thumb} borderRadius="md" ml={4} flexShrink={0} />}
        </Flex>
      </Box>
    </NextLink>
  );
};

export default function Cards() {
  const { responses, setCurrentCard, nextPage, isLoading } = useResponseList();
  const { t } = useTranslation();

  return (
    <Box onMouseLeave={() => setCurrentCard(null)} w="full">
      {responses?.l.map((response) => (
        <Card key={response.id} onHover={setCurrentCard} response={response} isTruncated={false} />
      ))}

      {isLoading ? (
        <Loading />
      ) : (
        <Button w="full" onClick={nextPage} borderRadius={0}>
          {t("common:load_more")}
        </Button>
      )}
    </Box>
  );
}
