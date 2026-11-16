<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  NButton,
  NText,
  NForm,
  NFormItem,
  NInput,
  NDescriptions,
  NDescriptionsItem,
} from 'naive-ui';
import { ChevronBackOutline, ChevronForwardOutline } from '@vicons/ionicons5';
import { RouteGeometrySource, RouteGeometryStatus } from '@/shared/types';

type Props = {
  pointsCount: number;
  routeDistance: string;
  geometrySource: RouteGeometrySource;
  geometryStatus: RouteGeometryStatus;
};

const { pointsCount, routeDistance, geometrySource, geometryStatus } = defineProps<Props>();

const title = defineModel<string>('title', {
  required: true,
});

const description = defineModel<string>('description', {
  required: true,
});

const isOpen = ref(false);

const geometrySourceLabel = computed(() =>
  geometrySource === RouteGeometrySource.Manual ? 'Ручное построение' : 'Маршрутизация',
);

const geometryStatusLabel = computed(() =>
  geometryStatus === RouteGeometryStatus.Approved ? 'Утверждён' : 'Черновик',
);

const geometryStatusType = computed(() =>
  geometryStatus === RouteGeometryStatus.Approved ? 'success' : 'warning',
);
</script>

<template>
  <aside
    class="properties-panel"
    :class="{ 'properties-panel--collapsed': !isOpen }"
    aria-label="Настройки маршрута"
  >
    <header class="properties-panel-header">
      <NText v-if="isOpen" class="properties-panel-title"> Настройки маршрута </NText>

      <NButton
        quaternary
        size="small"
        class="properties-panel-toggle"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? 'Свернуть панель' : 'Развернуть панель'"
        :title="isOpen ? 'Свернуть панель' : 'Развернуть панель'"
        @click="isOpen = !isOpen"
      >
        <template #icon>
          <ChevronForwardOutline v-if="isOpen" />
          <ChevronBackOutline v-else />
        </template>
      </NButton>
    </header>

    <div v-if="isOpen" class="properties-panel-content">
      <!-- Основные параметры -->
      <NForm label-placement="top">
        <NFormItem label="Название маршрута">
          <NInput
            v-model:value="title"
            placeholder="Например, Поездка к водопаду"
            maxlength="100"
          />
        </NFormItem>

        <NFormItem label="Описание">
          <NInput
            v-model:value="description"
            type="textarea"
            placeholder="Расскажите о маршруте..."
            :autosize="{ minRows: 3, maxRows: 6 }"
            maxlength="1000"
          />
        </NFormItem>
      </NForm>

      <NDivider />

      <!-- Информация о маршруте -->
      <NText strong tag="div" class="properties-panel-section-title"> Информация о маршруте </NText>

      <NDescriptions
        class="properties-panel-info-route"
        :column="1"
        label-placement="left"
        bordered
        size="small"
      >
        <NDescriptionsItem label="Количество точек">
          {{ pointsCount }}
        </NDescriptionsItem>

        <NDescriptionsItem label="Протяжённость">
          {{ routeDistance }}
        </NDescriptionsItem>
      </NDescriptions>

      <NDivider />

      <!-- Характеристики геометрии -->
      <NText strong tag="div" class="properties-panel-section-title"> Геометрия маршрута </NText>

      <NDescriptions :column="1" label-placement="left" bordered size="small">
        <NDescriptionsItem label="Источник">
          {{ geometrySourceLabel }}
        </NDescriptionsItem>

        <NDescriptionsItem label="Статус">
          <NTag :type="geometryStatusType">
            {{ geometryStatusLabel }}
          </NTag>
        </NDescriptionsItem>
      </NDescriptions>
    </div>
  </aside>
</template>

<style scoped>
.properties-panel {
  position: absolute;
  top: 12px;
  right: 56px;
  bottom: 12px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  width: min(420px, calc(100% - 68px));
  overflow: hidden;
  color: var(--color-text-primary);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 8px 24px var(--color-sage-900-alpha-20);
  transition: width 0.2s ease;
}

.properties-panel-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 60px;
  padding: 12px 16px 12px 20px;
  border-bottom: 1px solid var(--color-border);
}

.properties-panel-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
}

.properties-panel-toggle {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: var(--color-sage-700);
}

.properties-panel-content {
  flex: 1;
  min-height: 0;
  padding: 20px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.properties-panel-info-route {
  margin-bottom: 12px;
}

.properties-panel--collapsed {
  bottom: auto;
  width: 48px;
}

.properties-panel--collapsed .properties-panel-header {
  justify-content: center;
  min-height: 48px;
  padding: 8px;
  border-bottom: 0;
}

@media (max-width: 600px) {
  .properties-panel {
    top: 60px;
    bottom: 10px;
  }

  .properties-panel--collapsed {
    bottom: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .properties-panel {
    transition: none;
  }
}
</style>
