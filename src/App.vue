<script setup lang="ts">
import {
  NConfigProvider,
  NMessageProvider,
} from "naive-ui";
import { RouterView } from "vue-router";

import { themeOverrides } from "@/app/theme";
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NMessageProvider placement="bottom">
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: 100%;
}
</style>
