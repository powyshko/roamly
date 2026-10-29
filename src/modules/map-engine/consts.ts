import type { StyleSpecification } from 'maplibre-gl'

export const mapStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: [
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
};

export const layout = {
  'line-join': 'round',
  'line-cap' : 'round'
} as const;

export const paint = {
  "line-color": "#8B7767",
  "line-width": 3,
  "line-opacity": 0.9,
};

export const LAYER_ID = "draft-route-line"