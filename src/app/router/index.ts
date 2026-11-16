
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/routes",
    },
    {
      path: "/routes",
      name: "route-library",
      component: () =>
        import("@/modules/route-library/route-library.vue"),
    },
    {
      path: "/routes/new",
      name: "route-create",
      component: () =>
        import("@/modules/route-editor").then(
          (module) => module.RouteEditor,
        ),
    },
  ],
});

export default router;
