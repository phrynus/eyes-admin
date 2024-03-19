<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 监听route.params.id发生变化，每次变化都输出一次
const keyId = ref()
watchEffect(() => {
  keyId.value = route.params.id
})
// 判断
</script>

<template>{{ keyId }}</template>

<style scoped></style>
