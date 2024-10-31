<script lang="ts" setup name="AccountIndex">
import { defineAsyncComponent } from 'vue'
import { useAccountSkin } from '../hooks/useComAccount'

const { accountType } = useAccountSkin()
console.log('accountType: ', accountType.value)
const templates = {
  account1: defineAsyncComponent(() => import('./account1/account1.vue')), //
  account2: defineAsyncComponent(() => import('./account2/account1.vue')) //
}
</script>
<template>
  <component :is="templates[`account${accountType}`]"></component>
</template>
