import { createIcon } from "@chakra-ui/react";
import React from "react";

const FilterIcon = createIcon({
  displayName: "Number",
  path: (
    <path
      fillRule="inherit"
      fill="currentColor"
      d="M12,25l6.67,6.67a1,1,0,0,0,.7.29.91.91,0,0,0,.39-.08,1,1,0,0,0,.61-.92V13.08L31.71,1.71A1,1,0,0,0,31.92.62,1,1,0,0,0,31,0H1A1,1,0,0,0,.08.62,1,1,0,0,0,.29,1.71L11.67,13.08V24.33A1,1,0,0,0,12,25ZM3.41,2H28.59l-10,10a1,1,0,0,0-.3.71V28.59l-4.66-4.67V12.67a1,1,0,0,0-.3-.71Z"
    />
  ),
  viewBox: "0 -5 40 40"
});

export default FilterIcon;
