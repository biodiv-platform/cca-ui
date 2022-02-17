import useGlobalState from "@hooks/use-global-state";
import React, { useEffect } from "react";

const logout = () => {
  const { logOut } = useGlobalState();

  useEffect(() => {
    logOut();
  }, []);

  return <pre>Please Wait...</pre>;
};

export default logout;
