import ErrorPage from "@components/pages/_error";
import React from "react";

function FourNotFour() {
  return <ErrorPage statusCode={404} />;
}

export default FourNotFour;
