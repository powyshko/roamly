<script lang="ts" setup>
import { ref } from "vue";
import {
  MglMap,
  MglNavigationControl,
} from "@indoorequal/vue-maplibre-gl";
import { mapStyle } from "./consts";

import "maplibre-gl/dist/maplibre-gl.css";

const center = ref<[number, number]>([109.1967, 12.2388]);
const zoom = ref(12);
</script>

<template>
  <div class="map-view">
    <MglMap
      :map-style="mapStyle"
      :center="center"
      :zoom="zoom"
    >
      <MglNavigationControl position="top-right" />
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