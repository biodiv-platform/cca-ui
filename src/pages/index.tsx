import HomePageComponent from "@components/pages/home";
import SITE_CONFIG from "@configs/site-config";
import { axGroupList } from "@services/app.service";
import {
  axGetDataListAggregation,
  axGetFiltersListByShortName,
  axGetTemplateResponseList,
  axSearchMapCCAData
} from "@services/cca.service";
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

  const payload = {
    language: ctx.locale,
    query: ""
  };

  const { data: aggregationData } = await axGetDataListAggregation(payload);

  const { data: featured } = await axGetTemplateResponseList({
    id: SITE_CONFIG.CCA.FEATURED_IDS.toString(),
    language: ctx.locale
  });

  const { data: filtersList } = await axGetFiltersListByShortName({
    shortName: ctx.query?.shortName,
    language: ctx.locale
  });

  const { data: ccaMapResponse } = await axSearchMapCCAData(payload);

  return {
    props: {
      featured: {
        featured: featured,
        groupdata: groupdata,
        aggregationData: aggregationData,
        filtersList: filtersList,
        totalCount: ccaMapResponse.length
      }
    }
  };
};

export default index;
