import { createIcon } from "@chakra-ui/react";
import React from "react";

const LoginIcon = createIcon({
  displayName: "Sign In",
  path: (
    <g
      width="24"
      height="24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
      <path d="M20 12h-13l3 -3m0 6l-3 -3"></path>
    </g>
  ),
  viewBox: "0 0 24 24"
});

export default LoginIcon;
