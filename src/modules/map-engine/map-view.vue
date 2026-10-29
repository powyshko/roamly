<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  MglMap,
  MglNavigationControl,
  MglMarker,
  type MglEvent,
  MglGeoJsonSource,
  MglLineLayer,
} from "@indoorequal/vue-maplibre-gl";
import { mapStyle, layout, paint, LAYER_ID } from "./consts";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Emit, Props } from "./types"
import type { Coordinate, MoveCoordinate } from "@/shared/types";

const { points } = defineProps<Props>();
const emit = defineEmits<Emit>();

const center = ref<[number, number]>([109.1967, 12.2388]);
const zoom = ref(12);

const coordinates = computed(() => points.map((point) => point.coordinate))

const routeGeoJson = computed(() => ({
  type: "Feature" as const,
  properties: {},
  geometry: {
    type: "LineString" as const,
    coordinates: coordinates.value,
  },
}));

const onMapClick = (data: MglEvent<'click'>) => {
  const event = data.event
  const map = event.target
  const layerId = LAYER_ID
  const coordinate: Coordinate = [event.lngLat.lng, event.lngLat.lat]

  const clickedLine =
    !!map.getLayer(layerId) &&
    map.queryRenderedFeatures(event.point, {
      layers: [layerId],
    }).length > 0

  if (clickedLine) {
    emit('lineClick', coordinate)
    return
  }

  emit('mapClick', coordinate)
}

const onMovePoint = (uuidPoint: string, data: MoveCoordinate) => {
  emit('pointMove', uuidPoint, [data.lng, data.lat])
}

</script>

<template>
  <div class="map-view">
    <MglMap
      :map-style="mapStyle"
      :center="center"
      :zoom="zoom"
      @map:click="onMapClick"
    >
      <MglNavigationControl position="top-right" />

      <MglMarker
        v-for="point in points"
        :key="point.uuid"
        :draggable="true"
        :coordinates="point.coordinate"
        @update:coordinates="onMovePoint(point.uuid, $event)"
      />

      <MglGeoJsonSource
        v-if="points.length >= 2"
        source-id="draft-route"
        :data="routeGeoJson"
      >
        <MglLineLayer
          :layer-id="LAYER_ID"
          :layout="layout"
          :paint="paint"
        />
      </MglGeoJsonSource>
    </MglMap>
  </div>
</template>

<style scoped>
.map-view {
  width: 100%;
  height: 100vh;
  min-height: 400px;
}
</style>