import { axGetHomeInfo } from "@/services/utility.service";
import { getLanguageId } from "@/utils/i18n";
import HomePageComponent from "@components/pages/home";
import SITE_CONFIG from "@configs/site-config";
import { axGroupList } from "@services/app.service";
import { axGetChartDataListAggregation, axGetTemplateResponseList } from "@services/cca.service";
import { axGetGroupHompageDetails } from "@services/usergroup.service";
import { absoluteUrl } from "@utils/basic";
import React from "react";

function index({ homeInfo }) {
  return <HomePageComponent homeInfo={homeInfo} />;
}

export const getServerSideProps = async (ctx) => {
  const aURL = absoluteUrl(ctx).href;
  const { currentGroup } = await axGroupList(
    aURL,
    getLanguageId(ctx.locale)?.ID ?? SITE_CONFIG.LANG.DEFAULT_ID
  );

  const { data: homeInfo } = currentGroup?.groupId
    ? await axGetGroupHompageDetails(
        currentGroup?.groupId,
        getLanguageId(ctx.locale)?.ID ?? SITE_CONFIG.LANG.DEFAULT_ID
      )
    : await axGetHomeInfo(getLanguageId(ctx.locale)?.ID ?? SITE_CONFIG.LANG.DEFAULT_ID);

  interface Payload {
    language: any;
    query: string;
    usergroups?: number;
  }

  const payload: Payload = {
    language: ctx.locale,
    query: ""
  };

  if (currentGroup?.id) {
    payload.usergroups = currentGroup.id;
  }

  const { data: aggregationData } = await axGetChartDataListAggregation(payload);

  const { data: featured } = await axGetTemplateResponseList({
    id: SITE_CONFIG.CCA.FEATURED_IDS.toString(),
    language: ctx.locale
  });

  return {
    props: {
      homeInfo: {
        ...homeInfo,
        gallerySlider: homeInfo.gallerySlider?.sort((a, b) => a.displayOrder - b.displayOrder),
        miniGallery: homeInfo?.miniGallery,
        featured: featured,
        aggregationData: aggregationData
      }
    }
  };
};

export default index;
