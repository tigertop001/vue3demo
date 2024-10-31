
<template>
  <IconCommunity /><br />
  <img :src="IconDocumentation" alt="icon" /><br />
  <pre>{{ myIconRaw }}</pre>
</template>

<script setup lang="ts">
import IconCommunity from '@/assets/icons/IconCommunity.svg?sfc'
import IconDocumentation from '@/assets/icons/IconDocumentation.svg'
import myIconRaw from '@/assets/icons/logo02.svg?raw'
</script>


<style></style>
