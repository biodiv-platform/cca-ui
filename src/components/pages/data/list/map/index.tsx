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
import { axSearchMapCCAData } from "@services/cca.service";
import MapPageComponent from "@components/pages/map";

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

  const [locationArr, setLocationArr] = useState<any>(null);

  const { addFilter, removeFilter, filter } = useResponseList();

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

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axSearchMapCCAData({
  //       language: "en",
  //       limit: 10,
  //       offset: 0,
  //       query: ""
  //     });
  //     setLocationArr(data);
  //   })();
  // }, []);

  // useEffect(() => {

  //   addFilter("layers", selectedLayers?.toString());
  // }, [selectedLayers]);

  const mapRef = useRef<any>(null);
  const [iCard, setICard] = useState<any>();
  const { currentCard, map } = useResponseList();
  // const map = [
  //   {
  //     id: 952,
  //     lat: 26.0435,
  //     lng: 93.9405
  //   },
  //   {
  //     id: 953,
  //     lat: 26.0623,
  //     lng: 94.1342
  //   },
  //   {
  //     id: 954,
  //     lat: 26.0796,
  //     lng: 94.4858
  //   },
  //   {
  //     id: 955,
  //     lat: 25.8674,
  //     lng: 93.6682
  //   },
  //   {
  //     id: 957,
  //     lat: 25.8396,
  //     lng: 93.6455
  //   },
  //   {
  //     id: 958,
  //     lat: 24.673,
  //     lng: 76.7461
  //   },
  //   {
  //     id: 959,
  //     lat: 34.176,
  //     lng: 67.9723
  //   },
  //   {
  //     id: 960,
  //     lat: 21.6103,
  //     lng: 74.1246
  //   },
  //   {
  //     id: 961,
  //     lat: 22.2492,
  //     lng: 79.3446
  //   },
  //   {
  //     id: 962,
  //     lat: 24.2713,
  //     lng: 76.6543
  //   },
  //   {
  //     id: 964,
  //     lat: 28.2185,
  //     lng: 74.5755
  //   },
  //   {
  //     id: 965,
  //     lat: 11.8849,
  //     lng: 77.9689
  //   },
  //   {
  //     id: 967,
  //     lat: 28.7041,
  //     lng: 77.1025
  //   },
  //   {
  //     id: 968,
  //     lat: 25.6677,
  //     lng: 94.1034
  //   },
  //   {
  //     id: 970,
  //     lat: 28.7041,
  //     lng: 77.1025
  //   },
  //   {
  //     id: 971,
  //     lat: 11.6643,
  //     lng: 78.146
  //   },
  //   {
  //     id: 972,
  //     lat: 28.5626,
  //     lng: 77.1189
  //   },
  //   {
  //     id: 973,
  //     lat: 11.6643,
  //     lng: 78.146
  //   }
  // ];
  const viewPort = useMemo(
    () => mapboxToGmapsViewState(getMapCenter(3.8, { maxZoom: 8 }) as any),
    []
  );

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
      {map.length > 0 && (
        // <NakshaMapboxList
        //   lang={lang}
        //   clusterMarkers={
        //     locationArr &&
        //     locationArr.map((loc) => ({
        //       id: loc.id,
        //       latitude: loc.lat,
        //       longitude: loc.lng
        //     }))
        //   }
        //   defaultViewState={defaultViewState}
        //   loadToC={true}
        //   showToC={true}
        //   selectedLayers={selectedLayers}
        //   onSelectedLayersChange={setSelectedLayers}
        //   nakshaEndpointToken={`Bearer ${user.accessToken}`}
        //   mapboxAccessToken={SITE_CONFIG.TOKENS.MAPBOX}
        //   nakshaApiEndpoint={ENDPOINT.NAKSHA}
        //   onLayerDownload={handleOnDownload}
        //   canLayerShare={true}
        //   geoserver={{
        //     endpoint: ENDPOINT.GEOSERVER,
        //     store: SITE_CONFIG.GEOSERVER.STORE,
        //     workspace: SITE_CONFIG.GEOSERVER.WORKSPACE
        //   }}
        //   managePublishing={isAdmin}
        // />
        <MapPageComponent defaultLayers={selectedLayers} locationArr={map} />
      )}
    </Box>
  );
}
