<script lang="ts" setup>
import { MapView } from "@/modules/map-engine/public"
import type { Coordinate, RoutePoint } from "@/shared/types";
import { ref } from "vue";

const points = ref<RoutePoint[]>([]);

const addPoint = (coordinate: Coordinate) => {
  points.value.push({
    uuid: crypto.randomUUID(),
    coordinate,
  })
}
</script>

<template>
  <div class="route-editor">
    <MapView
      :points="points"
      @map-click="addPoint"
    />
  </div>
</template>

<style scoped></style>