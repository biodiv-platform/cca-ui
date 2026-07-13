import { Box, Flex } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import React, { useEffect, useState } from "react";

interface QuickNavSection {
  id: string;
  label: string;
}

export default function QuickNav({ sections }: { sections: QuickNavSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const elements = sections.map((s) => document.getElementById(s.id)).filter(Boolean);

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-112px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el as Element));

    return () => observer.disconnect();
  }, [sections]);

  const handleTabClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
    setActiveId(id);
  };

  if (!sections.length) {
    return null;
  }

  return (
    <Box
      className="no-print"
      position="sticky"
      top="4rem"
      zIndex={20}
      bg="whiteAlpha.900"
      backdropFilter="saturate(180%) blur(5px)"
      borderBottom="1px solid"
      borderColor="gray.200"
      shadow="sm"
    >
      <Container px={0}>
        <Flex
          w="full"
          overflowX={{ base: "auto", md: "hidden" }}
          css={{
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" }
          }}
        >
          {sections.map((s) => (
            <Box
              as="button"
              key={s.id}
              onClick={() => handleTabClick(s.id)}
              flex={{ base: "0 0 auto", md: "1" }}
              whiteSpace={{ base: "nowrap", md: "normal" }}
              textAlign="center"
              px={4}
              py={3}
              fontSize="sm"
              fontWeight={activeId === s.id ? 700 : 500}
              color={activeId === s.id ? "blue.600" : "gray.600"}
              borderBottom="2px solid"
              borderColor={activeId === s.id ? "blue.500" : "transparent"}
              _hover={{ color: "blue.600" }}
              cursor="pointer"
            >
              {s.label}
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
