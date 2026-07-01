import { Badge, Box, Heading, Spinner, Table, Text } from "@chakra-ui/react";
import { axGetIUCNAggregation } from "@services/cca.service";
import React, { useEffect, useState } from "react";

interface IUCNAggregation {
  iucnRedListCategory: string;
  totalCount: number;
  uniqueSpeciesCount: number;
}

interface IUCNAggregationProps {
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

export default function IUCNAggregation({ ccaId }: IUCNAggregationProps) {
  const [aggregations, setAggregations] = useState<IUCNAggregation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAggregations = async () => {
      setLoading(true);
      try {
        const { success, data } = await axGetIUCNAggregation(ccaId);
        if (success && data) {
          setAggregations(data.aggregations || []);
        }
      } catch (error) {
        console.error("Error fetching IUCN aggregations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAggregations();
  }, [ccaId]);

  const getIUCNColor = (category: string) => {
    return IUCN_COLORS[category] || "gray";
  };

  // Don't show anything if there are no aggregations and we're done loading
  if (aggregations.length === 0 && !loading) {
    return null;
  }

  return (
    <Box borderRadius="md" boxShadow="md" overflow="hidden">
      {/* Header Panel */}
      <Box bg="teal.500" px={6} py={4}>
        <Heading size="md" color="white">
          IUCN Red List Categories
        </Heading>
      </Box>

      {/* Content Panel */}
      <Box bg="white" p={6}>
        {loading ? (
          <Box textAlign="center" py={8}>
            <Spinner size="lg" />
            <Text mt={4} color="gray.500">
              Loading IUCN categories...
            </Text>
          </Box>
        ) : (
          <Box overflowX="auto">
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader fontWeight="bold">IUCN Status</Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold">Total Observations</Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="bold">Unique Species</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {aggregations.map((agg, index) => (
                  <Table.Row key={`${agg.iucnRedListCategory}-${index}`}>
                    <Table.Cell>
                      <Badge colorPalette={getIUCNColor(agg.iucnRedListCategory)}>
                        {agg.iucnRedListCategory}
                      </Badge>
                    </Table.Cell>
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
