import { createRouter, createWebHistory } from 'vue-router'

import Login from "/src/pages/Login.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
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
