import { createRouter, createWebHistory } from 'vue-router'

import Login from "/src/pages/Login.vue";
import Register from "/src/pages/register/Register.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { title: "" },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { title: "" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router
