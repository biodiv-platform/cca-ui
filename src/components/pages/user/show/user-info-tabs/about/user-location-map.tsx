import { GMAPS_LIBRARIES } from "@biodiv-platform/naksha-commons";
import { Box } from "@chakra-ui/layout";
import SITE_CONFIG from "@configs/site-config";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import React, { useRef } from "react";

export default function UserLocationMap({ lat, lng }) {
  const mapRef = useRef<any>(null);

  if (!lat) {
    return null;
  }

  return (
    <Box boxSize="full" h="12rem" borderRadius="md" overflow="hidden">
      <LoadScriptNext
        googleMapsApiKey={SITE_CONFIG.TOKENS.GMAP}
        region={SITE_CONFIG.MAP.COUNTRY}
        libraries={GMAPS_LIBRARIES.DEFAULT}
      >
        <GoogleMap
          id="naksha-gmaps-view"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={10}
          center={{ lat, lng }}
          ref={mapRef}
          options={{ gestureHandling: "greedy" }}
        >
          <Marker position={{ lat, lng }}></Marker>
        </GoogleMap>
      </LoadScriptNext>
    </Box>
  );
}
