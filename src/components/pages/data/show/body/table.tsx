import { Box, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { renderSimpleValue } from "@utils/field";
import React, { useMemo } from "react";

import useTemplateResponseShow from "../use-template-response-show";

export default function ShowTable({ data, title }) {
  const { response } = useTemplateResponseShow();

  const tableData = useMemo(
    () =>
      data.map((row) => ({
        label: row.name,
        value: renderSimpleValue(response.ccaFieldValues[row.fieldId]?.value, row.type) || "-"
      })),
    [title]
  );

  if (tableData.length === 0) {
    return null;
  }

  return (
    <Box
      borderRadius="md"
      overflow="hidden"
      shadow="sm"
      border="1px solid"
      borderColor="gray.300"
      bg="white"
      className="avoid-break show-table"
    >
      <Box
        p={3}
        textAlign="center"
        fontSize="lg"
        fontWeight="bold"
        bg="blue.400"
        color="white"
        borderBottom="2px solid"
        borderColor="blue.600"
      >
        {title}
      </Box>
      <Table variant="striped">
        <Tbody>
          {tableData.map(({ label, value }) => (
            <Tr key={label}>
              <Td>{label}</Td>
              <Td dangerouslySetInnerHTML={{ __html: value }}></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
