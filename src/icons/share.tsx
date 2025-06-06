import { createIcon } from "@chakra-ui/react";
import React from "react";

const ShareIcon = createIcon({
  displayName: "Share",
  path: (
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13.5 3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 3a3 3 0 01-5.175 2.066l-3.92 2.179a3.005 3.005 0 010 1.51l3.92 2.179a3 3 0 11-.73 1.31l-3.92-2.178a3 3 0 110-4.133l3.92-2.178A3 3 0 1115 3zm-1.5 10a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-9-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  ),
  viewBox: "0 0 16 16"
});

export default ShareIcon;
