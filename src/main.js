import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./_router";
import store from "./store";
import dayjs from "dayjs";

const fileServer = 'https://file.nemoview.com';

const globalMixin = {
    methods: {
        addComma(number) {
            const result = Number.isInteger(number)
                ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : 0;
            return result;
        },
        getImagePath: (data, index) => {
            if (data != '' && data != "[]") {
                let file = JSON.parse(data);
                return fileServer+file[index].path;
            }
            return "";
        },
        getOneImagePath: (path) => {
            return fileServer+path;
        },
        getDiffDays: (date1, date2) => {
            const reg = dayjs(date1);
            const upd = dayjs(date2);
            return reg.diff(upd, "days");
        },
        getDateFormat: (date, format) => {
            return dayjs(date).add(-9,'h').format(format);
        },
        replaceContent: (content) => {
            if (content != '' && content != undefined) {
                return content.replaceAll(/(\n|\r\n)/g,'<br>');
            }
            return "";
        },
    },
};

const app = createApp(App)
    .use(router)
    .use(store)
    .mixin(globalMixin)
    .mount('#app')
