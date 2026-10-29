<script lang="ts" setup>
import { MapView } from "@/modules/map-engine/public"
import type { Coordinate, RoutePoint } from "@/shared/types";
import { computed, ref } from "vue";
import { findNearestSegment } from "./utils";

const points = ref<RoutePoint[]>([]);
const selectedPointId = ref<string | null>(null);

const selectedPoint = computed(() =>
  points.value.find(
    (point) => point.uuid === selectedPointId.value,
  ),
);

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

const insertPoint = (coordinate: Coordinate) => {
  const index = findNearestSegment(points.value, coordinate);

  if (index === -1) return;

  points.value.splice(index + 1, 0, {
    uuid: crypto.randomUUID(),
    coordinate,
  });
};

const setSelectedPointId = (uuid: string) => {
  selectedPointId.value = uuid;
}
</script>

<template>
  <div class="route-editor">
    <MapView
      :points="points"
      :selected-point="selectedPoint"
      @map-click="addPoint"
      @point-move="movePoint"
      @line-click="insertPoint"
      @marker-click="setSelectedPointId"
    />
  </div>
</template>

<style scoped></style>
