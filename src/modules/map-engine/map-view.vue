<script lang="ts" setup>
import { ref } from "vue";
import {
  MglMap,
  MglNavigationControl,
  MglMarker,
  type MglEvent,
} from "@indoorequal/vue-maplibre-gl";
import { mapStyle } from "./consts";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Emit, Props } from "./types"
import type { Coordinate } from "@/shared/types";

const { points } = defineProps<Props>();
const emit = defineEmits<Emit>();

const center = ref<[number, number]>([109.1967, 12.2388]);
const zoom = ref(12);

const onMapClick = (data: MglEvent<'click'>) => {
  const coordinate: Coordinate = [data.event.lngLat.lng, data.event.lngLat.lat]

  emit('mapClick', coordinate)
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
        v-for="(point, index) in points"
        :key="index"
        :coordinates="point"
      />
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