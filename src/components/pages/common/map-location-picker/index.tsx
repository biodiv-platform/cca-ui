import { Box, Collapsible } from "@chakra-ui/react";
import { GoogleMap } from "@react-google-maps/api";
import React from "react";

import Marker from "./marker";

const mapContainerStyle = {
  height: "380px",
  width: "100%"
};

const MapLocationPicker = ({ coordinates, setCoordinates, isOpen, onTextUpdate, zoom, center }) => {
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setCoordinates({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  return (
    <Collapsible.Root open={isOpen}>
      <Collapsible.Content>
        <Box borderRadius="md" overflow="hidden" mb={4}>
          <GoogleMap
            id="observation-create-map"
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={center}
            onClick={handleMapClick}
          >
            <Marker
              position={coordinates}
              setCoordinates={setCoordinates}
              onTextUpdate={onTextUpdate}
            />
          </GoogleMap>
        </Box>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

export default MapLocationPicker;
