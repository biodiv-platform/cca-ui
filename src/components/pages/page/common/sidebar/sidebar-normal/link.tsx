import { Box, chakra, IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import LocalLink from "@components/@core/local-link";
import React from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

function LinkLayout({ isActive, children }) {
  return (
    <Box
      rounded="md"
      bg={isActive ? "blue.50" : "none"}
      color={isActive ? "blue.700" : "gray.700"}
      fontWeight={isActive ? 600 : 400}
      _hover={isActive ? {} : { bg: "gray.100" }}
      display="flex"
      transition="all 0.2s"
      justifyContent="space-between"
      alignItems="center"
    >
      {children}
    </Box>
  );
}

const LinkChildren = ({ page, currentPageId, linkType }) => {
  const isActive = currentPageId === page.id;

  return (
    <LinkLayout isActive={isActive}>
      <LocalLink prefixGroup={true} href={`/page/${linkType}/${page.id}`}>
        <chakra.a
          flexGrow={1}
          px={3}
          py={2}
          aria-current={isActive ? "page" : undefined}
          cursor="pointer"
        >
          <Box as="span" opacity="0.5" mr={2}>
            #
          </Box>
          {page.title}
        </chakra.a>
      </LocalLink>
    </LinkLayout>
  );
};

export const LinkParent = ({ page, currentPageId, linkType }) => {
  const isActive = currentPageId === page.id;
  const { open, onToggle } = useDisclosure({ defaultOpen: true });

  return (
    <Stack gap={2}>
      <LinkLayout isActive={isActive}>
        <LocalLink prefixGroup={true} href={`/page/${linkType}/${page.id}`}>
          <chakra.a
            flexGrow={1}
            px={3}
            py={2}
            aria-current={isActive ? "page" : undefined}
            cursor="pointer"
          >
            {page.title}
          </chakra.a>
        </LocalLink>
        {page.children.length > 0 && (
          <IconButton flexShrink={0} aria-label="Toggle Sub Pages" onClick={onToggle}>
            {open ? <LuChevronUp /> : <LuChevronDown />}
          </IconButton>
        )}
      </LinkLayout>
      {open &&
        page?.children?.map((page) => (
          <LinkChildren
            page={page}
            currentPageId={currentPageId}
            key={page.id}
            linkType={linkType}
          />
        ))}
    </Stack>
  );
};
