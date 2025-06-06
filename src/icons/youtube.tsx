import { createIcon } from "@chakra-ui/react";
import React from "react";

const YouTubeIcon = createIcon({
  displayName: "YouTube",
  path: (
    <g>
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="currentColor"
        d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"
      />
    </g>
  ),
  viewBox: "0 0 24 24"
});

export default YouTubeIcon;
