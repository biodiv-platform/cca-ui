import "mapbox-gl/dist/mapbox-gl.css";

import { Box, useToast } from "@chakra-ui/react";
import ExternalBlueLink from "@components/@core/blue-link/external";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import { Role } from "@interfaces/custom";
import { axGetDataSummaryById } from "@services/cca.service";
import { ENDPOINT, isBrowser } from "@static/constants";
import { hasAccess } from "@utils/auth";
import { getMapCenter } from "@utils/location";
import { NakshaMapboxList } from "naksha-components-react";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import useResponseList from "../use-response-list";

const defaultViewState = getMapCenter(4);

export default function Map() {
  const { t, lang } = useTranslation();
  const { user } = useGlobalState();
  const toast = useToast();
  const isAdmin = hasAccess([Role.Admin]);

  const { addFilter, filter, map } = useResponseList();

  const [selectedLayers, setSelectedLayers] = useState(filter.f.layers);
  const [mapData, setMapData] = useState([]);

  const handleOnDownload = async (layerId) => {
    console.debug(`Layer download requested ${layerId}`);
    toast({
      title: t("common:success"),
      description: (
        <div>
          {t("page:mail.sent")}{" "}
          <ExternalBlueLink href="/user/download-logs">
            {t("page:mail.download_logs")}
          </ExternalBlueLink>
        </div>
      ),
      variant: "left-accent",
      status: "success",
      duration: 9000,
      isClosable: true
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

  return (
    <Box boxSize="full">
      {mapData.length > 0 ? (
        <NakshaMapboxList
          lang={lang}
          clusterMarkers={mapData}
          hoverFunction={fetchMarkerInfo}
          defaultViewState={defaultViewState}
          loadToC={true}
          showToC={true}
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
