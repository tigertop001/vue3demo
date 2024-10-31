<script setup lang="ts" name="k-homeIndex">
import { defineAsyncComponent } from 'vue'
import { usePageId } from '@/router/pageId'
const { template, templates } = usePageId({
  t1: defineAsyncComponent(() => import('@/views/home/home1/home.vue')), // 首页模板1
  t2: defineAsyncComponent(() => import('@/views/home/home2/home.vue'))  // 首页模板2
})
</script>

<template>
  <div>{{ templates }}</div>
  <div>-----------</div>
  <div>{{ template }}</div>
  <component :is="templates[template]"></component>
</template>

