import { createRouter, createWebHistory } from 'vue-router'

import Index from "/src/pages/Index.vue";
import Login from "/src/pages/Login.vue";
import Register from "/src/pages/register/Register.vue";
import Mypage from "/src/pages/mypage/Mypage.vue";
import PointCharge from "/src/pages/mypage/PointCharge.vue";
import ProfileModify from "/src/pages/mypage/ProfileModify.vue";
import TaxSetting from "/src/pages/mypage/TaxSetting.vue";
import AdvertiseDetail from "/src/pages/mypage/AdvertiseDetail.vue";
import AffiliateServices from "/src/pages/mypage/AffiliateServices.vue";
import Step1 from "/src/pages/ad/Step1.vue";
import Step2 from "/src/pages/ad/Step2.vue";
import Step3 from "/src/pages/ad/Step3.vue";
import Step4 from "/src/pages/ad/Step4.vue";

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
        path: "/profileModify",
        name: "ProfileModify",
        component: ProfileModify,
        meta: { title: "프로필 관리" },
    },
    {
        path: "/taxSetting",
        name: "TaxSetting",
        component: TaxSetting,
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
    {
        path: "/ad/",
        children: [
            {
                path: "step1",
                name: "Step1",
                component: Step1,
                meta: { title: "광고 세팅1" },
            },
            {
                path: "step2",
                name: "Step2",
                component: Step2,
                meta: { title: "광고 세팅2" },
            },
            {
                path: "step3",
                name: "Step3",
                component: Step3,
                meta: { title: "광고 세팅3" },
            },
            {
                path: "step4",
                name: "Step4",
                component: Step4,
                meta: { title: "광고 세팅4" },
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router
