import "react-sortable-tree/style.css";

import { useRouter } from "next/router";
import React from "react";
import SortableTree from "react-sortable-tree";

import usePagesSidebar from "./use-pages-sidebar";

export default function SidebarEditing() {
  const p = usePagesSidebar();
  const router = useRouter();

  return (
    <SortableTree
      treeData={p.pages}
      onChange={p.setPages}
      isVirtualized={false}
      canDrag={p.isEditing}
      scaffoldBlockPxWidth={24}
      generateNodeProps={({ node }) => ({
        onClick: () => {
          router.push(`/page/${p.linkType}/${node.id}`);
        },
        style: {
          background:
            node.id === Number(p.currentPage?.id)
              ? "var(--chakra-colors-blue-100)"
              : "var(--chakra-colors-gray-50)"
        }
      })}
      rowHeight={48}
    />
  );
}
