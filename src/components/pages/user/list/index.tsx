import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, HStack, Input, SimpleGrid } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import NextLink from "@components/@core/next-link";
import PageHeading from "@components/@core/page-heading";
import useTranslation from "next-translate/useTranslation";
import React, { useRef } from "react";

import useUserList from "./use-user-list";

export default function UserListPageComponent() {
  const { t } = useTranslation();
  const searchInputRef = useRef<any>();
  const { userList, nextPage, addFilter } = useUserList();

  const handleOnSearch = (e) => addFilter("name", e.target.value);

  return (
    <div>
      <Container>
        <PageHeading title="Users" />

        <HStack mb={10} spacing={4}>
          <Input
            type="search"
            ref={searchInputRef}
            maxW="18.8rem"
            placeholder={t("common:search")}
            onChange={handleOnSearch}
          />
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
          {userList?.l.map((u) => (
            <NextLink href={`/user/show/${u.id}`}>
              <Flex
                alignItems="center"
                key={u.id}
                gap={4}
                as="a"
                bg="white"
                borderRadius="md"
                shadow="md"
                p={4}
              >
                <Avatar src={u.profilePic} name={u.name} />
                <Box>{u.name}</Box>
              </Flex>
            </NextLink>
          ))}
          {userList?.hasMore && (
            <Box
              bg="white"
              minH="80px"
              color="gray.500"
              borderRadius="md"
              as="button"
              shadow="md"
              onClick={nextPage}
            >
              {t("common:load_more")} <ArrowForwardIcon />
            </Box>
          )}
        </SimpleGrid>
      </Container>
    </div>
  );
}
