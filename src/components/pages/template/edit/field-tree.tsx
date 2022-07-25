import "react-sortable-tree/style.css";

import { IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";
import DeleteIcon from "@icons/delete";
import EditIcon from "@icons/edit";
import React from "react";
import SortableTree from "react-sortable-tree";

import useTemplate from "./use-template";

export const PageListContainer = styled.div`
  .rst__rowWrapper {
    .rst__moveHandle {
      background-color: var(--chakra-colors-gray-900);
      border: none;
      box-shadow: none;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }
    .rst__rowContents {
      box-shadow: none;
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
    .rst__toolbarButton {
      padding: 0 0.2rem;
      font-size: 1.3em;
      line-height: 1rem;
    }
  }
`;

export default function FieldTree() {
  const { template, setFields, setCurrentField, removeFieldById, areFieldsReadOnly } =
    useTemplate();

  const generateNodeProps = (row) => ({
    title: row.node.name,
    buttons: [
      <IconButton
        minW="auto"
        aria-label="Edit Field"
        variant="link"
        onClick={() => setCurrentField(row.node)}
        icon={<EditIcon />}
      />,
      <IconButton
        colorScheme="red"
        minW="auto"
        aria-label="Delete Field"
        variant="link"
        onClick={() => removeFieldById(row.node.fieldId)}
        icon={<DeleteIcon />}
      />
    ]
  });

  return (
    <PageListContainer>
      <SortableTree
        treeData={template.fields}
        onChange={setFields}
        canDrag={() => !areFieldsReadOnly}
        canDrop={() => !areFieldsReadOnly}
        maxDepth={5}
        isVirtualized={false}
        getNodeKey={({ node }) => node.fieldId}
        generateNodeProps={generateNodeProps}
      />
    </PageListContainer>
  );
}
