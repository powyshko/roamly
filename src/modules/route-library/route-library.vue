
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  NButton,
  NCard,
  NEmpty,
  NIcon,
  NList,
  NListItem,
  NSpin,
  NTag,
  NH1,
  NText,
  NSpace,
} from "naive-ui";
import { AddOutline } from "@vicons/ionicons5";

import { routeStorage } from "@/modules/storage";
import type { Route } from "@/shared/types";

const router = useRouter();

const routes = ref<Route[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const loadRoutes = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    routes.value = await routeStorage.getAll();
  } catch (err) {
    console.error("Failed to load routes:", err);
    error.value = "Не удалось загрузить маршруты";
  } finally {
    isLoading.value = false;
  }
};

const createRoute = () => {
  router.push({ name: "route-create" });
};

onMounted(loadRoutes);
</script>

<template>
  <div class="route-library">
    <header class="route-library__header">
      <NH1>Мои маршруты</NH1>

      <NButton type="primary" @click="createRoute">
        <template #icon>
          <NIcon>
            <AddOutline />
          </NIcon>
        </template>
        Создать маршрут
      </NButton>
    </header>

    <NSpin :show="isLoading">
      <div v-if="error">
        <NText type="error">
          {{ error }}
        </NText>

        <NButton @click="loadRoutes">
          Повторить
        </NButton>
      </div>

      <NEmpty
        v-else-if="!routes.length"
        description="У вас пока нет сохранённых маршрутов"
      >
        <template #extra>
          <NButton type="primary" @click="createRoute">
            Создать первый маршрут
          </NButton>
        </template>
      </NEmpty>

      <NList v-else bordered>
        <NListItem
          v-for="route in routes"
          :key="route.uuid"
        >
          <NCard size="small" :bordered="false">
            <NSpace vertical :size="8">
              <NText strong>
                {{ route.title || "Без названия" }}
              </NText>

              <NText
                v-if="route.description"
                depth="3"
              >
                {{ route.description }}
              </NText>

              <NTag size="small">
                Точек: {{ route.points.length }}
              </NTag>
            </NSpace>
          </NCard>
        </NListItem>
      </NList>
    </NSpin>
  </div>
</template>

<style scoped>
.route-library {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
}

.route-library__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
</style>
