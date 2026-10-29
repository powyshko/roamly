<script lang="ts" setup>
import { MglMarker } from "@indoorequal/vue-maplibre-gl";
import type { Coordinate, MoveCoordinate, RoutePoint } from "@/shared/types";

type Props = {
  point: RoutePoint;
  selected: boolean;
};

type Emit = {
  pointClick: [uuid: string];
  pointMove: [uuid: string, coordinate: Coordinate];
};

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const onMove = (data: MoveCoordinate) => {
  emit("pointMove", props.point.uuid, [data.lng, data.lat]);
};
</script>

<template>
  <MglMarker
    :coordinates="point.coordinate"
    :draggable="true"
    @update:coordinates="onMove"
  >
    <template #marker>
      <button
        class="route-marker"
        :class="{
          'route-marker--selected': selected,
        }"
        type="button"
        aria-label="Выбрать вершину маршрута"
        :aria-pressed="selected"
        @click.stop="emit('pointClick', point.uuid)"
      />
    </template>
  </MglMarker>
</template>

<style scoped>
.route-marker {
  width: 11px;
  height: 11px;
  padding: 0;
  border: 1.5px solid #edf2ed;
  border-radius: 50%;
  background: #627f78;
  box-shadow: 0 1px 3px rgb(36 48 43 / 25%);
  cursor: grab;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.route-marker:hover {
  transform: scale(1.2);
  box-shadow: 0 1px 4px rgb(36 48 43 / 35%);
}

.route-marker--selected {
  background: #c17b59;
  border-color: #fff0e5;
  box-shadow: 0 0 0 3px rgb(193 123 89 / 25%);
  transform: scale(1.1);
}

.route-marker--selected:hover {
  transform: scale(1.2);
}

.route-marker:active {
  cursor: grabbing;
}

@media (prefers-reduced-motion: reduce) {
  .route-marker {
    transition: none;
  }
}
</style>
