import { Box, Flex, Text } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useRef, useState } from "react";
import { LuList } from "react-icons/lu";

interface QuickNavSection {
  id: string;
  label: string;
}

export default function QuickNav({ sections }: { sections: QuickNavSection[] }) {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const updateScrollShadows = () => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollShadows();
    window.addEventListener("resize", updateScrollShadows);
    return () => window.removeEventListener("resize", updateScrollShadows);
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
      as="nav"
      aria-label={t("common:navigation")}
      position="sticky"
      top="4rem"
      zIndex={20}
      bg="whiteAlpha.900"
      backdropFilter="saturate(180%) blur(5px)"
      borderBottom="1px solid"
      borderColor="gray.200"
      shadow="sm"
    >
      <Container>
        <Flex align="center" gap={4}>
          <Flex align="center" gap={1.5} flexShrink={0} display={{ base: "none", md: "flex" }}>
            <Box as={LuList} boxSize={4} color="gray.400" />
            <Text
              fontSize="xs"
              fontWeight={700}
              textTransform="uppercase"
              letterSpacing="wide"
              color="gray.500"
              whiteSpace="nowrap"
            >
              {t("common:navigation")}
            </Text>
          </Flex>

          <Box position="relative" flex={1} minW={0}>
            <Flex
              ref={scrollRef}
              onScroll={updateScrollShadows}
              overflowX="auto"
              gap={1}
              py={2}
              css={{
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" }
              }}
            >
              {sections.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <Box
                    as="button"
                    key={s.id}
                    onClick={() => handleTabClick(s.id)}
                    aria-current={isActive ? "true" : undefined}
                    flexShrink={0}
                    whiteSpace="nowrap"
                    px={4}
                    py={1.5}
                    rounded="full"
                    fontSize="sm"
                    fontWeight={isActive ? 600 : 500}
                    color={isActive ? "white" : "gray.600"}
                    bg={isActive ? "blue.500" : "transparent"}
                    transition="background-color 0.2s ease, color 0.2s ease"
                    _hover={{
                      bg: isActive ? "blue.600" : "gray.100",
                      color: isActive ? "white" : "gray.900"
                    }}
                    cursor="pointer"
                  >
                    {s.label}
                  </Box>
                );
              })}
            </Flex>

            {canScrollLeft && (
              <Box
                position="absolute"
                left={0}
                top={0}
                bottom={0}
                w={8}
                pointerEvents="none"
                bgGradient="linear(to-r, white, transparent)"
              />
            )}
            {canScrollRight && (
              <Box
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                w={8}
                pointerEvents="none"
                bgGradient="linear(to-l, white, transparent)"
              />
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
