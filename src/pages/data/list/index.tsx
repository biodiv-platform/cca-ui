import { axGetDataListAggregation, axGetFiltersListByShortName } from "@services/cca.service";
import { LIST_PAGINATION_LIMIT } from "@static/constants";
import dynamic from "next/dynamic";
import React from "react";

const TemplateResponseListComponent = dynamic(() => import("@components/pages/data/list"), {
  ssr: false
});

const TemplateResponseListPage = (props) => <TemplateResponseListComponent {...props} />;

export const getServerSideProps = async (ctx) => {
  const payload = {
    language: ctx.locale,
    ...ctx.query,
    offset: ctx.query.offset || 0,
    limit: LIST_PAGINATION_LIMIT
  };

  const aggregationData = await axGetDataListAggregation(payload);

  const filtersList = await axGetFiltersListByShortName({
    shortName: ctx.query?.shortName,
    language: ctx.locale
  });

  return {
    props: {
      initialFilters: payload,
      initialAggregation: aggregationData.data,
      filtersList: filtersList.data
    }
  };
};

export default TemplateResponseListPage;
