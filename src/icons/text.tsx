import { createIcon } from "@chakra-ui/icon";
import React from "react";

const TextIcon = createIcon({
  displayName: "Text",
  path: (
    <g>
      <path d="M27,3H5A1,1,0,0,0,5,5H27a1,1,0,0,0,0-2Z" />
      <path d="M27,7H5A1,1,0,0,0,5,9H27a1,1,0,0,0,0-2Z" />
      <path d="M27,11H5a1,1,0,0,0,0,2H27a1,1,0,0,0,0-2Z" />
      <path d="M27,15H5a1,1,0,0,0,0,2H27a1,1,0,0,0,0-2Z" />
      <path d="M27,19H5a1,1,0,0,0,0,2H27a1,1,0,0,0,0-2Z" />
      <path d="M27,23H5a1,1,0,0,0,0,2H27a1,1,0,0,0,0-2Z" />
    </g>
  ),
  viewBox: "0 -9 24 32"
});

export default TextIcon;
