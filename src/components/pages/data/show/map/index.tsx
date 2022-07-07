import SITE_CONFIG from "@configs/site-config";
import { defaultViewPort } from "@ibp/naksha-commons";
import { NakshaGmapsView } from "@ibp/naksha-gmaps-view";
import React from "react";

import useTemplateResponseShow from "../use-template-response-show";

export default function ShowMap() {
  const { header } = useTemplateResponseShow();

  return (
    <NakshaGmapsView
      defaultViewPort={defaultViewPort}
      features={
        header.centroid.length
          ? [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: header.centroid
                }
              }
            ]
          : []
      }
      gmapRegion={SITE_CONFIG.MAP.COUNTRY}
      gmapApiAccessToken={SITE_CONFIG.TOKENS.GMAP}
      maxZoom={14}
      mapStyle={{
        height: "100%",
        width: "100%",
        overflow: "hidden"
      }}
      options={{ mapTypeId: "hybrid" }}
    />
  );
}
