import ErrorPage from "@components/pages/_error";
import ResponseShowPageComponent from "@components/pages/data/show";
import { TemplateResponseShowProvider } from "@components/pages/data/show/use-template-response-show";
import {
  axGetTemplateResponseById,
  axGetTemplateResponseList,
  getLoactionInfo,
  getTemplateByShortOrParentName
} from "@services/cca.service";
import { getUserIBPsByIds } from "@services/user.service";
import { FORM_TYPE } from "@static/constants";
import { canEditData } from "@utils/auth";
import { capitalize } from "@utils/basic";
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
  const { data: response } = await axGetTemplateResponseById(ctx.query.responseId, {
    language: ctx.locale
  });

  // if response is empty then record does not exist
  if (!response) {
    return {
      props: {
        success: false
      }
    };
  }

  const template = await getTemplateByShortOrParentName(response.shortName, ctx.locale);

  const {
    data: [header]
  } = await axGetTemplateResponseList({ id: ctx.query.responseId, language: ctx.locale });

  if (header?.centroid) {
    const { data: li, success } = await getLoactionInfo(header.centroid);
    if (success) {
      header.values.push({
        type: FORM_TYPE.TEXT,
        fieldId: "loc",
        name: "Location",
        value: capitalize(`${li.district}, ${li.state}`)
      });
    }
  }

  const canEdit = canEditData([response.userId, ...response.allowedUsers], ctx);

  const [owner, ...editors] = await getUserIBPsByIds([response.userId, ...response.allowedUsers]);

  return {
    props: {
      success: true,
      permissions: { owner, editors },
      template,
      response,
      canEdit,
      header
    }
  };
};

export default ResponseShowPage;
