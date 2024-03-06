import ChartComponent from "@components/pages/chart";
import { axGroupList } from "@services/app.service";
import {
  axGetDataListAggregation,
  axGetFiltersListByShortName,
  axSearchMapCCAData
} from "@services/cca.service";
import { axGetGroupHompageDetails } from "@services/usergroup.service";
import { absoluteUrl } from "@utils/basic";
import React from "react";

export default function PageShowPage({ chartData }) {
  return <ChartComponent chartData={chartData} />;
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

  const { data: filtersList } = await axGetFiltersListByShortName({
    shortName: ctx.query?.shortName,
    language: ctx.locale
  });

  const { data: ccaMapResponse } = await axSearchMapCCAData(payload);

  return {
    props: {
      chartData: {
        groupdata: groupdata,
        aggregationData: aggregationData,
        filtersList: filtersList,
        totalCount: ccaMapResponse.length
      }
    }
  };
};
