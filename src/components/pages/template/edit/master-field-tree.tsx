import "react-sortable-tree/style.css";

import { IconButton } from "@chakra-ui/react";
import CopyIcon from "@icons/copy";
import React, { useState } from "react";
import SortableTree, { toggleExpandedForAll } from "react-sortable-tree";

import { PageListContainer } from "./field-tree";
import useTemplate from "./use-template";

export default function MasterFieldTree() {
  const { masterTemplate, copyField, areFieldsReadOnly } = useTemplate();
  const [treeState, setTreestate] = useState(
    toggleExpandedForAll({ treeData: masterTemplate.fields, expanded: true })
  );

  const generateNodeProps = (row) => ({
    title: row.node.name,
    buttons: areFieldsReadOnly
      ? []
      : [
          <IconButton
            minW="auto"
            aria-label="Copy Field"
            variant="link"
            onClick={() => copyField(row.node)}
            icon={<CopyIcon />}
          />
        ]
  });

  return (
    <PageListContainer>
      <SortableTree
        treeData={treeState}
        canDrag={() => false}
        canDrop={() => false}
        isVirtualized={false}
        onChange={setTreestate}
        getNodeKey={({ node }) => node.fieldId}
        generateNodeProps={generateNodeProps}
      />
    </PageListContainer>
  );
}
