import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView"),
    meta: {
      title: "Home Page",
    },
  },
  {
    path: "/show-dotos",
    name: "ShowTodos",
    component: () => import("@/views/ShowTodos"),
    meta: {
      title: "Show Todos",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
