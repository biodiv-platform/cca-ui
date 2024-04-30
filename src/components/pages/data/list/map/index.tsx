import { GMAPS_LIBRARIES, mapboxToGmapsViewState } from "@biodiv-platform/naksha-commons";
import { Box } from "@chakra-ui/layout";
import SITE_CONFIG from "@configs/site-config";
import { GoogleMap, LoadScriptNext, Marker, MarkerClusterer } from "@react-google-maps/api";
import { getMapCenter } from "@utils/location";
import React, { useEffect, useMemo, useRef, useState } from "react";

import useResponseList from "../use-response-list";
import InfoCard from "./info-card";

export default function Map() {
  const mapRef = useRef<any>(null);
  const [iCard, setICard] = useState<any>();
  const { currentCard, map } = useResponseList();
  const viewPort = useMemo(
    () => mapboxToGmapsViewState(getMapCenter(3.8, { maxZoom: 8 }) as any),
    []
  );

  useEffect(() => {
    if (mapRef.current && map.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      map.forEach((marker) => bounds.extend(marker));
      mapRef.current.fitBounds(bounds);
    }
  }, [map]);

  const onMarkerClick = (responseId) => window.open(`/data/show/${responseId}`, "_blank");

  const hoveredCard = useMemo(
    () => (currentCard?.id ? map.find((m) => m.id === currentCard.id) : null),
    [currentCard]
  );

  return (
    <Box boxSize="full">
      <LoadScriptNext
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
                  onMouseOver={() => setICard(r)}
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
      </LoadScriptNext>
    </Box>
  );
}
