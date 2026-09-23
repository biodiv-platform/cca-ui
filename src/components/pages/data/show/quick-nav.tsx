import { Box, Flex, Text } from "@chakra-ui/react";
import { Container } from "@components/@core/container";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { LuList } from "react-icons/lu";

interface QuickNavSection {
  id: string;
  label: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function QuickNav({ sections }: { sections: QuickNavSection[] }) {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const tabRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { idToSlug, slugToId } = useMemo(() => {
    const idToSlug: Record<string, string> = {};
    const slugToId: Record<string, string> = {};

    sections.forEach((s) => {
      const slug = slugify(s.label);
      idToSlug[s.id] = slug;
      slugToId[slug] = s.id;
    });

    return { idToSlug, slugToId };
  }, [sections]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const tab = tabRefs.current[activeId];

    if (!container || !tab) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    if (tabRect.left < containerRect.left) {
      container.scrollBy({ left: tabRect.left - containerRect.left, behavior: "smooth" });
    } else if (tabRect.right > containerRect.right) {
      container.scrollBy({ left: tabRect.right - containerRect.right, behavior: "smooth" });
    }
  }, [activeId]);

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
            window.history.replaceState(null, "", `#${idToSlug[entry.target.id] ?? entry.target.id}`);
          }
        });
      },
      { rootMargin: "-112px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el as Element));

    return () => observer.disconnect();
  }, [sections]);

  const hasAppliedInitialHash = useRef(false);

  useEffect(() => {
    if (hasAppliedInitialHash.current) {
      return;
    }

    const hash = window.location.hash.replace("#", "");
    const targetId = slugToId[hash] ?? sections.find((s) => s.id === hash)?.id;

    if (!targetId) {
      return;
    }

    hasAppliedInitialHash.current = true;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    root.style.scrollBehavior = previousScrollBehavior;

    setActiveId(targetId);
  }, [sections, slugToId]);

  const handleTabClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
    setActiveId(id);
    window.history.replaceState(null, "", `#${idToSlug[id] ?? id}`);
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

          <Flex
            ref={scrollContainerRef}
            overflowX="auto"
            gap={1}
            pt={2}
            pb={1.5}
            css={{
              scrollbarWidth: "thin",
              scrollbarColor: "var(--chakra-colors-gray-300) transparent",
              "&::-webkit-scrollbar": { height: "6px" },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                background: "var(--chakra-colors-gray-300)",
                borderRadius: "9999px"
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "var(--chakra-colors-gray-400)"
              }
            }}
          >
            {sections.map((s) => {
              const isActive = activeId === s.id;
              return (
                <Box
                  as="button"
                  key={s.id}
                  ref={(el: HTMLElement | null) => {
                    tabRefs.current[s.id] = el;
                  }}
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
        </Flex>
      </Container>
    </Box>
  );
}
