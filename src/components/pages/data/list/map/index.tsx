import { GMAPS_LIBRARIES, mapboxToGmapsViewState } from "@biodiv-platform/naksha-commons";
import { Box } from "@chakra-ui/layout";
import SITE_CONFIG from "@configs/site-config";
import { GoogleMap, LoadScriptNext, Marker, MarkerClusterer } from "@react-google-maps/api";
import { getMapCenter } from "@utils/location";
import React, { useEffect, useMemo, useRef, useState } from "react";

import useResponseList from "../use-response-list";
import InfoCard from "./info-card";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { ENDPOINT, isBrowser } from "@static/constants";
import useGlobalState from "@hooks/use-global-state";
import { stringify } from "querystring";
import { hasAccess } from "@utils/auth";
import { useToast } from "@chakra-ui/react";
import { Role } from "@interfaces/custom";
import ExternalBlueLink from "@components/@core/blue-link/external";
import { updateURLWithExistingQueries } from "@utils/query-string";

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

  const { defaultLayers } = useResponseList();

  const [selectedLayers, setSelectedLayers] = useState(defaultLayers);

  console.log({ defaultLayers });

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
      window.history.pushState(
        "",
        "",
        updateURLWithExistingQueries({ layers: selectedLayers.toString() })
      );
    }
  }, [selectedLayers]);

  const mapRef = useRef<any>(null);
  const [iCard, setICard] = useState<any>();
  const { currentCard, map } = useResponseList();
  const viewPort = useMemo(
    () => mapboxToGmapsViewState(getMapCenter(3.8, { maxZoom: 8 }) as any),
    []
  );

  console.log({ map });

  // useEffect(() => {
  //   if (mapRef.current && map.length > 0) {
  //     const bounds = new window.google.maps.LatLngBounds();
  //     map.forEach((marker) => bounds.extend(marker));
  //     mapRef.current.fitBounds(bounds);
  //   }
  // }, [map]);

  // const onMarkerClick = (responseId) => window.open(`/data/show/${responseId}`, "_blank");

  // const hoveredCard = useMemo(
  //   () => (currentCard?.id ? map.find((m) => m.id === currentCard.id) : null),
  //   [currentCard]
  // );

  return (
    <Box boxSize="full">
      {/* <LoadScriptNext
        googleMapsApiKey={SITE_CONFIG.TOKENS.GMAP}
        region={SITE_CONFIG.MAP.COUNTRY}
        libraries={GMAPS_LIBRARIES.DEFAULT}
      >
        <GoogleMap
          id="naksha-gmaps-view"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={viewPort.zoom}
          center={viewPort.center}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          options={{ gestureHandling: "greedy" }}
        >
          {hoveredCard && <Marker animation={"1" as any} position={hoveredCard} />}
          <MarkerClusterer key={map.length} gridSize={30}>
            {(clusterer) =>
              map.map((r, index) => (
                <Marker
                  key={r.id}
                  icon={
                    r.id === currentCard?.id // replaces marker icon with empty image to hide overlap if marker is visible
                      ? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIA"
                      : undefined
                  }
                  position={r}
                  onMouseOver={() => {
                    console.log({ r });
                    setICard(r);
                  }}
                  onMouseOut={() => setICard(null)}
                  clusterer={clusterer}
                  onClick={() => onMarkerClick(r.id)}
                  noClustererRedraw={index !== map.length - 1} // for marker rendering performance https://github.com/tomchentw/react-google-maps/issues/836#issuecomment-894381349
                />
              ))
            }
          </MarkerClusterer>
          {iCard && <InfoCard data={iCard} />}
        </GoogleMap>
      </LoadScriptNext> */}
      <NakshaMapboxList
        lang={lang}
        clusterMarkers={
          map &&
          map.map((loc) => ({
            id: loc.id,
            latitude: loc.lat,
            longitude: loc.lng
          }))
        }
        markerHeight={30}
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
