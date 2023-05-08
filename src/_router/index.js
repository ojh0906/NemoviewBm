import { createRouter, createWebHistory } from 'vue-router'

import Login from "/src/pages/Login.vue";
import Register from "/src/pages/register/Register.vue";
import Mypage from "/src/pages/mypage/Mypage.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { title: "로그인" },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { title: "회원가입" },
    },
    {
        path: "/mypage",
        name: "Mypage",
        component: Mypage,
        meta: { title: "마이페이지" },
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
