<script lang="ts" setup>
import { MapView } from "@/modules/map-engine/public"
import type { Coordinate, RoutePoint } from "@/shared/types";
import { HistoryActionType } from "@/shared/types";
import { computed, ref } from "vue";
import { findNearestSegment } from "./utils";
import { useRouteHistory } from "./composables/useRouteHistory";

const points = ref<RoutePoint[]>([]);
const selectedPointId = ref<string | null>(null);
const draggingPoint = ref<{
  uuid: string;
  oldCoordinate: Coordinate;
} | null>(null);

const { canUndo, pushAction, undo } = useRouteHistory();

const selectedPoint = computed(() =>
  points.value.find(
    (point) => point.uuid === selectedPointId.value,
  ),
);

const addPoint = (coordinate: Coordinate) => {
  const point: RoutePoint = {
    uuid: crypto.randomUUID(),
    coordinate,
  };

  const index = points.value.length;

  pushAction({
    type: HistoryActionType.AddPoint,
    point,
    index,
  });

  points.value.push(point);
}

const movePoint = (uuid: string, coordinate: Coordinate) => {
  const point = points.value.find((point) => point.uuid === uuid);

  if (!point) return;

  point.coordinate = coordinate;
};

const insertPoint = (coordinate: Coordinate) => {
  const index = findNearestSegment(points.value, coordinate);

  if (index === -1) return;

  const point: RoutePoint = {
    uuid: crypto.randomUUID(),
    coordinate,
  };

  const insertIndex = index + 1;

  pushAction({
    type: HistoryActionType.AddPoint,
    point,
    index: insertIndex,
  });

  points.value.splice(insertIndex, 0, point);
};

const setSelectedPointId = (uuid: string) => {
  selectedPointId.value = uuid;
}

const deletePoint = (uuid: string) => {
  const index = points.value.findIndex(
    (point) => point.uuid === uuid,
  );

  if (index === -1) return;

  const point = points.value[index];

  pushAction({
    type: HistoryActionType.DeletePoint,
    point,
    index,
  });

  points.value.splice(index, 1);

  selectedPointId.value = null;
};

const handleUndo = () => {
  const action = undo();

  if (!action) return;

  switch (action.type) {
    case HistoryActionType.AddPoint: {
      points.value.splice(action.index, 1);

      if (selectedPointId.value === action.point.uuid) {
        selectedPointId.value = null;
      }

      break;
    }

    case HistoryActionType.DeletePoint: {
      points.value.splice(
        action.index,
        0,
        action.point,
      );

      break;
    }

    case HistoryActionType.MovePoint: {
      const point = points.value.find(
        (point) => point.uuid === action.uuid,
      );

      if (!point) break;

      point.coordinate = [...action.oldCoordinate];

      break;
    }
  }
};

const onPointDragStart = (uuid: string) => {
  const point = points.value.find((point) => point.uuid === uuid);

  if (!point) return;

  draggingPoint.value = {
    uuid,
    oldCoordinate: [...point.coordinate],
  };
};

const onPointDragEnd = (uuid: string) => {
  if (!draggingPoint.value || draggingPoint.value.uuid !== uuid) {
    return;
  }

  const point = points.value.find((point) => point.uuid === uuid);

  if (!point) {
    draggingPoint.value = null;
    return;
  }

  const oldCoordinate = draggingPoint.value.oldCoordinate;
  const newCoordinate = [...point.coordinate] as Coordinate;

  const hasChanged =
    oldCoordinate[0] !== newCoordinate[0] ||
    oldCoordinate[1] !== newCoordinate[1];

  if (hasChanged) {
    pushAction({
      type: HistoryActionType.MovePoint,
      uuid,
      oldCoordinate,
      newCoordinate,
    });
  }

  draggingPoint.value = null;
};
</script>

<template>
  <div class="route-editor">
    <MapView
      :points="points"
      :selected-point="selectedPoint"
      :undo-disabled="canUndo"
      @map-click="addPoint"
      @point-move="movePoint"
      @line-click="insertPoint"
      @marker-click="setSelectedPointId"
      @delete-point="deletePoint"
      @undo="handleUndo"
      @point-drag-start="onPointDragStart"
      @point-drag-end="onPointDragEnd"
    />
  </div>
</template>

<style scoped></style>
