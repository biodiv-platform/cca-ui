import "mapbox-gl/dist/mapbox-gl.css";

import { Box } from "@chakra-ui/react";
import ExternalBlueLink from "@components/@core/blue-link/external";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import { Role } from "@interfaces/custom";
import { ENDPOINT, isBrowser } from "@static/constants";
import { hasAccess } from "@utils/auth";
import { getMapCenter } from "@utils/location";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";

import { toaster } from "@/components/ui/toaster";

const NakshaMapboxList: any = dynamic(
  () => import("naksha-components-react").then((mod: any) => mod.NakshaMapboxList),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

const defaultViewState = getMapCenter(3.1);

export default function MapPageComponent({ defaultLayers }) {
  const { t, lang } = useTranslation();
  const { user } = useGlobalState();
  const isAdmin = hasAccess([Role.Admin]);
  const [selectedLayers, setSelectedLayers] = useState(defaultLayers);

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
      // isClosable: true
    });
  };

  useEffect(() => {
    if (isBrowser) {
      window.history.pushState("", "", `?${stringify({ layers: selectedLayers.toString() })}`);
    }
  }, [selectedLayers]);

  return (
    <Box height="calc(100vh - var(--heading-height))" overflow="hidden" position="relative">
      <NakshaMapboxList
        lang={lang}
        defaultViewState={defaultViewState}
        loadToC={true}
        showToC={true}
        selectedLayers={defaultLayers}
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
    </Box>
  );
}
