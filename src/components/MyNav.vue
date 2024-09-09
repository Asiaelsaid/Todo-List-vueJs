<template>
  <ul>
    <li v-for="route in router.options.routes" :key="route.name">
      <RouterLink :to="{ name: route.name }">
        {{ route.meta.title }}
      </RouterLink>
    </li>
  </ul>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped lang="scss">
ul {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 0;
  list-style: none;
  padding: 10px 0;
  background-color: #078b69;
  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 20px;
    &.router-link-active {
      text-decoration: underline;
      color: #ffffff;
      background-color: transparent;
    }
  }
}

.nav-link:hover {
  background-color: #42b983;
  color: #ffffff;
  border-radius: 5px;
}

.router-link-active {
  background-color: #ffffff;
  color: #2c3e50;
  border-radius: 5px;
}
</style>
