import ErrorPage from "@components/pages/_error";
import ResponseShowPageComponent from "@components/pages/data/show";
import { TemplateResponseShowProvider } from "@components/pages/data/show/use-template-response-show";
import { axGroupList } from "@services/app.service";
import {
  axGetTemplateResponseById,
  axGetTemplateResponseList,
  getTemplateByShortOrParentName
} from "@services/cca.service";
import { getUserIBPsByIds } from "@services/user.service";
import { FORM_TYPE } from "@static/constants";
import { canEditData } from "@utils/auth";
import { absoluteUrl, capitalize } from "@utils/basic";
import React from "react";

const ResponseShowPage = (props) =>
  props.success ? (
    <TemplateResponseShowProvider {...props}>
      <ResponseShowPageComponent />
    </TemplateResponseShowProvider>
  ) : (
    <ErrorPage statusCode={404} />
  );

export const getServerSideProps = async (ctx) => {
  try {
    const { data: response } = await axGetTemplateResponseById(ctx.query.responseId, ctx.locale);

    if (!response) {
      return { props: { success: false } };
    }

    const [
      template,
      {
        data: [header]
      },
      groupsData
    ] = await Promise.all([
      getTemplateByShortOrParentName(response.shortName, ctx.locale),
      axGetTemplateResponseList({ id: ctx.query.responseId, language: ctx.locale }),
      axGroupList(absoluteUrl(ctx).href)
    ]);

    const userIds = [response.userId, ...response.allowedUsers];
    const [owner, ...editors] = await getUserIBPsByIds(userIds);
    const canEdit = canEditData(userIds, ctx);

    if (response?.location?.district && response?.location?.state) {
      header.values.push({
        type: FORM_TYPE.TEXT,
        fieldId: "loc",
        name: "Location",
        value: capitalize(`${response.location.district}, ${response.location.state}`)
      });
    }

    return {
      props: {
        success: true,
        permissions: { owner, editors },
        template,
        response,
        canEdit,
        header,
        groups: groupsData.groups
      }
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { props: { success: false } };
  }
};

export default ResponseShowPage;
