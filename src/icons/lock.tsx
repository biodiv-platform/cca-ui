import { createIcon } from "@chakra-ui/react";
import React from "react";

const LockIcon = createIcon({
  displayName: "Lock",
  path: (
    <path
      fillRule="evenodd"
      fill="currentColor"
      d="M4 4v2h-.25A1.75 1.75 0 002 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-5.5A1.75 1.75 0 0012.25 6H12V4a4 4 0 10-8 0zm6.5 2V4a2.5 2.5 0 00-5 0v2h5zM12 7.5h.25a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-5.5a.25.25 0 01.25-.25H12z"
    />
  ),

  viewBox: "0 0 16 16"
});

export default LockIcon;
