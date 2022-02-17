import TemplateResponseListComponent from "@components/pages/data/list";
import { axGetFiltersListByShortName, axGetTemplateResponseList } from "@services/cca.service";
import React from "react";

const TemplateResponseListPage = (props) => <TemplateResponseListComponent {...props} />;

export const getServerSideProps = async (ctx) => {
  const initialResponses = await axGetTemplateResponseList({ ...ctx.query, language: ctx.locale });

  const filtersList = await axGetFiltersListByShortName({
    shortName: ctx.query?.shortName,
    language: ctx.locale
  });

  return {
    props: {
      initialFilters: ctx.query,
      filtersList: filtersList.data,
      initialResponses: initialResponses.data,
      initialAggregation: initialResponses.aggregation
    }
  };
};

export default TemplateResponseListPage;
