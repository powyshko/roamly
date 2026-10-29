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
import RoutePointMarker from "@/components/RoutePointMarker.vue";

const { points, selectedPoint = undefined } = defineProps<Props>();
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
    emit('markerClick', "")
    emit('lineClick', coordinate)
    return
  }

  emit('markerClick', "")
  emit('mapClick', coordinate)
}

const onMovePoint = (uuidPoint: string, coordinate: Coordinate) => {
  emit('pointMove', uuidPoint, coordinate)
}

const onClickTargetMarker = (uuid: string) => {
  emit('markerClick', uuid)
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

      <RoutePointMarker
        v-for="point in points"
        :key="point.uuid"
        :point="point"
        :selected="point.uuid === selectedPoint?.uuid"
        @point-click="onClickTargetMarker"
        @point-move="onMovePoint"
      />

      <MglPopup
        v-if="selectedPoint"
        :coordinates="selectedPoint.coordinate"
        :close-button="false"
      >
        <button>Delete</button>
      </MglPopup>

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

.route-marker {
  width: 14px;
  height: 14px;
  padding: 0;
  border: 2px solid white;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 1px 5px rgb(0 0 0 / 30%);
  cursor: pointer;
}

.route-marker--selected {
  width: 20px;
  height: 20px;
  outline: 3px solid rgb(37 99 235 / 30%);
}
</style>