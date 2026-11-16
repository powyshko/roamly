<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  NButton,
  NEmpty,
  NIcon,
  NSpin,
  NH1,
  NText,
  NGrid,
  NGridItem,
  useMessage,
} from "naive-ui";
import { AddOutline } from "@vicons/ionicons5";
import { routeStorage } from "@/modules/storage";
import type { Route } from "@/shared/types";
import RouteCard from "./parts/route-card.vue";

const router = useRouter();

const routes = ref<Route[]>([]);
const isLoading = ref(true);
const message = useMessage();

const loadRoutes = async () => {
  try {
    isLoading.value = true;

    routes.value = (await routeStorage.getAll()).sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime(),
    );
  } catch (err) {
    console.error("Failed to load routes:", err);

    message.error("Не удалось загрузить маршруты");
  } finally {
    isLoading.value = false;
  }
};

const createRoute = () => {
  router.push({ name: "route-create" });
};

const openRoute = (uuid: string) => {
  router.push({
    name: "route-edit",
    params: { uuid },
  });
};

const deleteRoute = async (uuid: string) => {
  try {
    await routeStorage.delete(uuid);

    routes.value = routes.value.filter(
      (route) => route.uuid !== uuid,
    );

    message.success("Маршрут удалён");
  } catch (err) {
    console.error("Failed to delete route:", err);
    message.error("Не удалось удалить маршрут");
  }
};

onMounted(loadRoutes);
</script>

<template>
  <div class="route-library">
    <header class="route-library-header">
      <div class="route-library-heading">
        <NH1>Мои маршруты</NH1>

        <NText depth="3">
          Создавайте и сохраняйте собственные маршруты
        </NText>
      </div>

      <NButton
        type="primary"
        @click="createRoute"
      >
        <template #icon>
          <NIcon>
            <AddOutline />
          </NIcon>
        </template>
        Создать маршрут
      </NButton>
    </header>

    <NSpin :show="isLoading">
      <NEmpty
        v-if="!routes.length"
        description="У вас пока нет сохранённых маршрутов"
      >
        <template #extra>
          <NButton
            type="primary"
            @click="createRoute"
          >
            Создать первый маршрут
          </NButton>
        </template>
      </NEmpty>

      <NGrid
        v-else
        cols="1 s:2 m:3"
        :x-gap="16"
        :y-gap="16"
      >
        <NGridItem
          v-for="route in routes"
          :key="route.uuid"
        >
          <RouteCard
            :route="route"
            @delete="deleteRoute"
            @open="openRoute"
          />
        </NGridItem>
      </NGrid>
    </NSpin>
  </div>
</template>

<style scoped>
.route-library {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.route-library-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.route-library-heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.route-library-error {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}
</style>
