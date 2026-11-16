<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  NButton,
  NCard,
  NEmpty,
  NIcon,
  NSpin,
  NTag,
  NH1,
  NText,
  NSpace,
  NGrid,
  NGridItem,
  useMessage,
} from "naive-ui";
import { AddOutline } from "@vicons/ionicons5";
import { routeStorage } from "@/modules/storage";
import type { Route } from "@/shared/types";

const router = useRouter();

const routes = ref<Route[]>([]);
const isLoading = ref(true);
const message = useMessage();

const loadRoutes = async () => {
  try {
    isLoading.value = true;

    routes.value = await routeStorage.getAll();
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
                  {{ route.title || "Без названия" }}
                </NText>

                <NTag
                  size="small"
                  :type="route.geometryStatus === 'approved'
                    ? 'success'
                    : 'warning'
                    "
                >
                  {{
                    route.geometryStatus === "approved"
                      ? "Подтверждён"
                      : "Черновик"
                  }}
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

                  <NTag
                    size="small"
                    :bordered="false"
                  >
                    {{
                      route.geometrySource === "manual"
                        ? "Ручной"
                    : "Построенный"
                    }}
                  </NTag>
                </NSpace>

                <NButton
                  size="small"
                  type="primary"
                  @click="openRoute(route.uuid)"
                >
                  Открыть
                </NButton>
              </div>
            </NSpace>
          </NCard>
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
  font-size: 16px;
}

.route-card-description {
  min-height: 40px;
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
