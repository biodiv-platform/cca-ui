import { createIcon } from "@chakra-ui/icon";
import React from "react";

const RequiredIcon = createIcon({
  displayName: "Required",
  path: (
    <path
      d="M12 2V22M19.0711 4.92893L4.92893 19.0711M22 12H2M19.0711 19.0711L4.92893 4.92893"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  viewBox: "0 -5 32 32"
});

export default RequiredIcon;
