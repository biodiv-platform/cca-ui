import SITE_CONFIG from "@/configs/site-config";
import { getLanguageId } from "@/utils/i18n";
import GroupListPageComponent from "@components/pages/group/list";
import { GroupListFilterProvider } from "@components/pages/group/list/use-group-list";
import { axGroupListExpanded } from "@services/usergroup.service";
import { parse, stringify } from "@utils/query-string";
import React from "react";

const GroupListPage = (props) => (
  <GroupListFilterProvider {...props}>
    <GroupListPageComponent />
  </GroupListFilterProvider>
);

export const getServerSideProps = async (ctx) => {
  const [groupListExpanded] = await Promise.all([
    axGroupListExpanded(getLanguageId(ctx.locale)?.ID ?? SITE_CONFIG.LANG.DEFAULT_ID)
  ]);

  return {
    props: {
      filter: parse(stringify(ctx.query), ["speciesGroupIds", "habitatIds"]), // this to parse params as numeric array

      userGroupList: groupListExpanded.data
    }
  };
};

export default GroupListPage;
