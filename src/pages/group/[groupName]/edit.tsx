import { axGetLangList } from "@/services/utility.service";
import { getLanguageId } from "@/utils/i18n";
import { authorizedPageSSP, throwUnauthorized } from "@components/auth/auth-redirect";
import { Role } from "@interfaces/custom";
import { axGroupList } from "@services/app.service";
import {
  axGetGroupAdministratorsByGroupId,
  axGetGroupEditInfoByGroupId,
  axGetGroupHompageDetails
} from "@services/usergroup.service";
import { absoluteUrl } from "@utils/basic";
import dynamic from "next/dynamic";
import React from "react";

const GroupEditPageComponent: any = dynamic(() => import("@components/pages/group/edit"), {
  ssr: false
});

const GroupEditPage = (props) => <GroupEditPageComponent {...props} />;

export const getServerSideProps = async (ctx) => {
  const redirect = authorizedPageSSP([Role.Any], ctx);
  if (redirect) return redirect;

  const aReq = absoluteUrl(ctx);

  const langId = getLanguageId(ctx.locale)?.ID;

  const { currentGroup } = await axGroupList(aReq.href, langId);

  // This can throw error if user is not authorized
  const { success: s1, data: groupInfo } = await axGetGroupEditInfoByGroupId(currentGroup.id, ctx);
  const { success: s2, data } = await axGetGroupAdministratorsByGroupId(currentGroup.id);
  const { data: languagesList } = await axGetLangList();

  const { data: homePageDetails } = await axGetGroupHompageDetails(currentGroup.id, langId);
  if (s1 && s2) {
    return {
      props: {
        groupInfo,
        homePageDetails,
        userGroupId: currentGroup.id,

        founders: data.founderList.map(({ name, id }) => ({ label: `${name} (${id})`, value: id })),
        moderators: data.moderatorList.map(({ name, id }) => ({
          label: `${name} (${id})`,
          value: id
        })),
        languagesList
      }
    };
  }

  throwUnauthorized(ctx);
};

export default GroupEditPage;
