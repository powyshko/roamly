<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  MglMap,
  MglNavigationControl,
  type MglEvent,
  MglGeoJsonSource,
  MglLineLayer,
} from "@indoorequal/vue-maplibre-gl";
import { mapStyle, layout, paint, LAYER_ID } from "./consts";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Emit, Props } from "./types"
import type { Coordinate } from "@/shared/types";
import RoutePointMarker from "@/components/RoutePointMarker.vue";
import { NButton } from "naive-ui";
import { TrashOutline } from "@vicons/ionicons5";

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

const onDeletePoint = () => {
  if (!selectedPoint) return;

  emit("deletePoint", selectedPoint.uuid);
};

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
        <NButton
          type="error"
          quaternary
          circle
          size="tiny"
          aria-label="Удалить точку маршрута"
          title="Удалить точку"
          @click.stop="onDeletePoint"
        >
          <template #icon>
            <TrashOutline :size="12" />
          </template>
        </NButton>
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

:deep(.maplibregl-popup-content) {
  padding: 6px;
  border-radius: 8px;
  background: var(--color-sand-50);
  box-shadow: 0 2px 8px var(--color-sage-900-alpha-20);
}

:deep(.maplibregl-popup-tip) {
  border-top-color: var(--color-sand-50);
}
</style>