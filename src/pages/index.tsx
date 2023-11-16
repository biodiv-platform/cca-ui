import HomePageComponent from "@components/pages/home";
import SITE_CONFIG from "@configs/site-config";
import { axGroupList } from "@services/app.service";
import { axGetTemplateResponseList } from "@services/cca.service";
import { axGetGroupHompageDetails } from "@services/usergroup.service";
import { absoluteUrl } from "@utils/basic";
import React from "react";

function index({ featured }) {
  return <HomePageComponent featured={featured} />;
}

export const getServerSideProps = async (ctx) => {
  const aURL = absoluteUrl(ctx).href;
  const { currentGroup } = await axGroupList(aURL);

  const { data: groupdata } = await axGetGroupHompageDetails(currentGroup?.id);

  const { data: featured } = await axGetTemplateResponseList({
    id: SITE_CONFIG.CCA.FEATURED_IDS.toString(),
    language: ctx.locale
  });

  return {
    props: {
      featured: {
        featured: featured,
        groupdata: groupdata
      }
    }
  };
};

export default index;
