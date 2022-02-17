import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface PageHeadingProps {
  title?;
  icon?: string;
  children?;
  mb?;
  id?;
  size?;
}

export default function PageHeading({ title, icon, children, mb, id, size }: PageHeadingProps) {
  return (
    <Flex justifyContent="space-between" my={10} mb={mb}>
      <Heading id={id} size={size}>
        {icon} {title}
      </Heading>
      <Box display="flex" alignItems="center">
        {children}
      </Box>
    </Flex>
  );
}
