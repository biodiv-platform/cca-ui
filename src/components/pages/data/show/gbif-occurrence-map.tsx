import { GMAPS_LIBRARIES } from "@biodiv-platform/naksha-commons";
import { Box, Heading, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import { GoogleMap, InfoWindow, LoadScriptNext } from "@react-google-maps/api";
import { axGetGBIFOccurrenceLocations, GBIFSearchBuffers } from "@services/cca.service";
import React, { useEffect, useMemo, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { getCcaGeometry, getGeometryKinds } from "./cca-geometry";
import useTemplateResponseShow from "./use-template-response-show";

interface OccurrenceLocation {
  latitude: number;
  longitude: number;
  recordCount: number;
  speciesCount: number;
  /** Any record here is inside the search area (the CCA grown by the buffer) */
  insideGeometry: boolean;
  /** Any record here is inside the CCA's own polygon(s) */
  insidePolygon: boolean;
}

interface OccurrenceLocationResponse {
  bbox: [number, number, number, number] | null;
  /** The exact area the records were counted in, as a GeoJSON geometry */
  searchArea: any | null;
  /** Buffer around points, in km */
  pointBufferKm: number;
  /** Buffer around lines and polygons, in km */
  bufferKm: number;
  totalRecords: number;
  /** Records inside the search area */
  insideRecords: number;
  /** Records inside the CCA's own polygon(s) */
  polygonRecords: number;
  totalLocations: number;
  truncated: boolean;
  locations: OccurrenceLocation[];
}

interface GBIFOccurrenceMapProps {
  ccaId: number;
  /** How far around the CCA GBIF records are searched */
  buffers: GBIFSearchBuffers;
  selectedSpeciesGroup?: string | null;
  selectedIucnCategory?: string | null;
}

type Tier = "cca" | "buffer" | "outside";

interface ClassifiedLocation extends OccurrenceLocation {
  tier: Tier;
}

// High-contrast colours that stand out on the satellite basemap
const COLORS = {
  CCA_STROKE: "#FFEA00",
  CCA_HALO: "#000000",
  SEARCH_AREA: "#FFFFFF",
  TIER: { cca: "#00E5FF", buffer: "#FF9100", outside: "#FFFFFF" } as Record<Tier, string>
};

const TIER_Z_INDEX: Record<Tier, number> = { cca: 6, buffer: 5, outside: 4 };

const toPath = (line): google.maps.LatLngLiteral[] => line.map(([lng, lat]) => ({ lat, lng }));

/** Polygon rings and lines of any GeoJSON geometry as google.maps paths (points have no outline) */
const toPaths = (geometry): google.maps.LatLngLiteral[][] => {
  switch (geometry?.type) {
    case "Polygon":
    case "MultiLineString":
      return geometry.coordinates.map(toPath);
    case "MultiPolygon":
      return geometry.coordinates.flatMap((rings) => rings.map(toPath));
    case "LineString":
      return [toPath(geometry.coordinates)];
    case "GeometryCollection":
      return geometry.geometries.flatMap(toPaths);
    default:
      return [];
  }
};

const tierOf = (location: OccurrenceLocation): Tier =>
  location.insidePolygon ? "cca" : location.insideGeometry ? "buffer" : "outside";

const markerScale = (recordCount: number) => Math.min(4 + Math.log10(recordCount + 1) * 2.5, 14);

const LegendItem = ({ swatch, label }) => (
  <HStack gap={2}>
    {swatch}
    <Text fontSize="sm">{label}</Text>
  </HStack>
);

const Dot = ({ color, opacity = 1 }) => (
  <Box
    w="12px"
    h="12px"
    borderRadius="full"
    bg={color}
    opacity={opacity}
    border="1.5px solid"
    borderColor="gray.800"
    flexShrink={0}
  />
);

export default function GBIFOccurrenceMap({
  ccaId,
  buffers,
  selectedSpeciesGroup,
  selectedIucnCategory
}: GBIFOccurrenceMapProps) {
  const { response } = useTemplateResponseShow();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [data, setData] = useState<OccurrenceLocationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOutside, setShowOutside] = useState(false);
  const [selected, setSelected] = useState<ClassifiedLocation | null>(null);

  const ccaGeometry = useMemo(() => getCcaGeometry(response), [response]);

  // Only polygons have an inside; point CCAs just have the buffer around them. Points
  // and the other shapes are buffered by different distances.
  const { hasPolygon, hasPoint, hasShape } = useMemo(() => getGeometryKinds(ccaGeometry), [ccaGeometry]);

  // Tiers come from the server, which tested every raw record against the exact shapes
  const locations = useMemo<ClassifiedLocation[]>(
    () => (data?.locations ?? []).map((location) => ({ ...location, tier: tierOf(location) })),
    [data]
  );

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      setSelected(null);
      const { success, data } = await axGetGBIFOccurrenceLocations(
        ccaId,
        selectedSpeciesGroup,
        selectedIucnCategory,
        buffers
      );
      if (success) {
        setData(data);
      }
      setLoading(false);
    };
    fetchLocations();
  }, [ccaId, selectedSpeciesGroup, selectedIucnCategory, buffers.pointBufferKm, buffers.bufferKm]);

  // Fit the map to the search area's bounding box, falling back to the CCA geometry
  useEffect(() => {
    if (!map) return;
    const bounds = new google.maps.LatLngBounds();
    if (data?.bbox) {
      const [minLon, minLat, maxLon, maxLat] = data.bbox;
      bounds.extend({ lat: minLat, lng: minLon });
      bounds.extend({ lat: maxLat, lng: maxLon });
    } else if (ccaGeometry) {
      const layer = new google.maps.Data();
      layer.addGeoJson(ccaGeometry);
      layer.forEach((f) => f.getGeometry()?.forEachLatLng((ll) => bounds.extend(ll)));
    }
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, 24);
    }
  }, [map, data?.bbox?.join(","), ccaGeometry]);

  // The exact search area the server counted in, as a dashed outline
  useEffect(() => {
    if (!map || !data?.searchArea) return;

    const outlines = toPaths(data.searchArea).map(
      (path) =>
        new google.maps.Polyline({
          map,
          path,
          strokeOpacity: 0,
          clickable: false,
          zIndex: 1,
          icons: [
            {
              icon: {
                path: "M 0,-1 0,1",
                strokeOpacity: 0.9,
                strokeColor: COLORS.SEARCH_AREA,
                strokeWeight: 2,
                scale: 3
              },
              offset: "0",
              repeat: "16px"
            }
          ]
        })
    );

    return () => outlines.forEach((o) => o.setMap(null));
  }, [map, data?.searchArea]);

  // CCA boundary: a thick black halo under a bright yellow outline so it reads on any basemap
  useEffect(() => {
    if (!map || !ccaGeometry) return;

    const halo = new google.maps.Data({ map });
    halo.addGeoJson(ccaGeometry);
    halo.setStyle((feature) => ({
      clickable: false,
      strokeColor: COLORS.CCA_HALO,
      strokeOpacity: 0.7,
      strokeWeight: 8,
      fillOpacity: 0,
      zIndex: 2,
      visible: feature.getGeometry()?.getType() !== "Point"
    }));

    const boundary = new google.maps.Data({ map });
    boundary.addGeoJson(ccaGeometry);
    boundary.setStyle({
      clickable: false,
      strokeColor: COLORS.CCA_STROKE,
      strokeOpacity: 1,
      strokeWeight: 4,
      fillColor: COLORS.CCA_STROKE,
      fillOpacity: 0.12,
      zIndex: 3,
      title: "CCA location"
    });

    return () => {
      halo.setMap(null);
      boundary.setMap(null);
    };
  }, [map, ccaGeometry]);

  // Occurrence locations, sized by record count; CCA > buffer > outside in draw order
  useEffect(() => {
    if (!map || !locations.length) return;

    const layer = new google.maps.Data({ map });
    locations.forEach((location) => {
      if (location.tier === "outside" && !showOutside) return;
      layer.add(
        new google.maps.Data.Feature({
          geometry: new google.maps.Data.Point({
            lat: location.latitude,
            lng: location.longitude
          }),
          properties: { location }
        })
      );
    });

    layer.setStyle((feature) => {
      const location: ClassifiedLocation = feature.getProperty("location");
      return {
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: markerScale(location.recordCount),
          fillColor: COLORS.TIER[location.tier],
          fillOpacity: location.tier === "outside" ? 0.5 : 0.9,
          strokeColor: "#111111",
          strokeWeight: 1
        },
        zIndex: TIER_Z_INDEX[location.tier],
        title: `${location.recordCount.toLocaleString()} records`
      };
    });

    const listener = layer.addListener("click", (e) => setSelected(e.feature.getProperty("location")));

    return () => {
      listener.remove();
      layer.setMap(null);
    };
  }, [map, locations, showOutside]);

  if (!ccaGeometry) {
    return null;
  }

  // Exact totals from the server, independent of how many locations were returned
  const bufferKm = data?.bufferKm;
  const pointBufferKm = data?.pointBufferKm;
  const nearCca =
    hasPoint && hasShape
      ? `within ${bufferKm} km of the CCA or ${pointBufferKm} km of its point location`
      : hasPoint
      ? `within ${pointBufferKm} km of the CCA location`
      : `within ${bufferKm} km of the CCA`;
  const insideRecords = data?.insideRecords ?? 0;
  const ccaRecords = data?.polygonRecords ?? 0;
  const bufferRecords = insideRecords - ccaRecords;
  const searchedLocations = locations.filter((l) => l.tier !== "outside").length;

  const TIER_LABELS: Record<Tier, string> = {
    cca: "Inside CCA boundary",
    buffer: nearCca.charAt(0).toUpperCase() + nearCca.slice(1),
    outside: "Outside the search area (not counted)"
  };

  return (
    <Box borderRadius="md" border="1px solid var(--chakra-colors-gray-300)" boxShadow="sm" overflow="hidden">
      <Box bg="white" px={6} py={4} borderBottom="1px solid var(--chakra-colors-gray-300)">
        <Heading size="md" color="gray.800">
          GBIF Occurrences Map
        </Heading>
        {insideRecords > 0 && (
          <Text fontSize="sm" color="gray.600" mt={1}>
            {hasPolygon
              ? `${ccaRecords.toLocaleString()} records inside the CCA boundary, ${bufferRecords.toLocaleString()} more ${nearCca}`
              : `${insideRecords.toLocaleString()} records ${nearCca}`}
            {!data?.truncated && ` (${searchedLocations.toLocaleString()} locations)`}
          </Text>
        )}
      </Box>

      <Box position="relative" h={{ base: "22rem", md: "32rem" }}>
        <LoadScriptNext
          googleMapsApiKey={SITE_CONFIG.TOKENS.GMAP}
          region={SITE_CONFIG.MAP.COUNTRY}
          libraries={GMAPS_LIBRARIES.DEFAULT}
        >
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            onLoad={setMap}
            onUnmount={() => setMap(null)}
            options={{
              mapTypeId: "hybrid",
              gestureHandling: "cooperative",
              streetViewControl: false,
              maxZoom: 18
            }}
          >
            {selected && (
              <InfoWindow
                position={{ lat: selected.latitude, lng: selected.longitude }}
                onCloseClick={() => setSelected(null)}
              >
                <Box color="gray.800" fontSize="sm">
                  <Text fontWeight="bold">
                    {selected.recordCount.toLocaleString()} occurrence records
                  </Text>
                  <Text>{selected.speciesCount.toLocaleString()} species</Text>
                  <Text>{TIER_LABELS[selected.tier]}</Text>
                  <Text color="gray.500">
                    {selected.latitude}, {selected.longitude}
                  </Text>
                </Box>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScriptNext>

        {loading && (
          <Box position="absolute" top={3} right={14} bg="white" borderRadius="md" p={2} boxShadow="md">
            <Spinner size="sm" />
          </Box>
        )}
      </Box>

      <Stack bg="white" px={6} py={3} gap={2} borderTop="1px solid var(--chakra-colors-gray-300)">
        <HStack gap={6} wrap="wrap">
          <LegendItem
            swatch={
              hasPolygon ? (
                <Box
                  w="18px"
                  h="12px"
                  bg="rgba(255, 234, 0, 0.25)"
                  border="3px solid"
                  borderColor={COLORS.CCA_STROKE}
                  outline="1px solid black"
                  flexShrink={0}
                />
              ) : (
                <Box as="span" color="red.500" fontSize="lg" lineHeight={1}>
                  ●
                </Box>
              )
            }
            label={hasPolygon ? "CCA boundary" : "CCA location"}
          />
          {hasPolygon && <LegendItem swatch={<Dot color={COLORS.TIER.cca} />} label={TIER_LABELS.cca} />}
          <LegendItem swatch={<Dot color={COLORS.TIER.buffer} />} label={TIER_LABELS.buffer} />
          <LegendItem
            swatch={<Box w="18px" borderTop="2px dashed" borderColor="gray.500" flexShrink={0} />}
            label="Search area"
          />
          {showOutside && (
            <LegendItem
              swatch={<Dot color={COLORS.TIER.outside} opacity={0.6} />}
              label={TIER_LABELS.outside}
            />
          )}
        </HStack>
        <HStack justify="space-between" wrap="wrap" gap={2}>
          <Text fontSize="xs" color="gray.500">
            Circle size reflects the number of records at a location. Click a circle for details.
            {data?.truncated &&
              ` Showing the ${data.locations.length.toLocaleString()} busiest locations, those inside the CCA and search area first. Record counts above include all locations.`}
          </Text>
          <Checkbox size="sm" checked={showOutside} onCheckedChange={(e) => setShowOutside(!!e.checked)}>
            Show occurrences outside search area
          </Checkbox>
        </HStack>
      </Stack>
    </Box>
  );
}
