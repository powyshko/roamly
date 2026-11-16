<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { ArrowUndoOutline, ArrowRedoOutline, ArrowBackOutline } from '@vicons/ionicons5'

type Props = {
  undoDisabled: boolean;
  redoDisabled: boolean;
}

type Emit = {
  undo: []
  redo: []
  saveRoute: []
  back: []
}

const { undoDisabled, redoDisabled } = defineProps<Props>();
const emit = defineEmits<Emit>();
</script>

<template>
  <div class="map-actions">
    <NButton
      class="undo-button"
      type="info"
      circle
      :disabled="undoDisabled"
      aria-label="Отменить последнее изменение маршрута"
      title="Отменить последнее изменение"
      @click.stop="emit('undo')"
    >
      <template #icon>
        <ArrowUndoOutline />
      </template>
    </NButton>

    <NButton
      class="redo-button"
      type="info"
      circle
      :disabled="redoDisabled"
      aria-label="Повторить последнее действие"
      title="Повторить последнее действие"
      @click.stop="emit('redo')"
    >
      <template #icon>
        <ArrowRedoOutline />
      </template>
    </NButton>

    <NButton
      class="save-button"
      type="primary"
      @click.stop="emit('saveRoute')"
    >
      Сохранить
    </NButton>

    <NButton
      type="primary"
      @click="emit('back')"
    >
      <template #icon>
        <ArrowBackOutline />
      </template>
      К маршрутам
    </NButton>
  </div>
</template>

<style scoped>
.map-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>