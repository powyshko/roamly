<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NMessageProvider } from "naive-ui";
import { RouterView } from "vue-router";
import { themeOverrides } from "@/app/theme";
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NDialogProvider>
      <NMessageProvider placement="bottom">
        <RouterView />
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: 100%;
}
</style>
