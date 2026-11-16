
<script setup lang="ts">
import { RouterView } from "vue-router";
import { NConfigProvider } from "naive-ui";

import { themeOverrides } from "@/app/theme";
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <div class="app">
      <RouterView />
    </div>
  </NConfigProvider>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: 100%;
}
</style>
