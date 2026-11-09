
import { computed, ref } from "vue";
import cloneDeep from "lodash-es/cloneDeep";
import type { RoutePoint, HistoryActionType } from "@/shared/types";

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
    };

export const useRouteHistory = () => {
  const history = ref<HistoryAction[]>([]);

  const canUndo = computed(() => history.value.length > 0);

  const pushAction = (action: HistoryAction) => {
    history.value.push(cloneDeep(action));

    if (history.value.length > HISTORY_LIMIT) {
      history.value.shift();
    }
  };

  const undo = (): HistoryAction | null => {
    return history.value.pop() ?? null;
  };

  const clear = () => {
    history.value = [];
  };

  return {
    canUndo,
    pushAction,
    undo,
    clear,
  };
};
