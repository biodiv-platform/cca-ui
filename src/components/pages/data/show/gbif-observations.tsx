import { Badge, Box, Button, Heading, HStack, Link, Spinner, Stack, Table, Text } from "@chakra-ui/react";
import { axGetGBIFObservations } from "@services/cca.service";
import React, { useEffect, useState } from "react";
import { FiLink } from "react-icons/fi";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot
} from "@/components/ui/accordion";

interface SpeciesAggregation {
  scientificName: string;
  count: number;
  iucnRedListCategory: string;
  speciesGroup: string;
  taxonKey: number;
  iucnLink: string;
}

interface GBIFObservationsProps {
  ccaId: number;
  selectedSpeciesGroup?: string | null;
  selectedIucnCategory?: string | null;
}

const IUCN_COLORS = {
  CR: "red", // Critically Endangered
  EN: "orange", // Endangered
  VU: "yellow", // Vulnerable
  NT: "blue", // Near Threatened
  LC: "green", // Least Concern
  DD: "gray", // Data Deficient
  NE: "gray" // Not Evaluated
};

export default function GBIFObservations({ ccaId, selectedSpeciesGroup, selectedIucnCategory }: GBIFObservationsProps) {
  const [aggregations, setAggregations] = useState<SpeciesAggregation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  const fetchObservations = async (currentOffset: number, isInitial = false) => {
    setLoading(true);
    try {
      const { success, data } = await axGetGBIFObservations(ccaId, currentOffset, limit, selectedSpeciesGroup, selectedIucnCategory);

      if (success && data) {
        setTotalCount(data.totalCount);

        if (currentOffset === 0 || isInitial) {
          // Initial load
          setAggregations(data.aggregations || []);
        } else {
          // Load more - append to existing data
          setAggregations((prev) => [...prev, ...(data.aggregations || [])]);
        }

        // Check if there are more records
        const loadedCount = currentOffset + (data.aggregations?.length || 0);
        setHasMore(loadedCount < data.totalCount);
      }
    } catch (error) {
      console.error("Error fetching GBIF observations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOffset(0);
    fetchObservations(0, true);
  }, [ccaId, selectedSpeciesGroup, selectedIucnCategory]);

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchObservations(newOffset);
  };

  const getIUCNColor = (category: string) => {
    return IUCN_COLORS[category] || "gray";
  };

  return (
    <Stack gap={4} minW={0}>
      {/* Information Accordion */}
      <AccordionRoot collapsible defaultValue={[]}>
        <AccordionItem
          bg="white"
          borderRadius="md"
          border="1px solid var(--chakra-colors-gray-300)"
          boxShadow="sm"
          value="info"
        >
          <h3>
            <AccordionItemTrigger
              px={4}
              py={3}
              _hover={{ bg: "gray.100" }}
              _expanded={{ bg: "gray.100" }}
            >
              <Box flex="1" textAlign="left">
                About GBIF Data
              </Box>
            </AccordionItemTrigger>
          </h3>
          <AccordionItemContent bg="white" p={4}>
            <Text>
              Extracted from GBIF Species Occurrences. Downloaded on{" "}
              <Link
                href="https://doi.org/10.15468/dl.ug8est"
                target="_blank"
                rel="noopener noreferrer"
                color="blue.600"
                textDecoration="underline"
              >
                June-09-2026
              </Link>
              .
            </Text>
            <Text mt={3}>
              A bounding box of 11 km is drawn around the CCA point location point and occurrences within the bounding box is fetched from the GBIF Species Occurrence. If the CCA has a polygon, a bounding box is drawn around the polygon and occurrences are fetched.
            </Text>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>

      {/* GBIF Observations Table */}
      <Box borderRadius="md" border="1px solid var(--chakra-colors-gray-300)" boxShadow="sm" overflow="hidden">
        {/* Header Panel */}
        <Box bg="white" px={6} py={4} borderBottom="1px solid var(--chakra-colors-gray-300)">
          <Heading size="md" color="gray.800">
            GBIF Species Observations {totalCount > 0 && `(${totalCount} species)`}
          {selectedSpeciesGroup && (
            <Badge ml={3} colorPalette="yellow">
              Species: {selectedSpeciesGroup}
            </Badge>
          )}
          {selectedIucnCategory && (
            <Badge ml={3} colorPalette="orange">
              IUCN: {selectedIucnCategory}
            </Badge>
          )}
        </Heading>
      </Box>

      {/* Content Panel */}
      <Box bg="white" p={6}>
        {loading && aggregations.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Spinner size="lg" />
            <Text mt={4} color="gray.500">
              Loading species data...
            </Text>
          </Box>
        ) : (
          <>
            <Table.ScrollArea maxH="500px" borderWidth="1px" borderColor="gray.200" borderRadius="md">
              <Table.Root size="sm" minW="640px" stickyHeader>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader fontWeight="bold" whiteSpace="nowrap" data-sticky bg="white">
                      Scientific Name
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="bold" whiteSpace="nowrap">
                      Species Group
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="bold" whiteSpace="nowrap">
                      Observations
                    </Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="bold" whiteSpace="nowrap">
                      IUCN Status
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {aggregations.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={4} textAlign="center" py={8}>
                        <Text color="gray.500">No observations found</Text>
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    aggregations.map((agg, index) => (
                    <Table.Row key={`${agg.scientificName}-${index}`}>
                      <Table.Cell fontStyle="italic" whiteSpace="nowrap" data-sticky bg="white">
                        <Link
                          href={`https://www.gbif.org/species/${agg.taxonKey}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="teal.600"
                          _hover={{ textDecoration: "underline" }}
                        >
                          <HStack gap={1} display="inline-flex" alignItems="center">
                            <Text as="span">{agg.scientificName}</Text>
                            <FiLink size={16} />
                          </HStack>
                        </Link>
                      </Table.Cell>
                      <Table.Cell whiteSpace="nowrap">
                        {agg.speciesGroup ? (
                          <Text>{agg.speciesGroup}</Text>
                        ) : (
                          <Text color="gray.400" fontSize="sm">
                            -
                          </Text>
                        )}
                      </Table.Cell>
                      <Table.Cell whiteSpace="nowrap">{agg.count.toLocaleString()}</Table.Cell>
                      <Table.Cell whiteSpace="nowrap">
                        {agg.iucnRedListCategory ? (
                          agg.iucnLink ? (
                            <Link
                              href={agg.iucnLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <HStack gap={1} display="inline-flex" alignItems="center">
                                <Badge colorPalette={getIUCNColor(agg.iucnRedListCategory)}>
                                  {agg.iucnRedListCategory}
                                </Badge>
                                <FiLink size={16} />
                              </HStack>
                            </Link>
                          ) : (
                            <Badge colorPalette={getIUCNColor(agg.iucnRedListCategory)}>
                              {agg.iucnRedListCategory}
                            </Badge>
                          )
                        ) : (
                          <Text color="gray.400" fontSize="sm">
                            -
                          </Text>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  )))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>

            {loading && aggregations.length > 0 && (
              <Box textAlign="center" py={4}>
                <Spinner size="md" />
              </Box>
            )}

            {hasMore && !loading && (
              <Box textAlign="center" mt={4}>
                <Button onClick={handleLoadMore} colorPalette="blue" variant="outline" size="sm">
                  Load More
                </Button>
              </Box>
            )}

            {!hasMore && aggregations.length > 0 && (
              <Box textAlign="center" mt={4}>
                <Text fontSize="sm" color="gray.500">
                  All species loaded
                </Text>
              </Box>
            )}
          </>
        )}
      </Box>
      </Box>
    </Stack>
  );
}
