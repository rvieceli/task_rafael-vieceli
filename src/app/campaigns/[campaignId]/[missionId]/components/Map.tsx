"use client";

import { useRef, useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { MdLocationOn, MdOutlineMenu } from "react-icons/md";

import MapGl, {
  MapRef,
  Source,
  Layer,
  CircleLayer,
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
  useControl,
} from "react-map-gl/maplibre";
import { GeoJSONSourceOptions } from "mapbox-gl";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import { BASEMAP } from "@deck.gl/carto/typed";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";

const geojson: GeoJSONSourceOptions["data"] = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Point 1" },
      geometry: {
        type: "Point",
        coordinates: [7.8683, 45.45715],
      },
    },
  ],
};

const streets = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [7.867592629440253, 45.45719850819262],
          [7.8683948438385585, 45.45751685136949],
          [7.868768784414726, 45.45715591284244],
          [7.867998530748821, 45.45675013447294],
        ],
      },
    },
  ],
};

const layerStyle = {
  id: "point",
  type: "circle",
  source: "my-data",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
} satisfies CircleLayer;

const INITIAL_VIEW_STATE = {
  longitude: 7.8683462722900505,
  latitude: 45.45723940158311,
  zoom: 17,
};

function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

const markers = [
  {
    id: 1,
    lng: 7.867749232338923,
    lat: 45.45726338494393,
    imgSrc: "https://source.unsplash.com/bEXbERm29fQ",
  },
  {
    id: 2,
    lng: 7.867980288850589,
    lat: 45.45735414548733,
    imgSrc: "https://source.unsplash.com/tl97m-VJyMc",
  },
  {
    id: 3,
    lng: 7.868155891800484,
    lat: 45.457436262043785,
    imgSrc: "https://source.unsplash.com/yZnWFsKpENs",
  },
  {
    id: 4,
    lng: 7.868510178452624,
    lat: 45.4574449058851,
    imgSrc: "https://source.unsplash.com/iADofJwUuXE",
  },
  {
    id: 5,
    lng: 7.868386948313457,
    lat: 45.4575032517773,
    imgSrc: "https://source.unsplash.com/8rMbs5JRTJg",
  },
  {
    id: 6,
    lng: 7.868146649539767,
    lat: 45.4568095800353,
    imgSrc: "https://source.unsplash.com/lUNpIDu--o4",
  },
  {
    id: 7,
    lng: 7.868476290164523,
    lat: 45.45696733167969,
    imgSrc: "https://source.unsplash.com/Kz3Gc9i6luo",
  },
  {
    id: 8,
    lng: 7.868639570100186,
    lat: 45.45730444330323,
    imgSrc: "https://source.unsplash.com/FMmQtvOurSc",
  },
  {
    id: 9,
    lng: 7.868778204007185,
    lat: 45.4571596584299,
    imgSrc: "https://source.unsplash.com/pKWSLG5LFFA",
  },
  {
    id: 10,
    lng: 7.868269879680184,
    lat: 45.45727202881173,
    imgSrc: "https://source.unsplash.com/vk4vjTNVrTg",
  },
  {
    id: 11,
    lng: 7.867974127343416,
    lat: 45.457099151208354,
    imgSrc: "https://source.unsplash.com/tF6ZNdPwVL0",
  },
];

export function Map() {
  const mapRef = useRef<MapRef>(null);
  const [selected, setSelected] = useState<number | null>(null);

  function recenter() {
    mapRef.current?.flyTo({
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      duration: 2000,
      zoom: INITIAL_VIEW_STATE.zoom,
    });
  }

  function onImageClick({
    id,
    lat,
    lng,
  }: {
    id: number;
    lat: number;
    lng: number;
  }) {
    if (selected === id) {
      setSelected(null);
      recenter();
      return;
    }

    setSelected(id);

    mapRef.current?.flyTo({
      center: [lng, lat],
      duration: 1000,
      zoom: INITIAL_VIEW_STATE.zoom + 2,
    });
  }

  const layers = [
    new GeoJsonLayer({
      id: "geojson",
      data: streets,
      getLineColor: () => [100, 200, 200, 150],
      getLineWidth: () => mapRef.current?.getZoom()! / Math.PI,
    }),
  ];

  return (
    <Stack>
      <Box position="relative" height="600" width="100%">
        <MapGl
          ref={mapRef}
          initialViewState={INITIAL_VIEW_STATE}
          attributionControl={false}
          maxZoom={20}
          minZoom={15}
          mapStyle={BASEMAP.DARK_MATTER}
          reuseMaps
        >
          <DeckGLOverlay layers={layers} />
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
          {markers.map(({ lat, lng, id }) => (
            <Marker
              key={`${lat}-${lng}`}
              latitude={lat}
              longitude={lng}
              color={selected === id ? "red" : undefined}
              onClick={() => setSelected(id)}
            />
          ))}
          <FullscreenControl />
          <GeolocateControl />
          <NavigationControl />
          <ScaleControl />
          <Menu>
            <MenuButton
              as={IconButton}
              m="2"
              size="sm"
              aria-label="Options"
              fontSize="xl"
              icon={<MdOutlineMenu />}
            />
            <MenuList>
              <MenuItem icon={<MdLocationOn size="1rem" />} onClick={recenter}>
                Recenter
              </MenuItem>
            </MenuList>
          </Menu>
        </MapGl>
      </Box>
      <SimpleGrid minChildWidth="200px" spacing="2">
        {markers.map(({ id, imgSrc, lat, lng }) => (
          <Box key={id} onClick={() => onImageClick({ id, lat, lng })}>
            <Image
              src={imgSrc}
              alt=""
              width={200}
              height={200}
              style={{
                objectFit: "cover",
                height: "150px",
                scale: selected === id ? 1.5 : undefined,
              }}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  );
}

export default Map;
