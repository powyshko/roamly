import { computed, ref } from 'vue';
import cloneDeep from 'lodash-es/cloneDeep';
import type { RoutePoint, HistoryActionType, Coordinate } from '@/shared/types';

const HISTORY_LIMIT = 50;

type HistoryAction =
  | {
      type: typeof HistoryActionType.AddPoint;
      point: RoutePoint;
      index: number;
    }
  | {
      type: typeof HistoryActionType.DeletePoint;
      point: RoutePoint;
      index: number;
    }
  | {
      type: typeof HistoryActionType.MovePoint;
      uuid: string;
      oldCoordinate: Coordinate;
      newCoordinate: Coordinate;
    };

export const useRouteHistory = () => {
  const undoStack = ref<HistoryAction[]>([]);
  const redoStack = ref<HistoryAction[]>([]);

  const canUndo = computed(() => undoStack.value.length > 0);
  const canRedo = computed(() => redoStack.value.length > 0);

  const pushAction = (action: HistoryAction) => {
    undoStack.value.push(cloneDeep(action));

    if (undoStack.value.length > HISTORY_LIMIT) {
      undoStack.value.shift();
    }

    redoStack.value = [];
  };

  const undo = (): HistoryAction | null => {
    const action = undoStack.value.pop();

    if (!action) return null;

    redoStack.value.push(action);

    return action;
  };

  const redo = (): HistoryAction | null => {
    const action = redoStack.value.pop();

    if (!action) return null;

    undoStack.value.push(action);

    return action;
  };

  const clear = () => {
    undoStack.value = [];
    redoStack.value = [];
  };

  return {
    canUndo,
    canRedo,
    pushAction,
    undo,
    redo,
    clear,
  };
};
