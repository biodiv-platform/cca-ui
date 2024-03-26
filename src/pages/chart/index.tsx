import ChartComponent from "@components/pages/chart";
import { axGroupList } from "@services/app.service";
import {
  axGetChartDataListAggregation,
  axGetChartFiltersListByShortName
} from "@services/cca.service";
import { absoluteUrl } from "@utils/basic";
import React from "react";

export default function ChartShowPage({ chartData }) {
  return <ChartComponent chartData={chartData} />;
}

export const getServerSideProps = async (ctx) => {
  const aURL = absoluteUrl(ctx).href;
  const { currentGroup } = await axGroupList(aURL);

  interface Payload {
    isChart: boolean;
    language: any;
    query: string;
    usergroups?: number;
  }

  const payload: Payload = {
    isChart: true,
    language: ctx.locale,
    query: ""
  };

  if (currentGroup?.id) {
    payload.usergroups = currentGroup.id;
  }

  const { data: stats } = await axGetChartDataListAggregation(payload);

  const { data: filtersList } = await axGetChartFiltersListByShortName({
    shortName: ctx.query?.shortName,
    language: ctx.locale,
    isChart: true
  });

  return {
    props: {
      chartData: {
        filtersList: filtersList,
        stats: stats
      }
    }
  };
};
