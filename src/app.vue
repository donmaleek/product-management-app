<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// No script needed here anymore, layout logic is in MainLayout.vue
</script>

<style>
/* Global styles if any, like body background, font-smoothing, etc. */
html, body, #app {
  height: 100%;
  margin: 0;
  font-family: 'Inter', sans-serif; /* Example font */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>