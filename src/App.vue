<script setup lang="ts">
// keep-alive 页面, 写组件名
import { ref } from 'vue'
const names = ref<RegExp>(/^k-/)

</script>

<template>
  <RouterView v-slot="{ Component }">
    <keep-alive :include="names">
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>

<style scoped></style>
