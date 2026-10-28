<script lang="ts" setup>
import { MapView } from "@/modules/map-engine/public"
import type { Coordinate } from "@/shared/types";
import { ref } from "vue";

const points = ref<Coordinate[]>([]);

const addPoint = (point: Coordinate) => {
  points.value.push(point)
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