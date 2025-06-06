import { createIcon } from "@chakra-ui/react";
import React from "react";

const UnlockIcon = createIcon({
  displayName: "Unlock",
  path: (
    <path
      fillRule="evenodd"
      fill="currentColor"
      d="M5.5 4a2.5 2.5 0 014.607-1.346.75.75 0 101.264-.808A4 4 0 004 4v2h-.501A1.5 1.5 0 002 7.5v6A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5v-6A1.5 1.5 0 0012.5 6h-7V4zm-.75 3.5H3.5v6h9v-6H4.75z"
    />
  ),
  viewBox: "0 0 16 16"
});

export default UnlockIcon;
