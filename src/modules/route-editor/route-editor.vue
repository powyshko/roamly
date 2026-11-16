<script lang="ts" setup>
import { MapView } from "@/modules/map-engine"
import type { Coordinate, Route, RoutePoint } from "@/shared/types";
import { HistoryActionType } from "@/shared/types";
import { computed, ref, onMounted } from "vue";
import { findNearestSegment } from "./utils";
import { useRouteHistory } from "./composables/useRouteHistory";
import { routeStorage } from "@/modules/storage";
import { useRoute, useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import RoutePropertiesPanel from "./parts/route-properties-panel.vue";

const route = ref<Route>({
  uuid: crypto.randomUUID(),
  title: "",
  description: "",
  points: [],
  geometrySource: "manual",
  geometryStatus: "draft",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const selectedPointId = ref<string | null>(null);

const draggingPoint = ref<{
  uuid: string;
  oldCoordinate: Coordinate;
} | null>(null);

const { canUndo, pushAction, undo, canRedo, redo } = useRouteHistory();

const currentRoute = useRoute();
const router = useRouter();

const routeId = currentRoute.params.uuid as string | undefined;

const message = useMessage();

const isEditMode = computed(() => Boolean(routeId));

const selectedPoint = computed(() =>
  route.value.points.find(
    (point) => point.uuid === selectedPointId.value,
  ),
);

const addPoint = (coordinate: Coordinate) => {
  const point: RoutePoint = {
    uuid: crypto.randomUUID(),
    coordinate,
  };

  const index = route.value.points.length;

  pushAction({
    type: HistoryActionType.AddPoint,
    point,
    index,
  });

  route.value.points.push(point);
}

const movePoint = (uuid: string, coordinate: Coordinate) => {
  const point = route.value.points.find((point) => point.uuid === uuid);

  if (!point) return;

  point.coordinate = coordinate;
};

const insertPoint = (coordinate: Coordinate) => {
  const index = findNearestSegment(route.value.points, coordinate);

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

  route.value.points.splice(insertIndex, 0, point);
};

const setSelectedPointId = (uuid: string) => {
  selectedPointId.value = uuid;
}

const deletePoint = (uuid: string) => {
  const index = route.value.points.findIndex(
    (point) => point.uuid === uuid,
  );

  if (index === -1) return;

  const point = route.value.points[index];

  pushAction({
    type: HistoryActionType.DeletePoint,
    point,
    index,
  });

  route.value.points.splice(index, 1);

  selectedPointId.value = null;
};

const handleUndo = () => {
  const action = undo();

  if (!action) return;

  switch (action.type) {
    case HistoryActionType.AddPoint: {
      route.value.points.splice(action.index, 1);

      if (selectedPointId.value === action.point.uuid) {
        selectedPointId.value = null;
      }

      break;
    }

    case HistoryActionType.DeletePoint: {
      route.value.points.splice(
        action.index,
        0,
        action.point,
      );

      break;
    }

    case HistoryActionType.MovePoint: {
      const point = route.value.points.find(
        (point) => point.uuid === action.uuid,
      );

      if (!point) break;

      point.coordinate = [...action.oldCoordinate];

      break;
    }
  }
};

const handleRedo = () => {
  const action = redo();

  if (!action) return;

  switch (action.type) {
    case HistoryActionType.AddPoint: {
      route.value.points.splice(
        action.index,
        0,
        action.point,
      );

      break;
    }

    case HistoryActionType.DeletePoint: {
      route.value.points.splice(action.index, 1);

      if (selectedPointId.value === action.point.uuid) {
        selectedPointId.value = null;
      }

      break;
    }

    case HistoryActionType.MovePoint: {
      const point = route.value.points.find(
        (point) => point.uuid === action.uuid,
      );

      if (!point) break;

      point.coordinate = [...action.newCoordinate];

      break;
    }
  }
};

const onPointDragStart = (uuid: string) => {
  const point = route.value.points.find((point) => point.uuid === uuid);

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

  const point = route.value.points.find((point) => point.uuid === uuid);

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

const saveRoute = async () => {
  route.value.updatedAt = new Date().toISOString();

  const routeData = JSON.parse(
    JSON.stringify(route.value),
  ) as Route;

  await routeStorage.save(routeData);
};

const loadRoute = async () => {
  if (!routeId) return;

  try {
    const savedRoute = await routeStorage.getById(routeId);

    if (!savedRoute) {
      message.error("Маршрут не найден");
      router.replace({ name: "route-library" });
      return;
    }

    route.value = savedRoute;
  } catch (err) {
    console.error("Failed to load route:", err);

    message.error("Не удалось загрузить маршрут");
    router.replace({ name: "route-library" });
  }
};

onMounted(() => {
  if (isEditMode.value) {
    loadRoute();
  }
});
</script>

<template>
  <div class="route-editor">
    <MapView
      :points="route.points"
      :selected-point="selectedPoint"
      :undo-disabled="!canUndo"
      :redo-disabled="!canRedo"
      @map-click="addPoint"
      @point-move="movePoint"
      @line-click="insertPoint"
      @marker-click="setSelectedPointId"
      @delete-point="deletePoint"
      @undo="handleUndo"
      @redo="handleRedo"
      @point-drag-start="onPointDragStart"
      @point-drag-end="onPointDragEnd"
      @save-route="saveRoute"
    />

    <RoutePropertiesPanel />
  </div>
</template>

<style scoped>
.route-editor {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
