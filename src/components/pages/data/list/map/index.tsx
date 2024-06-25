import "mapbox-gl/dist/mapbox-gl.css";

import { Box, useToast } from "@chakra-ui/react";
import ExternalBlueLink from "@components/@core/blue-link/external";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import { Role } from "@interfaces/custom";
import { ENDPOINT, isBrowser } from "@static/constants";
import { hasAccess } from "@utils/auth";
import { getMapCenter } from "@utils/location";
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

const defaultViewState = getMapCenter(3.1);

export default function Map() {
  const { t, lang } = useTranslation();
  const { user } = useGlobalState();
  const toast = useToast();
  const isAdmin = hasAccess([Role.Admin]);

  const { addFilter, filter, map } = useResponseList();

  const [selectedLayers, setSelectedLayers] = useState(filter.f.layers);

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

  const NakshaMapboxListWrapper = (props) => {
    return <NakshaMapboxList {...props} />;
  };

  return (
    <Box boxSize="full">
      {map.length > 0 && (
        <NakshaMapboxListWrapper
          lang={lang}
          clusterMarkers={[...map]}
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
      )}
    </Box>
  );
}
