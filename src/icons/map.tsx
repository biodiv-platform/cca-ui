import { createIcon } from "@chakra-ui/react";
import React from "react";

const MapIcon = createIcon({
  displayName: "Map",
  path: (
    <g
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </g>
  ),
  viewBox: "0 0 24 24"
});

export default MapIcon;
