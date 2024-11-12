import { createRouter, createWebHistory } from "vue-router";
import AdminView from "../views/AdminViews.vue";
import UserView from "../views/UserViews.vue";
import LoginViews from "@/views/LoginViews.vue";

const routes = [

  {
    path: "/",
    redirect: { name: "admin", params: { component: "items" } },
  },

  {
    path: "/admin/:component?",
    name: "admin",
    component: AdminView,
    props: (route) => ({
      currentComponent: route.params.component || "items",
    }),
    meta: {
      requiersAuth: true,
      role: "admin",
    },
  },
  {
    path: "/user/:component?",
    name: "user",
    component: UserView,
    props: (route) => ({
      currentComponent: route.params.component || "items",
    }),
    meta: {
      requiersAuth: true,
      role: "user",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginViews,

  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("auth");
  const userRole = localStorage.getItem("role");

  if (to.meta.requiresAuth && !isAuthenticated) {
    alert("You need to log in to access this page.");
    next({ name: "login" });
  } else if (
    to.meta.requiresAuth &&
    isAuthenticated &&
    to.meta.role !== userRole
  ) {
    alert("You do not have permission to access this page.");
    next(false);
  } else {
    next();
  }  
});

export default router;