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

const movePoint = (uuid: string, coordinate: Coordinate) => {
  const point = points.value.find((point) => point.uuid === uuid);

  if (!point) return;

  point.coordinate = coordinate;
};
</script>

<template>
  <div class="route-editor">
    <MapView
      :points="points"
      @map-click="addPoint"
      @point-move="movePoint"
    />
  </div>
</template>

<style scoped></style>