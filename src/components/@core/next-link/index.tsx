import Link from "next/link";
import React from "react";

export default function NextLink(props) {
  return <Link {...props} passHref={true} legacyBehavior />;
}
