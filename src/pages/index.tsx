import HomePageComponent from "@components/pages/home";
import SITE_CONFIG from "@configs/site-config";
import { axGetTemplateResponseList } from "@services/cca.service";
import React from "react";

function index({ featured }) {
  return <HomePageComponent featured={featured} />;
}

export const getServerSideProps = async (ctx) => {
  const { data } = await axGetTemplateResponseList({
    id: SITE_CONFIG.CCA.FEATURED_IDS.toString(),
    language: ctx.locale
  });

  return { props: { featured: data } };
};

export default index;
