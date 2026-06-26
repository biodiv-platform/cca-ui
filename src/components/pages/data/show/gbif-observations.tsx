import { Badge, Box, Button, Heading, Spinner, Table, Text } from "@chakra-ui/react";
import { axGetGBIFObservations } from "@services/cca.service";
import React, { useEffect, useState } from "react";

interface SpeciesAggregation {
  scientificName: string;
  count: number;
  iucnRedListCategory: string;
}

interface GBIFObservationsProps {
  ccaId: number;
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

export default function GBIFObservations({ ccaId }: GBIFObservationsProps) {
  const [aggregations, setAggregations] = useState<SpeciesAggregation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchObservations = async (currentOffset: number, isInitial = false) => {
    setLoading(true);
    try {
      const { success, data } = await axGetGBIFObservations(ccaId, currentOffset, limit);

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
    fetchObservations(0, true);
  }, [ccaId]);

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchObservations(newOffset);
  };

  const getIUCNColor = (category: string) => {
    return IUCN_COLORS[category] || "gray";
  };

  // Don't show anything if there are no observations and we're done loading
  if (totalCount === 0 && !loading) {
    return null;
  }

  return (
    <Box borderRadius="md" boxShadow="md" overflow="hidden">
      {/* Header Panel */}
      <Box bg="teal.500" px={6} py={4}>
        <Heading size="md" color="white">
          GBIF Species Observations {totalCount > 0 && `(${totalCount} species)`}
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
            <Box overflowX="auto">
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader fontWeight="bold">Scientific Name</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="right" fontWeight="bold">Observations</Table.ColumnHeader>
                    <Table.ColumnHeader fontWeight="bold">IUCN Status</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {aggregations.map((agg, index) => (
                    <Table.Row key={`${agg.scientificName}-${index}`}>
                      <Table.Cell fontStyle="italic">{agg.scientificName}</Table.Cell>
                      <Table.Cell textAlign="right">{agg.count.toLocaleString()}</Table.Cell>
                      <Table.Cell>
                        {agg.iucnRedListCategory ? (
                          <Badge colorPalette={getIUCNColor(agg.iucnRedListCategory)}>
                            {agg.iucnRedListCategory}
                          </Badge>
                        ) : (
                          <Text color="gray.400" fontSize="sm">
                            -
                          </Text>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>

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
  );
}
