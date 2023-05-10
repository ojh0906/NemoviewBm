import { createRouter, createWebHistory } from 'vue-router'

import Index from "/src/pages/Index.vue";
import Login from "/src/pages/Login.vue";
import Register from "/src/pages/register/Register.vue";
import Mypage from "/src/pages/mypage/Mypage.vue";
import PointCharge from "/src/pages/mypage/PointCharge.vue";
import MemberModify from "/src/pages/mypage/MemberModify.vue";
import AccountSetting from "/src/pages/mypage/AccountSetting.vue";
import AdvertiseDetail from "/src/pages/mypage/AdvertiseDetail.vue";
import AffiliateServices from "/src/pages/mypage/AffiliateServices.vue";

const routes = [
    {
        path: "/",
        name: "index",
        component: Index,
        meta: { title: "" },
    },
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
    {
        path: "/pointcharge",
        name: "PointCharge",
        component: PointCharge,
        meta: { title: "포인트 충전" },
    },
    {
        path: "/membermodify",
        name: "MemberModify",
        component: MemberModify,
        meta: { title: "세금 계산서 정보" },
    },
    {
        path: "/AccountSetting",
        name: "AccountSetting",
        component: AccountSetting,
        meta: { title: "세금 계산서 정보" },
    },
    {
        path: "/advertisedetail",
        name: "AdvertiseDetail",
        component: AdvertiseDetail,
        meta: { title: "세금 계산서 정보" },
    },
    {
        path: "/affiliateServices",
        name: "AffiliateServices",
        component: AffiliateServices,
        meta: { title: "세금 계산서 정보" },
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
