import { Box, Flex, Image, List } from "@chakra-ui/react";
import Loading from "@components/@core/loading";
import LocalLink from "@components/@core/local-link";
import { renderSimpleValue } from "@utils/field";
import { getResourceThumbnail } from "@utils/media";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import useResponseList from "../use-response-list";

export const Card = ({ response, isTruncated }) => {
  const thumb = getResourceThumbnail(response?.files?.[0]?.path);

  return (
    <LocalLink href={`/data/show/${response.id}`} prefixGroup={true}>
      <Box
        as="a"
        // target="_blank"
        p={4}
        key={response.id}
        borderBottom="1px solid"
        borderColor="gray.300"
        display="block"
        _hover={{ bg: "gray.100" }}
      >
        <Flex>
          <Box flexGrow={1} minWidth={0}>
            <Box fontSize="lg" fontWeight="bold" mb={2}>
              {response.titlesValues.map((field) => field.value).toString()}
            </Box>
            <List.Root gap={1}>
              {response.values.map((field, index) => (
                <List.Item key={index} lineHeight={1.2}>
                  <Box maxLines={isTruncated ? 1 : undefined}>
                    <Box as="span" fontWeight="semibold" mr={1}>
                      {field.name}:
                    </Box>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: renderSimpleValue(field.value, field.type)
                      }}
                    />
                  </Box>
                </List.Item>
              ))}
            </List.Root>
          </Box>
          {thumb && <Image boxSize="64px" src={thumb} borderRadius="md" ml={4} flexShrink={0} />}
        </Flex>
      </Box>
    </LocalLink>
  );
};

export default function Cards() {
  const { responses, nextPage, isLoading } = useResponseList();
  const [h, setH] = useState<any>();

  const ref = useRef<any>(null);

  useEffect(() => {
    setH(ref?.current?.offsetHeight || window.screen.availHeight / 2);
  }, [ref]);

  return (
    <Box h="full" ref={ref}>
      {h && (
        <Box w="full" h={h} overflow="auto" position="relative" id="ccaList">
          <InfiniteScroll
            dataLength={responses.l.length}
            next={nextPage}
            hasMore={responses.hasMore && !isLoading}
            loader={<Loading />}
            scrollableTarget="ccaList"
          >
            {responses?.l.map((response) => (
              <Card key={response.id} response={response} isTruncated={false} />
            ))}
          </InfiniteScroll>
        </Box>
      )}
    </Box>
  );
}
