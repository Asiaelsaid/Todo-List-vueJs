<template>
  <MyNav />
  <router-view />
</template>

<script setup>
import MyNav from "./components/MyNav.vue";
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
