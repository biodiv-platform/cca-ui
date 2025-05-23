import "mapbox-gl/dist/mapbox-gl.css";

import { Box } from "@chakra-ui/react";
import ExternalBlueLink from "@components/@core/blue-link/external";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import { Role } from "@interfaces/custom";
import { axGetDataSummaryById } from "@services/cca.service";
import { ENDPOINT, isBrowser } from "@static/constants";
import { hasAccess } from "@utils/auth";
import { getMapDataProps } from "@utils/location";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import useResponseList from "../use-response-list";

const NakshaMapboxList: any = dynamic(
  () => import("naksha-components-react").then((mod: any) => mod.NakshaMapboxList),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

import { toaster } from "@/components/ui/toaster";

export default function Map() {
  const { t, lang } = useTranslation();
  const { user } = useGlobalState();
  const isAdmin = hasAccess([Role.Admin]);

  const { addFilter, filter, map } = useResponseList();

  const [selectedLayers, setSelectedLayers] = useState(filter.f.layers);
  const [mapData, setMapData] = useState([]);

  const handleOnDownload = async (layerId) => {
    console.debug(`Layer download requested ${layerId}`);
    toaster.create({
      title: t("common:success"),
      description: (
        <div>
          {t("page:mail.sent")}{" "}
          <ExternalBlueLink href="/user/download-logs">
            {t("page:mail.download_logs")}
          </ExternalBlueLink>
        </div>
      ),
      // variant: "left-accent",
      type: "success",
      duration: 9000
      // closable: true
    });
  };

  useEffect(() => {
    if (isBrowser) {
      addFilter("layers", selectedLayers?.toString());
    }
  }, [selectedLayers]);

  useEffect(() => {
    if (map.length > 0) {
      setMapData(map);
    }
  }, [map]);

  async function fetchMarkerInfo(markerId) {
    const res = await axGetDataSummaryById(markerId);
    return res.data;
  }

  const { bounds, zoom, geoJSON } = getMapDataProps(mapData);

  const defaultViewState = {
    longitude: (bounds[0][0] + bounds[1][0]) / 2,
    latitude: (bounds[0][1] + bounds[1][1]) / 2,
    zoom,
    bearing: 0,
    pitch: 0
  };

  return (
    <Box boxSize="full" width="full" height="calc(100vh - var(--heading-height))">
      {mapData.length > 0 ? (
        <NakshaMapboxList
          lang={lang}
          clusterMarkers={geoJSON}
          hoverFunction={fetchMarkerInfo}
          defaultViewState={defaultViewState}
          loadToC={true}
          showToC={false}
          showLayerHoverPopup={false}
          selectedLayers={selectedLayers}
          onSelectedLayersChange={setSelectedLayers}
          nakshaEndpointToken={`Bearer ${user.accessToken}`}
          mapboxAccessToken={SITE_CONFIG.TOKENS.MAPBOX}
          nakshaApiEndpoint={ENDPOINT.NAKSHA}
          onLayerDownload={handleOnDownload}
          canLayerShare={true}
          geoserver={{
            endpoint: ENDPOINT.GEOSERVER,
            store: SITE_CONFIG.GEOSERVER.STORE,
            workspace: SITE_CONFIG.GEOSERVER.WORKSPACE
          }}
          managePublishing={isAdmin}
        />
      ) : (
        <p>No data available</p>
      )}
    </Box>
  );
}
