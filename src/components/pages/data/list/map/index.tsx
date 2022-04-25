import { Box } from "@chakra-ui/layout";
import SITE_CONFIG from "@configs/site-config";
import { GMAPS_LIBRARIES, mapboxToGmapsViewPort } from "@ibp/naksha-commons";
import {
  GoogleMap,
  InfoBox,
  LoadScriptNext,
  Marker,
  MarkerClusterer
} from "@react-google-maps/api";
import { getMapCenter } from "@utils/location";
import React, { useMemo, useRef, useState } from "react";

import { Card } from "../cards";
import useResponseList from "../use-response-list";

export default function Map() {
  const mapRef = useRef<any>(null);
  const [iCard, setICard] = useState<any>();
  const { responses, currentCard } = useResponseList();
  const viewPort = useMemo(
    () => mapboxToGmapsViewPort(getMapCenter(3.8, { maxZoom: 8 }) as any),
    []
  );

  const filteredResponses = useMemo(() => responses.l.filter((m) => m), [responses]);

  const onMarkerClick = (responseId) => window.open(`/data/show/${responseId}`, "_blank");

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
          ref={mapRef}
          options={{ gestureHandling: "greedy" }}
        >
          {currentCard && (
            <Marker
              animation={"1" as any}
              position={{ lng: currentCard.centroid[0], lat: currentCard.centroid[1] }}
            />
          )}
          <MarkerClusterer key={filteredResponses.length} gridSize={30}>
            {(clusterer) =>
              filteredResponses.map((r, index) => (
                <Marker
                  key={r.id}
                  icon={
                    r.id === currentCard?.id // replaces marker icon with empty image to hide overlap if marker is visible
                      ? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIA"
                      : undefined
                  }
                  position={{ lng: r.centroid[0], lat: r.centroid[1] }}
                  onMouseOver={() => setICard(r)}
                  onMouseOut={() => setICard(null)}
                  clusterer={clusterer}
                  onClick={() => onMarkerClick(r.id)}
                  noClustererRedraw={index !== filteredResponses.length - 1} // for marker rendering performance https://github.com/tomchentw/react-google-maps/issues/836#issuecomment-894381349
                />
              ))
            }
          </MarkerClusterer>
          {iCard && (
            <InfoBox
              position={{ lng: iCard.centroid[0], lat: iCard.centroid[1] }}
              options={{ maxWidth: 340 }}
            >
              <Box bg="white" borderRadius="xl" boxShadow="lg">
                <Card response={iCard} onHover={() => null} isTruncated={true} />
              </Box>
            </InfoBox>
          )}
        </GoogleMap>
      </LoadScriptNext>
    </Box>
  );
}
