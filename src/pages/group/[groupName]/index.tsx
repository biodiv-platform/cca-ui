import HomePageComponent from "@components/pages/home";
import React from "react";

export { getServerSideProps } from "../../index";

const GroupHomePage = ({ featured }) => <HomePageComponent featured={featured} />;

export default GroupHomePage;
