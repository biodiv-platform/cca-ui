import { Box, Heading, Spinner, Table, Text } from "@chakra-ui/react";
import { axGetSpeciesGroupAggregation } from "@services/cca.service";
import React, { useEffect, useState } from "react";

interface SpeciesGroupAggregation {
  speciesGroup: string;
  totalCount: number;
  uniqueSpeciesCount: number;
}

interface SpeciesGroupAggregationProps {
  ccaId: number;
}

export default function SpeciesGroupAggregation({ ccaId }: SpeciesGroupAggregationProps) {
  const [aggregations, setAggregations] = useState<SpeciesGroupAggregation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAggregations = async () => {
      setLoading(true);
      try {
        const { success, data } = await axGetSpeciesGroupAggregation(ccaId);
        if (success && data) {
          setAggregations(data.aggregations || []);
        }
      } catch (error) {
        console.error("Error fetching species group aggregations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAggregations();
  }, [ccaId]);

  // Don't show anything if there are no aggregations and we're done loading
  if (aggregations.length === 0 && !loading) {
    return null;
  }

  return (
    <Box borderRadius="md" boxShadow="md" overflow="hidden">
      {/* Header Panel */}
      <Box bg="teal.500" px={6} py={4}>
        <Heading size="md" color="white">
          Species Groups
        </Heading>
      </Box>

      {/* Content Panel */}
      <Box bg="white" p={6}>
        {loading ? (
          <Box textAlign="center" py={8}>
            <Spinner size="lg" />
            <Text mt={4} color="gray.500">
              Loading species groups...
            </Text>
          </Box>
        ) : (
          <Box overflowX="auto">
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader fontWeight="bold">Species Group</Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold">Total Observations</Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold">Unique Species</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {aggregations.map((agg, index) => (
                  <Table.Row key={`${agg.speciesGroup}-${index}`}>
                    <Table.Cell>{agg.speciesGroup}</Table.Cell>
                    <Table.Cell>{agg.totalCount.toLocaleString()}</Table.Cell>
                    <Table.Cell>{agg.uniqueSpeciesCount.toLocaleString()}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </Box>
    </Box>
  );
}
