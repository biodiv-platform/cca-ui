import { Box, Table } from "@chakra-ui/react";
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
      <Table.Root >
        <Table.Body>
          {tableData.map(({ label, value }) => (
            <Table.Row key={label}>
              <Table.Cell>{label}</Table.Cell>
              <Table.Cell dangerouslySetInnerHTML={{ __html: value }}></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
