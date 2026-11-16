<script setup lang="ts">
import { NButton, NCard, NIcon, NPopconfirm, NSpace, NTag, NText } from 'naive-ui';
import { computed } from 'vue';
import { length, lineString } from '@turf/turf';
import { TrashOutline } from '@vicons/ionicons5';
import type { Route } from '@/shared/types';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

type Props = {
  route: Route;
};

type Emit = {
  open: [uuid: string];
  delete: [uuid: string];
};

const { route } = defineProps<Props>();

const emit = defineEmits<Emit>();

const routeDistance = computed(() => {
  if (route.points.length < 2) return null;

  const coordinates = route.points.map((point) => point.coordinate);

  const distance = length(lineString(coordinates), {
    units: 'kilometers',
  });

  if (distance < 1) {
    return `${Math.round(distance * 1000)} м`;
  }

  return `${distance.toFixed(1)} км`;
});

const updatedAtLabel = computed(() => {
  const date = parseISO(route.updatedAt);

  if (isToday(date)) {
    return `Сегодня, ${format(date, 'HH:mm')}`;
  }

  if (isYesterday(date)) {
    return `Вчера, ${format(date, 'HH:mm')}`;
  }

  return format(date, 'd MMM, HH:mm', {
    locale: ru,
  });
});
</script>

<template>
  <NCard
    class="route-card"
    hoverable
    size="medium"
  >
    <NSpace
      vertical
      :size="12"
    >
      <div class="route-card-header">
        <NText
          strong
          class="route-card-title"
        >
          {{ route.title || 'Без названия' }}
        </NText>

        <NTag
          size="small"
          :type="route.geometryStatus === 'approved' ? 'success' : 'warning'"
        >
          {{ route.geometryStatus === 'approved' ? 'Подтверждён' : 'Черновик' }}
        </NTag>
      </div>

      <NText
        v-if="route.description"
        depth="3"
        class="route-card-description"
      >
        {{ route.description }}
      </NText>

      <div class="route-card-footer">
        <NSpace
          align="center"
          :size="8"
        >
          <NText
            depth="3"
            size="small"
          >
            {{ route.points.length }} точек
          </NText>

          <NText
            v-if="routeDistance"
            depth="3"
            size="small"
          >
            {{ routeDistance }}
          </NText>

          <NTag
            size="small"
            :bordered="false"
          >
            {{ route.geometrySource === 'manual' ? 'Ручной' : 'Построенный' }}
          </NTag>
        </NSpace>

        <NSpace
          align="center"
          :size="8"
        >
          <NText
            depth="3"
            size="small"
          >
            {{ updatedAtLabel }}
          </NText>

          <NButton
            size="small"
            type="primary"
            @click="emit('open', route.uuid)"
          >
            Открыть
          </NButton>

          <NPopconfirm
            positive-text="Удалить"
            negative-text="Отмена"
            @positive-click="emit('delete', route.uuid)"
          >
            <template #trigger>
              <NButton
                size="small"
                quaternary
                circle
                type="error"
              >
                <template #icon>
                  <NIcon>
                    <TrashOutline />
                  </NIcon>
                </template>
              </NButton>
            </template>

            Удалить этот маршрут?
          </NPopconfirm>
        </NSpace>
      </div>
    </NSpace>
  </NCard>
</template>

<style scoped>
.route-card {
  height: 100%;
}

.route-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.route-card-title {
  min-width: 0;
  overflow-wrap: anywhere;
}

.route-card-description {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.route-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}
</style>
