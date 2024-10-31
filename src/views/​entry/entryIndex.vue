<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { usePageId } from '@/router/pageId'
const { template, templates } = usePageId({
  account1: defineAsyncComponent(() => import('./account/accountIndex.vue')), //
  account2: defineAsyncComponent(() => import('./account/accountIndex.vue')) //
})
</script>

<template>
  <div>template ---- {{ template }}</div>
  <div>templates----{{ templates }}</div>
  <component :is="templates[template]"></component>
</template>
