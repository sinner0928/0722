<script setup lang="ts">
const route = useRoute()
const showInnerHeader = computed(() => route.path !== '/')
</script>

<template>
  <NuxtRouteAnnouncer />
  <HomeSiteHeader v-if="showInnerHeader" contact-href="/#contact" />
  <NuxtPage />
  <HomeSiteFooter />
</template>

<style>
:root {
  --brand-blue: #0369a1;
  --brand-blue-rgb: 3, 105, 161;
  --brand-blue-bg: #f2f7fa;
}

body,
body * {
  -webkit-user-select: none;
  user-select: none;
}

body input,
body textarea,
body select,
body option,
body [contenteditable='true'],
body [contenteditable='true'] * {
  -webkit-user-select: text;
  user-select: text;
}

body img {
  -webkit-user-drag: none;
}
</style>
